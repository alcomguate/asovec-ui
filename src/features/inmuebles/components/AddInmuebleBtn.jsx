import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import styles from "../styles/AddInmuebleBtn.module.css";

const AddButton = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className={styles.addButton}
        >
            <BsPlusCircle size={20} />
            Nuevo
        </button>
    );
};

export default AddButton;