import React, { useState } from "react";
import ModalComponent from "../ModalComponent";
import UpdateInmueble from "./Update";

const FilteredInmuebleList = ({ inmuebles, selectedManzana, searchTerm }) => {

    const [selectedId, setSelectedId] = useState(null);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const handleOpenModalUpdate = (id) => {
        setSelectedId(id);
        setShowModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setSelectedId(null);
        setShowModalUpdate(false);
        //fetchInmueblesByManzana();
    };

    // Create a descriptive heading
    const getHeading = () => {
        if (selectedManzana && searchTerm) {
            return `Manzana ${selectedManzana} - Búsqueda: "${searchTerm}"`;
        } else if (selectedManzana) {
            return `Manzana: ${selectedManzana}`;
        } else if (searchTerm) {
            return `Resultados de búsqueda: "${searchTerm}"`;
        }
        return "Todos los inmuebles";
    };

    return (
        <div style={{ marginTop: "30px" }}>
            {/* Header Section */}
            <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "16px",
                padding: "24px 32px",
                marginBottom: "24px",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                        padding: "12px",
                        backdropFilter: "blur(10px)"
                    }}>
                        <svg width="24" height="24" fill="white" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                        </svg>
                    </div>
                    <h1 style={{
                        color: "white",
                        margin: 0,
                        fontSize: "26px",
                        fontWeight: "700"
                    }}>
                        {getHeading()}
                    </h1>
                </div>
                <div style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px"
                }}>
                    {inmuebles.length} {inmuebles.length === 1 ? 'inmueble' : 'inmuebles'}
                </div>
            </div>

            <ModalComponent
                show={showModalUpdate}
                onClose={handleCloseModalUpdate}
                title="Editar"
            >
                <UpdateInmueble id={selectedId} onClose={handleCloseModalUpdate} />
            </ModalComponent>

            {inmuebles.length === 0 ? (
                <div style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "60px 40px",
                    textAlign: "center",
                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)"
                }}>
                    <div style={{
                        fontSize: "64px",
                        marginBottom: "20px",
                        opacity: "0.3"
                    }}>
                        🏘️
                    </div>
                    <p style={{
                        fontSize: "18px",
                        color: "#6b7280",
                        margin: 0,
                        fontWeight: "500"
                    }}>
                        {searchTerm
                            ? `No se encontraron inmuebles que coincidan con "${searchTerm}".`
                            : "No se encontraron inmuebles."
                        }
                    </p>
                </div>
            ) : (
                <div style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)"
                }}>
                    <table className="table table-hover" style={{
                        margin: 0,
                        borderCollapse: "separate",
                        borderSpacing: 0
                    }}>
                        <thead>
                            <tr style={{
                                background: "#f9fafb",
                                borderBottom: "2px solid #e5e7eb"
                            }}>
                                <th scope="col" style={{
                                    padding: "16px 24px",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    color: "#374151",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Manzana
                                </th>
                                <th scope="col" style={{
                                    padding: "16px 24px",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    color: "#374151",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Lote
                                </th>
                                <th scope="col" style={{
                                    padding: "16px 24px",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    color: "#374151",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Dirección
                                </th>
                                <th scope="col" style={{
                                    padding: "16px 24px",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    color: "#374151",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Titular
                                </th>
                                <th scope="col" style={{
                                    padding: "16px 24px",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    color: "#374151",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    textAlign: "center"
                                }}>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inmuebles.map((inmueble, index) => (
                                <tr key={inmueble.id || index} style={{
                                    borderBottom: index < inmuebles.length - 1 ? "1px solid #f3f4f6" : "none",
                                    transition: "background-color 0.2s ease"
                                }}>
                                    <td style={{
                                        padding: "20px 24px",
                                        fontSize: "15px",
                                        color: "#1f2937",
                                        fontWeight: "600"
                                    }}>
                                        <span style={{
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            color: "white",
                                            padding: "6px 12px",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: "700"
                                        }}>
                                            {inmueble.manzana}
                                        </span>
                                    </td>
                                    <td style={{
                                        padding: "20px 24px",
                                        fontSize: "15px",
                                        color: "#1f2937",
                                        fontWeight: "500"
                                    }}>
                                        {inmueble.lote}
                                    </td>
                                    <td style={{
                                        padding: "20px 24px",
                                        fontSize: "15px",
                                        color: "#4b5563"
                                    }}>
                                        {inmueble.direccion}
                                    </td>
                                    <td style={{
                                        padding: "20px 24px",
                                        fontSize: "15px",
                                        color: "#4b5563"
                                    }}>
                                        {inmueble.nombreTitular}
                                    </td>
                                    <td style={{
                                        padding: "20px 24px",
                                        textAlign: "center"
                                    }}>
                                        <button
                                            onClick={() => handleOpenModalUpdate(inmueble.id)}
                                            style={{
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                border: "none",
                                                borderRadius: "8px",
                                                padding: "8px 12px",
                                                cursor: "pointer",
                                                marginRight: "8px",
                                                transition: "all 0.2s ease",
                                                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.2)"
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.2)";
                                            }}
                                            title="Editar"
                                        >
                                            <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                        </button>
                                        <button
                                            style={{
                                                background: "linear-gradient(135deg, #f87171 0%, #dc2626 100%)",
                                                border: "none",
                                                borderRadius: "8px",
                                                padding: "8px 12px",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                boxShadow: "0 2px 8px rgba(248, 113, 113, 0.2)"
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(248, 113, 113, 0.3)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(248, 113, 113, 0.2)";
                                            }}
                                            title="Eliminar"
                                        >
                                            <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

};

export default FilteredInmuebleList;