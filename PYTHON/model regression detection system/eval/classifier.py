"""
The LLM feature under test: a customer support email classifier.
Takes a prompt version (loaded from prompts/*.yaml) and an email,
returns a structured category + summary.
"""
import json
import os
import time
import yaml
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


def load_prompt_config(version: str) -> dict:
    """Load a versioned prompt config from prompts/{version}.yaml"""
    path = os.path.join(os.path.dirname(__file__), "..", "prompts", f"{version}.yaml")
    with open(path, "r") as f:
        return yaml.safe_load(f)


def classify_email(email_text: str, prompt_config: dict) -> dict:
    """
    Runs a single email through the classifier using the given prompt config.
    Returns a dict with: category, summary, latency_ms, tokens_in, tokens_out, raw_error (if any)
    """
    start = time.time()
    try:
        response = client.chat.completions.create(
            model=prompt_config["model"],
            temperature=prompt_config.get("temperature", 0.0),
            messages=[
                {"role": "system", "content": prompt_config["system_prompt"]},
                {"role": "user", "content": email_text},
            ],
        )
        latency_ms = round((time.time() - start) * 1000, 1)
        raw = response.choices[0].message.content.strip()

        # Strip accidental code fences if the model adds them anyway
        if raw.startswith("```"):
            raw = raw.strip("`")
            if raw.lower().startswith("json"):
                raw = raw[4:].strip()

        parsed = json.loads(raw)

        return {
            "category": parsed.get("category", "PARSE_ERROR"),
            "summary": parsed.get("summary", ""),
            "latency_ms": latency_ms,
            "tokens_in": response.usage.prompt_tokens,
            "tokens_out": response.usage.completion_tokens,
            "raw_output": raw,
            "error": None,
        }
    except json.JSONDecodeError as e:
        return {
            "category": "PARSE_ERROR",
            "summary": "",
            "latency_ms": round((time.time() - start) * 1000, 1),
            "tokens_in": None,
            "tokens_out": None,
            "raw_output": raw if "raw" in dir() else None,
            "error": f"JSON parse failure: {e}",
        }
    except Exception as e:
        return {
            "category": "API_ERROR",
            "summary": "",
            "latency_ms": round((time.time() - start) * 1000, 1),
            "tokens_in": None,
            "tokens_out": None,
            "raw_output": None,
            "error": str(e),
        }
