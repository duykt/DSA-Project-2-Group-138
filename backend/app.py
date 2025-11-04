from flask import Flask, jsonify, request
from flask_cors import CORS
from movie_backend import load_movies_from_csv, merge_sort

app = Flask(__name__)
CORS(app)
movies = load_movies_from_csv("tmdb_movies.csv")

@app.route("/")
def home():
    return jsonify({"message":"Movie Finder Backend is running!"})

@app.route("/movies", methods=["GET"])
def get_movies():
    if not movies:
        return jsonify({"error":"No movie data loaded — check tmdb_movies.csv"}),500

    key = request.args.get("key","vote_average")
    id_filter = request.args.get("id",None,type=int)
    title_filter = request.args.get("title",None)
    genre_filter = request.args.get("genre",None)
    language_filter = request.args.get("language",None)
    min_rating = request.args.get("min_rating",None,type=float)
    max_rating = request.args.get("max_rating",None,type=float)
    min_votes = request.args.get("min_votes",None,type=int)
    max_votes = request.args.get("max_votes",None,type=int)
    min_runtime = request.args.get("min_runtime",None,type=float)
    max_runtime = request.args.get("max_runtime",None,type=float)
    year_filter = request.args.get("year",None)
    limit = request.args.get("limit",9999999999,type=int)

    if key not in movies[0]:
        return jsonify({"error":"Invalid sort key"}),400

    filtered = []
    for m in movies:
        ok = True
        if id_filter != None:
            if m["id"] != id_filter:
                ok = False
        if title_filter != None:
            if title_filter.lower() not in m["title"].lower():
                ok = False
        if genre_filter != None:
            if genre_filter.lower() not in m["genre"].lower():
                ok = False
        if language_filter != None:
            if m["original_language"].lower() != language_filter.lower():
                ok = False
        if min_rating != None:
            if m["vote_average"] < min_rating:
                ok = False
        if max_rating != None:
            if m["vote_average"] > max_rating:
                ok = False
        if min_votes != None:
            if m["vote_count"] < min_votes:
                ok = False
        if max_votes != None:
            if m["vote_count"] > max_votes:
                ok = False
        if min_runtime != None:
            if m["runtime"] < min_runtime:
                ok = False
        if max_runtime != None:
            if m["runtime"] > max_runtime:
                ok = False
        if year_filter != None:
            if len(m["release_date"]) >= 4:
                if m["release_date"][:4] != str(year_filter):
                    ok = False
            else:
                ok = False
        if ok == True:
            filtered.append(m)

    sorted_movies = merge_sort(filtered,key)
    result = sorted_movies[-limit:]
    result.reverse()
    return jsonify(result)

if __name__=="__main__":
    print("Flask backend starting up...")
    app.run(debug=True, port=8080)
