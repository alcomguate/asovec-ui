import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

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
                const response = await axios.get('/v1/inmueble/' + id);
                setFormData(response.data);
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
            await axios.put('/v1/inmueble', formData);
            alert("Datos actualizados con éxito");
            onClose();
        } catch (error) {
            setError("Hubo un error al actualizar los datos")
        }
    };

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                    <label for="manzanaInput" class="input-group-text">Manzana:</label>
                    <input
                        id="manzanaInput"
                        class="form-control"
                        type="text"
                        name="manzana"
                        value={formData.manzana}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="input-group mb-3">
                    <label for="loteInput" class="input-group-text">Lote:</label>
                    <input
                        id="loteInput"
                        class="form-control"
                        type="text"
                        name="lote"
                        value={formData.lote}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="input-group mb-3">
                    <label for="direccionInput" class="input-group-text">Dirección:</label>
                    <input
                        id="direccionInput"
                        class="form-control"
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="input-group mb-3">
                    <label for="nombreTitularInput" class="input-group-text">Titular:</label>
                    <input
                        id="nombreTitularInput"
                        class="form-control"
                        type="text"
                        name="nombreTitular"
                        value={formData.nombreTitular}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button class="btn btn-primary" type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default Update;