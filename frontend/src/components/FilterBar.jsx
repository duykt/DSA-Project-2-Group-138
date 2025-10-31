import React from "react";

export default function FilterBar({filters, setFilters}) {
    const genres = ["Action", "Drama", "Comedy", "Sci-Fi", "Animation", "Adventure", "Crime"];
    const years = ["2008", "2010", "2014", "2015", "2019"];
    const ratings = ["7", "8", "9"];
    const runtimes = [
        "<30",
        "30-60",
        "60-90",
        "90-120",
        "120-150",
        "150-180",
        ">180",
    ];
    
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
            <h2>Filters</h2>
            <div className="filter">
                <h3 className="filter-label">Genres</h3>
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
            
            <div className="filter">
                <h3 className="filter-label">Year</h3>
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

            <div className="filter">
                <h3 className="filter-label">Rating</h3>
                {ratings.map((rating)=> (
                    <label key={rating} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.ratings.includes(rating)}
                            onChange={()=> handleCheckbox("ratings", rating)}
                        />
                        {rating}.0+
                    </label>
                ))}
            </div>

            <div className="filter">
                <h3 className="filter-label">Runtime (min)</h3>
                {runtimes.map((time) => (
                    <label key={time} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.runtimes.includes(time)}
                            onChange={()=> handleCheckbox("runtimes", time)}
                        />
                        {time}                      
                    </label>
                ))}
            </div>

        </div>
    )
}