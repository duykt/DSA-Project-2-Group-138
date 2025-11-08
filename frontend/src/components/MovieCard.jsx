export default function MovieCard({movie}) {
    const imdbPage = `https://www.imdb.com/title/${movie.imdb_id}/`;
    return (
        <div className="movie-card">
            <a href={imdbPage} target="_blank" rel="noopener noreferrer">
                <div
                className="movie-poster"
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`}}
                />
            </a>
            <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-rating">⭐{movie.vote_average} ({movie.vote_count})</p>
                <p className="movie-genre">
                    {Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genre}
                </p>
                <p className="movie-year">{movie.release_date}</p>
                <p className="movie-runtime">{movie.runtime} min</p>
            </div>
        </div>
    )
}