import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch, BsX } from "react-icons/bs";

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-3">
            <div className="input-group">
                <span className="input-group-text bg-white border-end-0" id="search-icon">
                    <BsSearch size={16} color="#6c757d" />
                </span>
                <input
                    type="text"
                    className="form-control border-start-0 border-end-0"
                    placeholder="Buscar por manzana, lote, dirección o titular..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search"
                    aria-describedby="search-icon"
                />
                <button
                    className="btn btn-outline-secondary border-start-0 bg-white"
                    type="button"
                    onClick={() => onSearchChange("")}
                    style={{ borderColor: "#ced4da" }}
                >
                    {searchTerm ? <BsX size={20} /> : <span style={{ width: 20, display: 'inline-block' }}></span>}
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
