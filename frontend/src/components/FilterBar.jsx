import React, { useMemo } from "react";

export default function FilterBar({ filters, setFilters, movies }) {
  const {
    genres,
    years,
    ratings,
    runtimes,
    languages,
    voteCountRanges,
  } = useMemo(() => {
    const genreSet = new Set();
    const yearSet = new Set();
    const ratingSet = new Set();
    const languageSet = new Set();

    movies.forEach((movie) => {
      if (movie.genre) {
        movie.genre.split(",").forEach((g) => genreSet.add(g.trim()));
      }
      if (movie.release_date) {
        const year = new Date(movie.release_date).getFullYear();
        const decadeStart = Math.floor(year / 10) * 10;
        yearSet.add(`${decadeStart}–${decadeStart + 9}`);
      }
      if (movie.vote_average) {
        ratingSet.add(Math.floor(movie.vote_average));
      }
      if (movie.original_language) {
        languageSet.add(movie.original_language);
      }
    });

    const runtimes = [
      "<30",
      "30-60",
      "60-90",
      "90-120",
      "120-150",
      "150-180",
      ">180",
    ];
    const voteCountRanges = [
      "100-500",
      "500-1000",
      "1000-5000",
      ">5000",
    ];

    return {
      genres: Array.from(genreSet).sort(),
      years: Array.from(yearSet).sort((a, b) => b - a),
      ratings: Array.from(ratingSet).sort((a, b) => b - a),
      runtimes,
      languages: Array.from(languageSet).sort(),
      voteCountRanges,
    };
  }, [movies]);

  const handleCheckbox = (category, value) => {
    setFilters((prev) => {
      const isSelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };

  return (
    <div className="filterBar">
      <h2>Filters ☰</h2>

      {/* Genres */}
      <div className="filter">
        <h3 className="filter-label">Genres 🎬</h3>
        {genres.map((genre) => (
          <label key={genre} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.genres.includes(genre)}
              onChange={() => handleCheckbox("genres", genre)}
            />
            {genre}
          </label>
        ))}
      </div>

      {/* Year */}
      <div className="filter">
        <h3 className="filter-label">Release Date 📅</h3>
        {years.map((year) => (
          <label key={year} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.years.includes(year)}
              onChange={() => handleCheckbox("years", year)}
            />
            {year}
          </label>
        ))}
      </div>

      {/* Rating */}
      <div className="filter">
        <h3 className="filter-label">Rating ⭐</h3>
        {ratings.map((rating) => (
          <label key={rating} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.ratings.includes(rating)}
              onChange={() => handleCheckbox("ratings", rating)}
            />
            {rating}.0+
          </label>
        ))}
      </div>

     {/* Vote Count */}
      <div className="filter">
        <h3 className="filter-label">Vote Count 🗳️</h3>
        {voteCountRanges.map((range) => (
          <label key={range} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.voteCounts.includes(range)}
              onChange={() => handleCheckbox("voteCounts", range)}
            />
            {range}
          </label>
        ))}
      </div>

      {/* Runtime */}
      <div className="filter">
        <h3 className="filter-label">Runtime (min)⏱️</h3>
        {runtimes.map((time) => (
          <label key={time} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.runtimes.includes(time)}
              onChange={() => handleCheckbox("runtimes", time)}
            />
            {time}
          </label>
        ))}
      </div>

      {/* Language */}
      <div className="filter">
        <h3 className="filter-label">Language 🗣️</h3>
        {languages.map((lang) => (
          <label key={lang} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.languages.includes(lang)}
              onChange={() => handleCheckbox("languages", lang)}
            />
            {lang.toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  );
}
