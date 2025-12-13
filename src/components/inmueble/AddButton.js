import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = ({ onClick }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={onClick}
            style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "16px 32px",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "auto"
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.3)";
            }}
        >
            <svg width="20" height="20" fill="white" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            Agregar Nuevo Inmueble
        </button>
    );
};

export default AddButton;