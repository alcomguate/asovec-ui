import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = ({ onClick }) => {
    const navigate = useNavigate();


    return (
        <div>
            <button class="btn btn-primary" onClick={onClick}>
                Agregar Nuevo Registro
            </button>
        </div>
    );
};

export default AddButton;