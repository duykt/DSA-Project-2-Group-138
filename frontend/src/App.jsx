import './style.css';
import { useState } from 'react';
import Header from "./components/Header";
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';


export default function App() {
  const movies = [
    { id: 1, title: "Inception", rating: 8.8, genres: ["Action", "Sci-Fi"], year: 2010, image: "https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"},
    { id: 2, title: "The Dark Knight", rating: 9.0, genres: ["Action", "Drama"], year: 2008, image: "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
    { id: 3, title: "Interstellar", rating: 8.6, genres: ["Adventure", "Drama"], year: 2014, image: "https://image.tmdb.org/t/p/original//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"},
    { id: 4, title: "Inside Out", rating: 8.1, genres: ["Animation", "Comedy"], year: 2015, image: "https://image.tmdb.org/t/p/original//2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg"},
  ];

  const [filters, setFilters] = useState({
    genres: [],
    years: [],
    ratings: [],
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

    return matchGenre && matchRating && matchYear;
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