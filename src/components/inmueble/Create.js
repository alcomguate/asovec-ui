import React, { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

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
      await axios.post("/v1/inmueble", formData);
      alert("Registro creado con éxito");
      navigate("/inmueble");
    } catch (error) {
      console.error("Error al crear el registro: ", error);
      alert("Hubo un problema al crear el registro");
    }
  };

  return (
    <div style={{
      padding: "30px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "30px",
        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.2)"
      }}>
        <h3 style={{
          color: "white",
          margin: 0,
          fontSize: "24px",
          fontWeight: "600",
          textAlign: "center"
        }}>
          ➕ Crear Nuevo Inmueble
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: "white",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)"
      }}>
        <div className="mb-4">
          <label
            htmlFor="manzanaInput"
            className="form-label"
            style={{
              fontWeight: "600",
              color: "#374151",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block"
            }}
          >
            Manzana
          </label>
          <input
            id="manzanaInput"
            className="form-control"
            type="text"
            name="manzana"
            value={formData.manzana}
            onChange={handleChange}
            required
            style={{
              borderRadius: "8px",
              border: "2px solid #e5e7eb",
              padding: "12px 16px",
              fontSize: "15px",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="loteInput"
            className="form-label"
            style={{
              fontWeight: "600",
              color: "#374151",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block"
            }}
          >
            Lote
          </label>
          <input
            id="loteInput"
            className="form-control"
            type="text"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            required
            style={{
              borderRadius: "8px",
              border: "2px solid #e5e7eb",
              padding: "12px 16px",
              fontSize: "15px",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="direccionInput"
            className="form-label"
            style={{
              fontWeight: "600",
              color: "#374151",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block"
            }}
          >
            Dirección
          </label>
          <input
            id="direccionInput"
            className="form-control"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            style={{
              borderRadius: "8px",
              border: "2px solid #e5e7eb",
              padding: "12px 16px",
              fontSize: "15px",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nombreTitularInput"
            className="form-label"
            style={{
              fontWeight: "600",
              color: "#374151",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block"
            }}
          >
            Titular
          </label>
          <input
            id="nombreTitularInput"
            className="form-control"
            type="text"
            name="nombreTitular"
            value={formData.nombreTitular}
            onChange={handleChange}
            required
            style={{
              borderRadius: "8px",
              border: "2px solid #e5e7eb",
              padding: "12px 16px",
              fontSize: "15px",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <div style={{ marginTop: "32px" }}>
          <button
            className="btn btn-primary w-100"
            type="submit"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "8px",
              padding: "14px 24px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            ➕ Crear Inmueble
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;