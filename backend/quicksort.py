import random

def quick_sort(data, key):
    arr = list(data)

    def _partition(lo, hi):
        pivot_idx = random.randint(lo, hi)
        pivot_val = arr[pivot_idx][key]
        i, j = lo - 1, hi + 1
        while True:
            i += 1
            while arr[i][key] < pivot_val:
                i += 1
            j -= 1
            while arr[j][key] > pivot_val:
                j -= 1
            if i >= j:
                return j
            arr[i], arr[j] = arr[j], arr[i]

    def _qsort(lo, hi):
        while lo < hi:
            p = _partition(lo, hi)
            if (p - lo) < (hi - (p + 1)):
                _qsort(lo, p)
                lo = p + 1
            else:
                _qsort(p + 1, hi)
                hi = p

    if len(arr) > 1:
        _qsort(0, len(arr) - 1)
    return arr
