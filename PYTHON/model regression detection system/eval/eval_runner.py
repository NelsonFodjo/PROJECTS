"""
Evaluation engine. Runs the golden dataset through a given prompt version,
scores each result on multiple dimensions, and saves a timestamped run file
to reports/runs/{version}_{timestamp}.json

Usage:
    python eval_runner.py v1
    python eval_runner.py v2
"""
import json
import os
import sys
import time
from datetime import datetime, timezone

from classifier import classify_email, load_prompt_config, client

DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "golden_dataset.json")
RUNS_DIR = os.path.join(os.path.dirname(__file__), "..", "reports", "runs")

JUDGE_MODEL = "llama-3.1-8b-instant"


def load_dataset() -> dict:
    with open(DATASET_PATH, "r") as f:
        return json.load(f)


def judge_summary(email_text: str, expected_gist: str, actual_summary: str) -> int:
    """
    LLM-as-judge: scores 1-5 how well actual_summary captures expected_gist,
    given the original email. Returns an int score, defaults to 1 on failure.
    """
    judge_prompt = f"""You are grading a one-sentence email summary for accuracy.

Original email: "{email_text}"
The summary should capture this gist: "{expected_gist}"
The actual summary produced was: "{actual_summary}"

Score how well the actual summary captures the required gist, on a scale of 1-5:
5 = fully captures the gist, accurate and complete
3 = partially captures it, missing some nuance
1 = misses the gist entirely or is inaccurate

Respond with ONLY a single digit (1-5), nothing else."""

    try:
        response = client.chat.completions.create(
            model=JUDGE_MODEL,
            temperature=0.0,
            messages=[{"role": "user", "content": judge_prompt}],
        )
        raw = response.choices[0].message.content.strip()
        score = int("".join(c for c in raw if c.isdigit())[:1])
        return max(1, min(5, score))
    except Exception:
        return 1


def run_eval(prompt_version: str) -> dict:
    prompt_config = load_prompt_config(prompt_version)
    dataset = load_dataset()

    results = []
    print(f"Running {len(dataset['test_cases'])} test cases against prompt {prompt_version}...\n")

    for tc in dataset["test_cases"]:
        output = classify_email(tc["input"], prompt_config)

        category_match = output["category"] == tc["expected_category"]
        summary_score = None
        if output["category"] != "API_ERROR" and output["summary"]:
            summary_score = judge_summary(tc["input"], tc["expected_summary_gist"], output["summary"])

        result = {
            "test_case_id": tc["id"],
            "difficulty": tc["difficulty"],
            "expected_category": tc["expected_category"],
            "actual_category": output["category"],
            "category_match": category_match,
            "summary_score": summary_score,
            "latency_ms": output["latency_ms"],
            "tokens_in": output["tokens_in"],
            "tokens_out": output["tokens_out"],
            "error": output["error"],
            "actual_summary": output["summary"],
        }
        results.append(result)

        status = "PASS" if category_match else "FAIL"
        print(f"  [{status}] {tc['id']} ({tc['difficulty']}): expected={tc['expected_category']} got={output['category']}"
              + (f" | summary={summary_score}/5" if summary_score else "")
              + (f" | ERROR: {output['error']}" if output["error"] else ""))

        time.sleep(0.3)  # gentle on rate limits

    total = len(results)
    passed = sum(1 for r in results if r["category_match"])
    avg_summary_score = round(
        sum(r["summary_score"] for r in results if r["summary_score"]) / max(1, sum(1 for r in results if r["summary_score"])), 2
    )
    avg_latency = round(sum(r["latency_ms"] for r in results) / total, 1)
    errors = sum(1 for r in results if r["error"])

    run_data = {
        "prompt_version": prompt_version,
        "prompt_description": prompt_config.get("description", ""),
        "model": prompt_config["model"],
        "run_timestamp": datetime.now(timezone.utc).isoformat(),
        "summary_metrics": {
            "total_cases": total,
            "passed": passed,
            "failed": total - passed,
            "pass_rate": round(passed / total * 100, 1),
            "avg_summary_quality": avg_summary_score,
            "avg_latency_ms": avg_latency,
            "errors": errors,
        },
        "results": results,
    }

    os.makedirs(RUNS_DIR, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_path = os.path.join(RUNS_DIR, f"{prompt_version}_{ts}.json")
    with open(out_path, "w") as f:
        json.dump(run_data, f, indent=2)

    print(f"\n--- Run complete: {prompt_version} ---")
    print(f"Pass rate: {run_data['summary_metrics']['pass_rate']}% ({passed}/{total})")
    print(f"Avg summary quality: {avg_summary_score}/5")
    print(f"Avg latency: {avg_latency}ms")
    print(f"Errors: {errors}")
    print(f"Saved to: {out_path}")

    return run_data


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python eval_runner.py <prompt_version>")
        print("Example: python eval_runner.py v1")
        sys.exit(1)

    if not os.environ.get("GROQ_API_KEY"):
        print("ERROR: GROQ_API_KEY environment variable not set.")
        print("Run: export GROQ_API_KEY=your_key_here")
        sys.exit(1)

    run_eval(sys.argv[1])
