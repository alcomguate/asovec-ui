import React, { useState } from "react";
import ModalComponent from "../../../shared/components/Modal";
import UpdateInmueble from "../pages/InmuebleUpdatePage";
import { BsHouse, BsPencilSquare, BsTrash, BsCashStack } from "react-icons/bs";
import styles from "../styles/InmuebleList.module.css";
import HistorialPagosModal from "../../pagos/components/HistorialPagosModal";

const FilteredInmuebleList = ({ inmuebles, selectedManzana, searchTerm, onRefresh }) => {

    const [selectedId, setSelectedId] = useState(null);
    const [selectedInmuebleForPagos, setSelectedInmuebleForPagos] = useState(null);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalPagos, setShowModalPagos] = useState(false);

    const handlePaymentModal = (inmueble) => {
        setSelectedInmuebleForPagos(inmueble);
        setShowModalPagos(true);
    };

    const handleCloseModalPagos = () => {
        setSelectedInmuebleForPagos(null);
        setShowModalPagos(false);
    };

    const handleOpenModalUpdate = (id) => {
        setSelectedId(id);
        setShowModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setSelectedId(null);
        setShowModalUpdate(false);
        if (onRefresh) onRefresh();
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
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.iconContainer}>
                        <BsHouse size={24} color="white" />
                    </div>
                    <h1 className={styles.headerTitle}>
                        {getHeading()}
                    </h1>
                </div>
                <div className={styles.badge}>
                    {inmuebles.length} {inmuebles.length === 1 ? 'inmueble' : 'inmuebles'}
                </div>
            </div>

            <ModalComponent
                show={showModalUpdate}
                onClose={handleCloseModalUpdate}
                title="Editar"
                size="lg"
            >
                <UpdateInmueble id={selectedId} onClose={handleCloseModalUpdate} />
            </ModalComponent>

            {/* Modal de Pagos */}
            <ModalComponent
                show={showModalPagos}
                onClose={handleCloseModalPagos}
                title="Historial de Pagos"
                size="lg"
            >
                {selectedInmuebleForPagos && (
                    <HistorialPagosModal
                        manzana={selectedInmuebleForPagos.manzana}
                        lote={selectedInmuebleForPagos.lote}
                        onClose={handleCloseModalPagos}
                    />
                )}
            </ModalComponent>

            {inmuebles.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        🏘️
                    </div>
                    <p className={styles.emptyMessage}>
                        {searchTerm
                            ? `No se encontraron inmuebles que coincidan con "${searchTerm}".`
                            : "No se encontraron inmuebles."
                        }
                    </p>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={`table table-hover ${styles.table}`}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th scope="col" className={styles.tableHeaderCell}>
                                    Manzana
                                </th>
                                <th scope="col" className={styles.tableHeaderCell}>
                                    Lote
                                </th>
                                <th scope="col" className={styles.tableHeaderCell}>
                                    Dirección
                                </th>
                                <th scope="col" className={styles.tableHeaderCell}>
                                    Titular
                                </th>
                                <th scope="col" className={styles.tableHeaderCellCenter}>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inmuebles.map((inmueble, index) => (
                                <tr key={inmueble.id || index} className={styles.tableRow}>
                                    <td className={styles.tableCell}>
                                        {inmueble.manzana}
                                    </td>
                                    <td className={styles.tableCellRegular}>
                                        {inmueble.lote}
                                    </td>
                                    <td className={styles.tableCellLight}>
                                        {inmueble.direccion}
                                    </td>
                                    <td className={styles.tableCellLight}>
                                        {inmueble.nombreTitular}
                                    </td>
                                    <td className={styles.tableCellCenter}>
                                        <button
                                            onClick={() => handlePaymentModal(inmueble)}
                                            className={`${styles.actionButton} ${styles.paymentButton}`}
                                            title="Registrar pago"
                                        >
                                            <BsCashStack size={16} color="white" />
                                        </button>
                                        <button
                                            onClick={() => handleOpenModalUpdate(inmueble.id)}
                                            className={`${styles.actionButton} ${styles.editButton}`}
                                            title="Editar"
                                        >
                                            <BsPencilSquare size={16} color="white" />
                                        </button>
                                        <button
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            title="Eliminar"
                                        >
                                            <BsTrash size={16} color="white" />
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