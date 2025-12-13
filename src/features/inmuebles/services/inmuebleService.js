import api from "../../../services/api";

const BASE_URL = "/v1/inmueble";

export const inmuebleService = {
    getAll: async () => {
        const response = await api.get(BASE_URL);
        return response.data;
    },

    getByManzana: async (manzana) => {
        const response = await api.get(`${BASE_URL}/manzana/${manzana}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(BASE_URL, data);
        return response.data;
    },

    update: async (data) => {
        const response = await api.put(BASE_URL, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`${BASE_URL}/${id}`);
        return response.data;
    }
};
