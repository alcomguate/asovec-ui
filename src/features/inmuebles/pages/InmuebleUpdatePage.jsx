import React, { useState, useEffect } from "react";
import { inmuebleService } from "../services/inmuebleService";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify'; // Importa los estilos de Bootstrap
import styles from "../styles/InmuebleForm.module.css";

const Update = ({ id, onClose }) => {

    const [formData, setFormData] = useState({
        id: id,
        manzana: "",
        lote: "",
        direccion: "",
        nombreTitular: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInmueble = async () => {
            try {
                const data = await inmuebleService.getById(id);
                setFormData(data);
                setLoading(false);
            } catch (error) {
                setError("No su pudó cargar los datos");
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
        return <div>Cargando datos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>
                    📝 Actualizar Inmueble
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
                        ✓ Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;