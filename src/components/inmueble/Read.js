import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import AddButton from "./AddButton";
import ModalComponent from "../ModalComponent";
import CreateInmueble from "./Create";
import UpdateInmueble from "./Update";
import FilteredInmuebleList from "./FilteredInmuebleList";
import SearchBar from "./SearchBar";

const Read = () => {
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [selectedManzana, setSelectedManzana] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectedManzana = (manzanaSelected) => {
        fetchInmueblesByManzana(manzanaSelected);
        setSelectedManzana(manzanaSelected);
    }

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
            if (manzana != undefined) {
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
        return <div>Cargando datos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>


            <h2>Lista de Inmuebles</h2>

            <div className="my-3">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />
            </div>

            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <AddButton onClick={handleOpenModalCreate} />
                        </div>
                    </div>
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