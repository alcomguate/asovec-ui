import React, { useEffect, useState } from "react";
import { pagoService } from "../services/pagoService";
import styles from "../styles/HistorialPagosModal.module.css";
import { toast } from 'react-toastify';
import { formatCurrency, formatDate, getMonthName } from "../../../shared/utils/formatters";

const HistorialPagosModal = ({ manzana, lote, onClose }) => {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPagos = async () => {
            if (!manzana || !lote) return;

            setLoading(true);
            try {
                const data = await pagoService.getByInmueble(manzana, lote);
                setPagos(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching pagos:", err);
                setError("No se pudieron cargar los pagos.");
                toast.error("Error al cargar el historial de pagos");
            } finally {
                setLoading(false);
            }
        };

        fetchPagos();
    }, [manzana, lote]);


    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorState}>
                <p>{error}</p>
                <button className="btn btn-outline-danger btn-sm" onClick={onClose}>Cerrar</button>
            </div>
        );
    }

    return (
        <div>
            <div className={`mb-3 alert alert-info`}>
                <strong>Inmueble:</strong> Manzana {manzana} - Lote {lote}
            </div>

            {pagos.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className="mb-0">No hay pagos registrados para este inmueble.</p>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th className={styles.tableHeaderCell}>Fecha</th>
                                <th className={styles.tableHeaderCell}>Concepto</th>
                                <th className={styles.tableHeaderCell}>Cuota</th>
                                <th className={styles.tableHeaderCell}>Monto</th>
                                <th className={styles.tableHeaderCell}>Número de depósito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map((pago, index) => (
                                <tr key={pago.id || index} className={styles.tableRow}>
                                    <td className={styles.tableCell}>{formatDate(pago.fechaPago)}</td>
                                    <td className={styles.tableCell}>{pago.descripcion || "Cuota mensual"}</td>
                                    <td className={styles.tableCell} style={{ textTransform: 'capitalize' }}>
                                        {getMonthName(pago.mesPago)} {pago.anioPago}
                                    </td>
                                    <td className={`${styles.tableCell} ${styles.amount}`}>
                                        {formatCurrency(pago.monto)}
                                    </td>
                                    <td className={styles.tableCell}>{pago.numeroDeposito}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-3 text-end">
                <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default HistorialPagosModal;
