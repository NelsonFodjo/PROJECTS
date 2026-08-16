"""
Comparison / regression detection logic. Takes two run JSON files
(baseline and candidate) and produces a diff report showing:
- overall pass rate delta
- per-case flips (pass->fail = regression, fail->pass = improvement)
- summary quality delta
- a warning/critical status based on configurable thresholds

Usage:
    python compare.py reports/runs/v1_XXXX.json reports/runs/v2_XXXX.json
"""
import json
import sys
import os

WARNING_THRESHOLD_PCT = 3.0
CRITICAL_THRESHOLD_PCT = 8.0


def load_run(path: str) -> dict:
    with open(path, "r") as f:
        return json.load(f)


def compare_runs(baseline_path: str, candidate_path: str) -> dict:
    baseline = load_run(baseline_path)
    candidate = load_run(candidate_path)

    baseline_by_id = {r["test_case_id"]: r for r in baseline["results"]}
    candidate_by_id = {r["test_case_id"]: r for r in candidate["results"]}

    regressions = []
    improvements = []
    still_failing = []
    still_passing = []

    for tc_id, cand_result in candidate_by_id.items():
        base_result = baseline_by_id.get(tc_id)
        if not base_result:
            continue  # test case is new, no baseline to compare

        base_pass = base_result["category_match"]
        cand_pass = cand_result["category_match"]

        if base_pass and not cand_pass:
            regressions.append({
                "test_case_id": tc_id,
                "difficulty": cand_result["difficulty"],
                "expected": cand_result["expected_category"],
                "baseline_output": base_result["actual_category"],
                "candidate_output": cand_result["actual_category"],
            })
        elif not base_pass and cand_pass:
            improvements.append({
                "test_case_id": tc_id,
                "difficulty": cand_result["difficulty"],
                "expected": cand_result["expected_category"],
                "baseline_output": base_result["actual_category"],
                "candidate_output": cand_result["actual_category"],
            })
        elif base_pass and cand_pass:
            still_passing.append(tc_id)
        else:
            still_failing.append(tc_id)

    base_pass_rate = baseline["summary_metrics"]["pass_rate"]
    cand_pass_rate = candidate["summary_metrics"]["pass_rate"]
    pass_rate_delta = round(cand_pass_rate - base_pass_rate, 1)

    base_summary_q = baseline["summary_metrics"]["avg_summary_quality"]
    cand_summary_q = candidate["summary_metrics"]["avg_summary_quality"]
    summary_quality_delta = round(cand_summary_q - base_summary_q, 2)

    abs_delta = abs(pass_rate_delta)
    if abs_delta >= CRITICAL_THRESHOLD_PCT and pass_rate_delta < 0:
        status = "CRITICAL"
    elif abs_delta >= WARNING_THRESHOLD_PCT and pass_rate_delta < 0:
        status = "WARNING"
    else:
        status = "OK"

    diff_report = {
        "baseline_version": baseline["prompt_version"],
        "candidate_version": candidate["prompt_version"],
        "status": status,
        "pass_rate_delta": pass_rate_delta,
        "baseline_pass_rate": base_pass_rate,
        "candidate_pass_rate": cand_pass_rate,
        "summary_quality_delta": summary_quality_delta,
        "baseline_summary_quality": base_summary_q,
        "candidate_summary_quality": cand_summary_q,
        "regressions": regressions,
        "improvements": improvements,
        "regression_count": len(regressions),
        "improvement_count": len(improvements),
        "still_passing_count": len(still_passing),
        "still_failing_count": len(still_failing),
    }

    return diff_report


def print_diff_report(report: dict):
    print(f"\n{'='*60}")
    print(f"REGRESSION REPORT: {report['baseline_version']} -> {report['candidate_version']}")
    print(f"{'='*60}")
    print(f"Status: {report['status']}")
    print(f"Pass rate: {report['baseline_pass_rate']}% -> {report['candidate_pass_rate']}% "
          f"({'+' if report['pass_rate_delta'] >= 0 else ''}{report['pass_rate_delta']}%)")
    print(f"Summary quality: {report['baseline_summary_quality']}/5 -> {report['candidate_summary_quality']}/5 "
          f"({'+' if report['summary_quality_delta'] >= 0 else ''}{report['summary_quality_delta']})")
    print(f"\nRegressions ({report['regression_count']}):")
    for r in report["regressions"]:
        print(f"  ✗ {r['test_case_id']} ({r['difficulty']}): expected={r['expected']} "
              f"| was correct in {report['baseline_version']}, now outputs '{r['candidate_output']}'")
    print(f"\nImprovements ({report['improvement_count']}):")
    for r in report["improvements"]:
        print(f"  ✓ {r['test_case_id']} ({r['difficulty']}): expected={r['expected']} "
              f"| was wrong in {report['baseline_version']} ('{r['baseline_output']}'), now correct")
    print(f"\nUnchanged: {report['still_passing_count']} still passing, {report['still_failing_count']} still failing")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python compare.py <baseline_run.json> <candidate_run.json>")
        sys.exit(1)

    report = compare_runs(sys.argv[1], sys.argv[2])
    print_diff_report(report)

    out_dir = os.path.join(os.path.dirname(__file__), "..", "reports")
    out_path = os.path.join(out_dir, "latest_diff.json")
    with open(out_path, "w") as f:
        json.dump(report, f, indent=2)
    print(f"Diff saved to: {out_path}")
