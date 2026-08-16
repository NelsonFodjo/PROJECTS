# Model Regression Detection System (v0 — core slice)

A CI/CD-style pipeline for LLM prompt behavior. Instead of testing code, it
tests prompts: run a golden dataset through a prompt version, score the
outputs, and diff against a previous run to catch regressions before they
ship.

This is the **3-hour core slice** — the eval + diff engine, proven to work.
Not yet included (future work): Slack alerts, GitHub Actions CI wiring,
Docker packaging, HTML report, drift detection. See "What's next" below.

## What's here

```
prompts/
  v1.yaml              baseline prompt (zero-shot)
  v2.yaml               improved prompt (few-shot + explicit category defs)
data/
  golden_dataset.json   15 hand-written test cases with edge cases
eval/
  classifier.py         the LLM feature under test (calls Groq)
  eval_runner.py         runs the dataset through a prompt version, scores it
  compare.py              diffs two runs, flags regressions
  test_pipeline_logic.py   mock-data sanity test (no API key needed)
reports/
  runs/                  saved run results (JSON), one per eval run
  latest_diff.json        most recent comparison output
```

## Setup

```bash
pip install -r requirements.txt
export GROQ_API_KEY=your_key_here
```

## Running it

1. **Sanity check the logic first (no API calls, no key needed):**
   ```bash
   cd eval
   python3 test_pipeline_logic.py
   python3 compare.py ../reports/runs/MOCK_v1.json ../reports/runs/MOCK_v2.json
   ```
   This proves the scoring and diff logic work using fake data before you
   spend real API calls.

2. **Run the real eval against Groq, for each prompt version:**
   ```bash
   cd eval
   python3 eval_runner.py v1
   python3 eval_runner.py v2
   ```
   Each run saves a timestamped JSON file to `reports/runs/`.

3. **Compare two real runs:**
   ```bash
   python3 compare.py ../reports/runs/v1_<timestamp>.json ../reports/runs/v2_<timestamp>.json
   ```
   This prints a regression report and saves it to `reports/latest_diff.json`.

## How scoring works

Each test case is scored two ways:
- **Category match** (binary): did the classifier output the expected category?
- **Summary quality** (1-5, LLM-as-judge): does the generated summary capture
  the expected gist of the email? Scored by sending the email, expected gist,
  and actual summary to the judge model and asking for a 1-5 rating.

## How regression detection works

`compare.py` doesn't just look at overall pass rate — it diffs **per test
case**. A case that passed in the baseline and fails in the candidate is a
**regression**, even if overall pass rate went up. This matters: an average
improvement can hide a specific, real breakage. Thresholds (`WARNING_THRESHOLD_PCT
= 3.0`, `CRITICAL_THRESHOLD_PCT = 8.0`) flag overall pass-rate drops, but the
per-case diff is what actually earns its keep in a code review.

## Why the golden dataset is hand-written, not LLM-generated

The 15 test cases in `data/golden_dataset.json` were written by hand, including
deliberately adversarial edge cases: mixed-language input, sarcasm, near-empty
input, gibberish, and cases where a surface keyword (e.g. "billing") doesn't
match the actual primary intent. Eval quality is bounded by data quality — an
LLM-generated golden set tends to reproduce the same blind spots as the model
being tested.

## What's next (full 12-14 day scope from the guide)

- [ ] Slack webhook alerting on regressions
- [ ] HTML diff report (side-by-side old vs new output per case)
- [ ] Rolling 7-run average for slow-drift detection
- [ ] GitHub Action to trigger eval on every PR touching `/prompts`
- [ ] Dockerize the whole pipeline
- [ ] Expand golden dataset to 50-100 cases
