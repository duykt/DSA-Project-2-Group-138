export default function MovieCard({movie}) {
    return (
        <div className="movie-card">
            <div
                className="movie-poster"
                style={{backgroundImage: `url(${movie.image})`}}
            />
            <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-title">⭐{movie.rating}</p>
                <p className="movie-genre">
                    {movie.genres.join(", ")}
                </p>
                <p className="movie-year">{movie.year}</p>
                <p className="movie-runtime">{movie.runtime} min</p>
            </div>
        </div>
    )
}