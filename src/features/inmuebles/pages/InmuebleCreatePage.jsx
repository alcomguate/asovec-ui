import React, { useState } from "react";
import { inmuebleService } from "../services/inmuebleService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import styles from "../styles/InmuebleForm.module.css";

const Create = () => {
  const [formData, setFormData] = useState({
    manzana: "",
    lote: "",
    direccion: "",
    nombreTitular: "",
    nit: ""
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
        <p className={styles.formSubtitle}>Complete el formulario para registrar una nueva propiedad</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="manzanaInput" className={styles.formLabel}>
              Manzana
            </label>
            <input
              id="manzanaInput"
              className={styles.formInput}
              type="text"
              name="manzana"
              value={formData.manzana}
              onChange={handleChange}
              required
              placeholder="Ej. A"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="loteInput" className={styles.formLabel}>
              Lote
            </label>
            <input
              id="loteInput"
              className={styles.formInput}
              type="text"
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              required
              placeholder="Ej. 10"
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="direccionInput" className={styles.formLabel}>
              Dirección
            </label>
            <input
              id="direccionInput"
              className={styles.formInput}
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              placeholder="Dirección completa"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nombreTitularInput" className={styles.formLabel}>
              Titular
            </label>
            <input
              id="nombreTitularInput"
              className={styles.formInput}
              type="text"
              name="nombreTitular"
              value={formData.nombreTitular}
              onChange={handleChange}
              required
              placeholder="Nombre del propietario"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nitInput" className={styles.formLabel}>
              NIT
            </label>
            <input
              id="nitInput"
              className={styles.formInput}
              type="text"
              name="nit"
              value={formData.nit || ""}
              onChange={handleChange}
              required
              placeholder="Número de NIT"
            />
          </div>

          <div className={styles.submitButtonContainer}>
            <button
              className={styles.submitButton}
              type="submit"
            >
              ➕ Crear Inmueble
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;