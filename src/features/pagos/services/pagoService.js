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
    },

    /**
     * Crea un nuevo registro de pago
     * @param {Object} pagoData 
     * @returns {Promise<Object>} Pago creado
     */
    create: async (pagoData) => {
        const response = await axios.post('/v1/pago', pagoData);
        return response.data;
    }
};
