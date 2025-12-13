import { useState, useEffect, useCallback } from "react";
import { inmuebleService } from "../services/inmuebleService";
import { toast } from "react-toastify";

export const useInmuebles = () => {
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInmuebles = useCallback(async (manzana) => {
        try {
            setLoading(true);
            setError(null);
            let data;
            if (manzana !== undefined && manzana !== "") {
                data = await inmuebleService.getByManzana(manzana);
            } else {
                data = await inmuebleService.getAll();
            }
            setInmuebles(data);
        } catch (err) {
            const errorMessage = "Hubo un error al cargar los datos";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInmuebles();
    }, [fetchInmuebles]);

    const refreshInmuebles = () => fetchInmuebles();

    return {
        inmuebles,
        loading,
        error,
        refreshInmuebles,
        fetchByManzana: fetchInmuebles
    };
};
