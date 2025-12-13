import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import AddButton from "./AddButton";
import ModalComponent from "../ModalComponent";
import CreateInmueble from "./Create";
import FilteredInmuebleList from "./FilteredInmuebleList";
import SearchBar from "./SearchBar";

const Read = () => {
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [selectedManzana, setSelectedManzana] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }

    const handleOpenModalCreate = () => setShowModalCreate(true);

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        fetchInmueblesByManzana();
    };

    const fetchInmueblesByManzana = async (manzana) => {
        try {
            let url = "/v1/inmueble";
            if (manzana !== undefined) {
                url = "/v1/inmueble/manzana/" + manzana;
            }
            const response = await axios.get(url);
            setInmuebles(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            setError("Hubo un error al cargar los datos");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInmueblesByManzana();
    }, []);

    // Filter inmuebles based on search term
    const filteredInmuebles = inmuebles.filter((inmueble) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        const manzanaMatch = inmueble.manzana?.toString().toLowerCase().includes(searchLower);
        const loteMatch = inmueble.lote?.toString().toLowerCase().includes(searchLower);
        const direccionMatch = inmueble.direccion?.toLowerCase().includes(searchLower);
        const nombreTitular = inmueble.nombreTitular?.toLowerCase().includes(searchLower);

        return manzanaMatch || loteMatch || direccionMatch || nombreTitular;
    });

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px"
            }}>
                <div style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "40px 60px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }}>
                    <div style={{
                        width: "60px",
                        height: "60px",
                        border: "4px solid #f3f4f6",
                        borderTop: "4px solid #667eea",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 20px"
                    }}></div>
                    <p style={{
                        fontSize: "18px",
                        color: "#6b7280",
                        fontWeight: "500",
                        margin: 0
                    }}>
                        Cargando datos...
                    </p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px"
            }}>
                <div style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "40px 60px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    maxWidth: "500px"
                }}>
                    <div style={{
                        fontSize: "64px",
                        marginBottom: "20px"
                    }}>⚠️</div>
                    <p style={{
                        fontSize: "18px",
                        color: "#ef4444",
                        fontWeight: "600",
                        margin: 0
                    }}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            {/* Page Title */}
            <div style={{
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <h2 style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "10px"
                }}>
                    🏘️ Lista de Inmuebles
                </h2>
                <p style={{
                    color: "#6b7280",
                    fontSize: "16px",
                    margin: 0
                }}>
                    Gestiona y busca inmuebles registrados
                </p>
            </div>

            {/* Search and Add Section */}
            <div style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap"
            }}>
                <div style={{ flex: "1", minWidth: "300px" }}>
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                    />
                </div>
                <div>
                    <AddButton onClick={handleOpenModalCreate} />
                </div>
            </div>

            <ModalComponent
                show={showModalCreate}
                onClose={handleCloseModalCreate}
                title="Nuevo registro">
                <CreateInmueble />
            </ModalComponent>

            <FilteredInmuebleList
                inmuebles={filteredInmuebles}
                selectedManzana={selectedManzana}
                searchTerm={searchTerm}
            />

        </div>
    );
};

export default Read;