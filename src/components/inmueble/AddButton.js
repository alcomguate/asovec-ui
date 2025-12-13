import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";

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
            <BsPlusCircle size={20} />
            Agregar Nuevo Inmueble
        </button>
    );
};

export default AddButton;