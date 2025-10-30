import React from "react";

export default function FilterBar({filters, setFilters}) {
    const genres = ["Action", "Drama", "Comedy", "Sci-Fi", "Animation", "Adventure", "Crime"];
    const years = ["2008", "2010", "2014", "2015", "2019"];
    const ratings = ["7", "8", "9"];
    
    const handleCheckbox = (category, value) => {
        setFilters((prev) => {
            const isSelected = prev[category].includes(value);
            return {
                ...prev,
                [category]: 
                isSelected ? prev[category].filter((v)=> v !== value)
                : [...prev[category], value]
            }
        })
    }

    return (
        <div className="filterBar">
            <h2>Filter</h2>
            <div className="select-genre">
                <h3>Genres</h3>
                {genres.map((genre)=> (
                    <label key={genre} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.genres.includes(genre)}
                            onChange={()=> handleCheckbox("genres", genre)}
                        />
                        {genre}
                    </label>
                ))}
            </div>
            
            <div className="select-year">
                <h3>Year</h3>
                {years.map((year)=> (
                    <label key={year} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.years.includes(year)}
                            onChange={()=> handleCheckbox("years", year)}
                        />
                        {year}
                    </label>
                ))}
            </div>

            <div className="select-rating">
                <h3>Rating</h3>
                {ratings.map((rating)=> (
                    <label key={rating} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.ratings.includes(rating)}
                            onChange={()=> handleCheckbox("ratings", rating)}
                        />
                        {rating}
                    </label>
                ))}
            </div>
        </div>
    )
}