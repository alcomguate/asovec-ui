import React, { useState, useEffect } from "react";
import { inmuebleService } from "../services/inmuebleService";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import styles from "../styles/InmuebleForm.module.css";

const Update = ({ id, onClose }) => {

    const [formData, setFormData] = useState({
        id: id,
        manzana: "",
        lote: "",
        direccion: "",
        nombreTitular: "",
        nit: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInmueble = async () => {
            try {
                const data = await inmuebleService.getById(id);
                setFormData(prev => ({ ...prev, ...data }));
                setLoading(false);
            } catch (error) {
                setError("No se pudo cargar los datos");
                setLoading(false);
            }
        };

        fetchInmueble();
    }, [id]);

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
            await inmuebleService.update(formData);
            toast.success('Datos actualizados con éxito');
            onClose();
        } catch (error) {
            toast.error('Hubo un error al actualizar los datos');
        }
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger m-4">{error}</div>;
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>
                    📝 Actualizar Inmueble
                </h3>
                <p className={styles.formSubtitle}>Edite la información del inmueble seleccionado</p>
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

                    <div className={styles.formGroup}>
                        <label htmlFor="telefonoInput" className={styles.formLabel}>
                            Teléfono
                        </label>
                        <input
                            id="telefonoInput"
                            className={styles.formInput}
                            type="text"
                            name="telefono"
                            value={formData.telefono || ""}
                            onChange={handleChange}
                            placeholder="Número de teléfono"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="observacionesInput" className={styles.formLabel}>
                            Observaciones
                        </label>
                        <textarea
                            id="observacionesInput"
                            rows={4}
                            className={styles.formInput}
                            name="observaciones"
                            value={formData.observaciones || ""}
                            onChange={handleChange}
                            placeholder="Observaciones"
                        />
                    </div>

                    <div className={styles.submitButtonContainer}>
                        <button
                            className={styles.submitButton}
                            type="submit"
                        >
                            ✓ Guardar Cambios
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Update;