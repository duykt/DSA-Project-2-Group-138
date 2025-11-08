import './style.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./components/Header";
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';

// todo:
// Make movie posters clickable to tmdb page?, something should happen on hover
// stylelize cite a little more

export default function App() {
  // temp movie data
  const [movies, setMovies] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/movies");
      setMovies(response.data)
      console.log("Movies fetched: ", response.data);
      console.log("First movie:", response.data[0]);
    } catch (error) {
      console.log("Error fetching movies: ", error);
    }
    
  }

  useEffect(() => {
    fetchAPI()
  }, []) 

  const [filters, setFilters] = useState({
    genres: [],
    years: [],
    ratings: [],
    runtimes: [],
    languages: [],
    voteCounts: [],
  });

  const filteredMovies = movies.filter((movie) => {
    const movieGenres = movie.genre
      ? movie.genre.split(",").map((g) => g.trim())
      : [];

    const matchGenre =
      filters.genres.length === 0 ||
      movieGenres.some((genre) => filters.genres.includes(genre));

    const matchYear =
      filters.years.length === 0 ||
      filters.years.some((decade) => {
      const [start, end] = decade.split("–").map(Number);
      const year = new Date(movie.release_date).getFullYear();
      return year >= start && year <= end;
    });

    const matchRating =
      filters.ratings.length === 0 ||
      filters.ratings.some((rating) => movie.vote_average  >= parseFloat(rating));

    const matchRuntime =
      filters.runtimes.length === 0 ||
      filters.runtimes.some((range) => {
        const runtime = movie.runtime;
        if (range === "<30") return runtime < 30;
        if (range === "30-60") return runtime >= 30 && runtime < 60;
        if (range === "60-90") return runtime >= 60 && runtime < 90;
        if (range === "90-120") return runtime >= 90 && runtime < 120;
        if (range === "120-150") return runtime >= 120 && runtime < 150;
        if (range === "150-180") return runtime >= 150 && runtime < 180;
        if (range === ">180") return runtime >= 180;
        return true;
    });

    const matchLanguage =
      filters.languages.length === 0 ||
      filters.languages.includes(movie.original_language)

    const matchVoteCount =
      filters.voteCounts.length === 0 ||
      filters.voteCounts.some((range) => {
        const votes = movie.vote_count;
        if (range === "100-500") return votes >= 100 && votes < 500;
        if (range === "500-1000") return votes >= 500 && votes < 1000;
        if (range === "1000-5000") return votes >= 1000 && votes < 5000;
        if (range === ">5000") return votes >= 5000;
        return true;
      });
      
    return matchGenre && matchRating && matchYear && matchRuntime && matchVoteCount && matchLanguage;
  })

  return (
    <div className="container">
      <Header />
      {/* sidebar */}
      <div className="app">
        <div className="sidebar">
          <FilterBar
            filters={filters} 
            setFilters={setFilters}
            movies={movies}
          />
        </div>
        {/* main content */}
        <main className='main-content'>
          {filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
        </main>
      </div>
      
    </div>
  );
}