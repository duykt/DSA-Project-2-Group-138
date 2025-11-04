import csv
import os

def load_movies_from_csv(file_path):
    movies = []
    print("Trying to load:", os.path.abspath(file_path))
    if not os.path.exists(file_path):
        print("File not found!")
        return []

    f = open(file_path, encoding="utf-8")
    reader = csv.DictReader(f)
    for row in reader:
        try:
            if (row["adult"] == "True"):
                continue
            if row["vote_count"] == "":
                continue
            if (int(row["vote_count"]) < 5):
                continue

            movie = {}
            if "id" in row and row["id"] != "":
                movie["id"] = int(row["id"])
            else:
                movie["id"] = 0

            if "title" in row:
                movie["title"] = row["title"]
            else:
                movie["title"] = ""

            if "vote_average" in row and row["vote_average"] != "":
                movie["vote_average"] = float(row["vote_average"])
            else:
                movie["vote_average"] = 0.0

            if "vote_count" in row and row["vote_count"] != "":
                movie["vote_count"] = int(row["vote_count"])
            else:
                movie["vote_count"] = 0

            if "release_date" in row:
                movie["release_date"] = row["release_date"]
            else:
                movie["release_date"] = ""

            if "runtime" in row and row["runtime"] != "":
                movie["runtime"] = float(row["runtime"])
            else:
                movie["runtime"] = 0.0

            if "poster_path" in row and row["poster_path"] != "":
                movie["poster_path"] = row["poster_path"]
            elif "poster_path" in row:
                movie["poster_path"] = row["poster_path"]
            else:
                movie["poster_path"] = ""

            if "original_language" in row:
                movie["original_language"] = row["original_language"]
            else:
                movie["original_language"] = ""

            if "genres" in row and row["genres"] != "":
                movie["genre"] = row["genres"]
            elif "genre" in row:
                movie["genre"] = row["genre"]
            else:
                movie["genre"] = ""

            movies.append(movie)
        except Exception as e:
            print("Error with row:", e)
            pass

    f.close()
    print("Loaded", len(movies), "movies.")
    return movies


def merge_sort(data, key):
    if len(data) <= 1:
        return data
    middle = int(len(data) / 2)
    left = merge_sort(data[:middle], key)
    right = merge_sort(data[middle:], key)
    return merge(left, right, key)


def merge(left, right, key):
    merged = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        a = left[i][key]
        b = right[j][key]
        if a <= b:
            merged.append(left[i])
            i = i + 1
        else:
            merged.append(right[j])
            j = j + 1
    while i < len(left):
        merged.append(left[i])
        i = i + 1
    while j < len(right):
        merged.append(right[j])
        j = j + 1
    return merged
