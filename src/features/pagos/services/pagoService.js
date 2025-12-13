import axios from "../../../services/api";

export const pagoService = {
    /**
     * Obtiene los pagos realizados por un inmueble específico
     * @param {string} manzana 
     * @param {string} lote 
     * @returns {Promise<Array>} Lista de pagos
     */
    getByInmueble: async (manzana, lote) => {
        const response = await axios.get(`/v1/pago/manzana/${manzana}/lote/${lote}`);
        return response.data;
    }
};
