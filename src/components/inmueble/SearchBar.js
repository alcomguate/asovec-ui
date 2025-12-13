import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-3">
            <div className="input-group">
                <span className="input-group-text" id="search-icon">
                    <BsSearch size={16} />
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
