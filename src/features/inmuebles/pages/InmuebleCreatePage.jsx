import React, { useState } from "react";
import { inmuebleService } from "../services/inmuebleService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify'; // Importa los estilos de Bootstrap
import styles from "../styles/InmuebleForm.module.css";

const Create = () => {
  const [formData, setFormData] = useState({
    manzana: "",
    lote: "",
    direccion: "",
    nombreTitular: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inmuebleService.create(formData);
      toast.success('Registro creado con éxito');
      navigate("/inmueble");
    } catch (error) {
      console.error("Error al crear el registro: ", error);
      toast.error('Hubo un problema al crear el registro');
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>
          ➕ Crear Nuevo Inmueble
        </h3>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className="mb-4">
          <label
            htmlFor="manzanaInput"
            className={styles.formLabel}
          >
            Manzana
          </label>
          <input
            id="manzanaInput"
            className={`form-control ${styles.formInput}`}
            type="text"
            name="manzana"
            value={formData.manzana}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="loteInput"
            className={styles.formLabel}
          >
            Lote
          </label>
          <input
            id="loteInput"
            className={`form-control ${styles.formInput}`}
            type="text"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="direccionInput"
            className={styles.formLabel}
          >
            Dirección
          </label>
          <input
            id="direccionInput"
            className={`form-control ${styles.formInput}`}
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nombreTitularInput"
            className={styles.formLabel}
          >
            Titular
          </label>
          <input
            id="nombreTitularInput"
            className={`form-control ${styles.formInput}`}
            type="text"
            name="nombreTitular"
            value={formData.nombreTitular}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.submitButtonContainer}>
          <button
            className={`btn btn-primary w-100 ${styles.submitButton}`}
            type="submit"
          >
            ➕ Crear Inmueble
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;