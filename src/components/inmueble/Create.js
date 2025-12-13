import React, { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

const Create = () => {
  const [formData, setFormData] = useState({
    manzana: "",
    lote: "",
    direccion: ""
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
      await axios.post("/v1/inmueble", formData);
      alert("Registro creado con éxito");
      navigate("/inmueble");
    } catch (error) {
      console.error("Error al crear el registro: ", error);
      alert("Hubo un problema al crear el registro");
    }
  };

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

        <button class="btn btn-primary" type="submit">Crear</button>


      </form>
    </div>
  );
};

export default Create;