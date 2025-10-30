import './style.css';
import { useState } from 'react';
import Header from "./components/Header";
import FilterBar from './components/FilterBar';


export default function App() {
  const movies = [
    { id: 1, title: "Inception", rating: 8.8, genres: ["Action", "Sci-Fi"], year: 2010 },
    { id: 2, title: "The Dark Knight", rating: 9.0, genres: ["Action", "Drama"], year: 2008 },
    { id: 3, title: "Interstellar", rating: 8.6, genres: ["Adventure", "Drama"], year: 2014 },
    { id: 4, title: "Inside Out", rating: 8.1, genres: ["Animation", "Comedy"], year: 2015 },
  ];

  const [filters, setFilters] = useState({
    genres: [],
    years: [],
    ratings: [],
  });

  console.log(filters);

  return (
    <div className="App">
      <Header />
      {/* sidebar */}
      <div>
          <FilterBar
            filters={filters} 
            setFilters={setFilters}
          />
      </div>
      {/* main content */}
      <main>

      </main>
    </div>
  );
}