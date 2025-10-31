import './style.css';
import { useState } from 'react';
import Header from "./components/Header";
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';

// todo:
// Make movie posters clickable to tmdb page?, something should happen on hover
// stylelize cite a little more

export default function App() {
  // temp movie data
  const movies = [
    { id: 1, title: "Inception", rating: 8.8, genres: ["Action", "Sci-Fi"], year: 2010, runtime: 148, image: "https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"},
    { id: 2, title: "The Dark Knight", rating: 9.0, genres: ["Action", "Drama"], year: 2008, runtime: 152, image: "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
    { id: 3, title: "Interstellar", rating: 8.6, genres: ["Adventure", "Drama"], year: 2014, runtime: 169, image: "https://image.tmdb.org/t/p/original//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"},
    { id: 4, title: "Inside Out", rating: 8.1, genres: ["Animation", "Comedy"], year: 2015, runtime: 95, image: "https://image.tmdb.org/t/p/original//2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg"},
  ];

  const [filters, setFilters] = useState({
    genres: [],
    years: [],
    ratings: [],
    runtimes: [],
  });

  console.log(filters);
  const filteredMovies = movies.filter((movie) => {
    const matchGenre =
      filters.genres.length === 0 ||
      movie.genres.some((genre) => filters.genres.includes(genre));

    const matchYear =
      filters.years.length === 0 ||
      filters.years.includes(movie.year.toString());

    const matchRating =
      filters.ratings.length === 0 ||
      filters.ratings.some((rating) => movie.rating >= parseFloat(rating));

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
    return matchGenre && matchRating && matchYear && matchRuntime;
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