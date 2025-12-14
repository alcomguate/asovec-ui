import React, { useEffect, useState } from "react";
import { pagoService } from "../services/pagoService";
import styles from "../styles/HistorialPagosModal.module.css";
import { toast } from 'react-toastify';
import { formatCurrency, formatDate, getMonthName } from "../../../shared/utils/formatters";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";

const HistorialPagosModal = ({ manzana, lote, onClose }) => {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        anioPago: new Date().getFullYear(),
        mesPago: new Date().getMonth() + 1,
        monto: "",
        descripcion: "",
        fechaPago: new Date().toISOString().split('T')[0],
        numeroDeposito: "",
        recibo: ""
    });

    useEffect(() => {
        const fetchPagos = async () => {
            if (!manzana || !lote) return;
            // Only set loading if we don't have data yet
            if (pagos.length === 0) setLoading(true);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const payload = {
                ...formData,
                manzana,
                lote,
                monto: parseFloat(formData.monto)
            };

            await pagoService.create(payload);
            toast.success("Pago registrado correctamente");
            setShowForm(false);
            setFormData({
                anioPago: new Date().getFullYear(),
                mesPago: new Date().getMonth() + 1,
                monto: "",
                descripcion: "",
                fechaPago: new Date().toISOString().split('T')[0],
                numeroDeposito: "",
                recibo: ""
            });

            // Refresh list manually
            const data = await pagoService.getByInmueble(manzana, lote);
            setPagos(data);

        } catch (err) {
            console.error("Error creating pago:", err);
            toast.error("Error al registrar el pago");
        } finally {
            setCreating(false);
        }
    };


    if (loading && pagos.length === 0) {
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
            <div className={styles.accordionHeader}>
                <div className="alert alert-info mb-0 py-2 px-3">
                    <strong>Inmueble:</strong> Mzna {manzana} - Lote {lote}
                </div>
                <button
                    className={`btn btn-sm ${showForm ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? (
                        <><BsDashCircle className="me-2" />Cancelar</>
                    ) : (
                        <><BsPlusCircle className="me-2" />Nuevo Pago</>
                    )}
                </button>
            </div>

            <div className={`${styles.accordionContent} ${showForm ? styles.open : ''}`}>
                <div className={styles.formContainer}>
                    <h5 className={styles.formTitle}>Registrar Nuevo Pago</h5>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Año</label>
                                <select
                                    name="anioPago"
                                    className={styles.input}
                                    value={formData.anioPago}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {[2023, 2024, 2025, 2026].map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Mes</label>
                                <select
                                    name="mesPago"
                                    className={styles.input}
                                    value={formData.mesPago}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                        <option key={m} value={m}>{getMonthName(m)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Monto (Q)</label>
                                <input
                                    type="number"
                                    name="monto"
                                    className={styles.input}
                                    value={formData.monto}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Fecha Pago</label>
                                <input
                                    type="date"
                                    name="fechaPago"
                                    className={styles.input}
                                    value={formData.fechaPago}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Descripción</label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    className={styles.input}
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    placeholder="Ej. Cuota de mantenimiento"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>No. Depósito</label>
                                <input
                                    type="text"
                                    name="numeroDeposito"
                                    className={styles.input}
                                    value={formData.numeroDeposito || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Recibo</label>
                                <input
                                    type="text"
                                    name="recibo"
                                    className={styles.input}
                                    value={formData.recibo || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={creating}
                        >
                            {creating ? 'Guardando...' : 'Guardar Pago'}
                        </button>
                    </form>
                </div>
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
                                <th className={styles.tableHeaderCell}>Recibo</th>
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
                                    <td className={styles.tableCell}>{pago.recibo}</td>
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
