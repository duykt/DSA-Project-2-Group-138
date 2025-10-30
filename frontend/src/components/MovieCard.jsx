export default function MovieCard({movie}) {
    return (
        <div 
            className="movie-card"
            style={{backgroundImage: `url(${movie.image})`}}
        >
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-title">{movie.rating}</p>
            <p className="movie-genre">
                {movie.genres.join(", ")}
            </p>
            <p className="movie-year">{movie.year}</p>
        </div>
    )
}