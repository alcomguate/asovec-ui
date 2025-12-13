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
        <div>
            <h1>{getHeading()}</h1>
            <ModalComponent
                show={showModalUpdate}
                onClose={handleCloseModalUpdate}
                title="Editar"
            >
                <UpdateInmueble id={selectedId} onClose={handleCloseModalUpdate} />
            </ModalComponent>

            {inmuebles.length === 0 ? (
                <p>
                    {searchTerm
                        ? `No se encontraron inmuebles que coincidan con "${searchTerm}".`
                        : "No se encontraron inmuebles."
                    }
                </p>
            ) : (
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Manzana</th>
                            <th scope="col">Lote</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Titular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inmuebles.map((inmueble) => (
                            <tr>
                                <td>{inmueble.manzana}</td>
                                <td>{inmueble.lote}</td>
                                <td>{inmueble.direccion}</td>
                                <td>{inmueble.nombreTitular}</td>
                                <td>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" // Ícono de edición
                                        alt="Editar"
                                        style={{ width: "24px", cursor: "pointer", marginRight: "10px" }}
                                        onClick={() => handleOpenModalUpdate(inmueble.id)}
                                    />
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" // Ícono de eliminación
                                        alt="Eliminar"
                                        style={{ width: "24px", cursor: "pointer" }}

                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

};

export default FilteredInmuebleList;