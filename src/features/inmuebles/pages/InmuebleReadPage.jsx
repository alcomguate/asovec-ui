import React, { useState } from "react";
import { useInmuebles } from "../hooks/useInmuebles";
import AddButton from "../components/AddInmuebleBtn";
import ModalComponent from "../../../shared/components/Modal";
import CreateInmueble from "./InmuebleCreatePage";
import FilteredInmuebleList from "../components/InmuebleList";
import SearchBar from "../components/InmuebleSearch";
import styles from "../styles/InmuebleReadPage.module.css";

const Read = () => {
    const { inmuebles, loading, error, refreshInmuebles } = useInmuebles();
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [selectedManzana] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    }

    const handleOpenModalCreate = () => setShowModalCreate(true);

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        refreshInmuebles();
    };

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
            <div className={styles.centerContainer}>
                <div className={styles.loadingCard}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>
                        Cargando datos...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.errorCard}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <p className={styles.errorText}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            {/* Page Title */}
            <div className={styles.titleContainer}>
                <h2 className={styles.pageTitle}>
                    🏘️ Lista de Inmuebles
                </h2>
                <p className={styles.pageSubtitle}>
                    Gestiona y busca inmuebles registrados
                </p>
            </div>

            {/* Search and Add Section */}
            <div className={styles.controlsContainer}>
                <div className={styles.searchWrapper}>
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