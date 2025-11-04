import random
import time
from movie_backend import merge_sort
from Quicksort import quick_sort

def measure_performance(movies, key="vote_average", size=5000, trials=5, seed=42):
    if not movies:
        return {
            "n": 0, "key": key, "trials": trials,
            "merge_sort": {"avg_ms": 0.0, "runs_ms": []},
            "quick_sort": {"avg_ms": 0.0, "runs_ms": []},
            "quick_speedup_vs_merge": 0.0
        }

    rng = random.Random(seed)
    size = max(10, min(size, len(movies)))
    subset = rng.sample(movies, size) if size < len(movies) else list(movies)

    def time_once(fn):
        t0 = time.perf_counter()
        _ = fn()
        t1 = time.perf_counter()
        return (t1 - t0) * 1000.0

    def run_trials(fn):
        times = [time_once(fn) for _ in range(max(1, trials))]
        return {"avg_ms": sum(times) / len(times), "runs_ms": times}

    merge_stats = run_trials(lambda: merge_sort(subset, key))
    quick_stats = run_trials(lambda: quick_sort(subset, key))

    speedup = merge_stats["avg_ms"] / quick_stats["avg_ms"] if quick_stats["avg_ms"] > 0 else float("inf")

    return {
        "n": size,
        "key": key,
        "trials": trials,
        "merge_sort": merge_stats,
        "quick_sort": quick_stats,
        "quick_speedup_vs_merge": speedup
    }
