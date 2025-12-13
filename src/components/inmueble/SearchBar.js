import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-3">
            <div className="input-group">
                <span className="input-group-text" id="search-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por manzana, lote, dirección o titular..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search"
                    aria-describedby="search-icon"
                />
            </div>
        </div>
    );
};

export default SearchBar;
