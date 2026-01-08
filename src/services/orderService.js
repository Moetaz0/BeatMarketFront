import api from "./api";

const orderService = {
  checkout: async (items) => {
    const response = await api.post("/api/orders/checkout", {
      items,
    });
    return response.data;
  },

  listOrders: async () => {
    const response = await api.get("/api/orders");
    return response.data;
  },

  getOrder: async (id) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },
};

export default orderService;
