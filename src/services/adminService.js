import api from "./api";

export default {
  // Dashboard Stats
  getDashboardStats() {
    return api.get("/api/admin/stats");
  },

  // Admin Accounts
  createAdmin(data) {
    return api.post("/api/admin/create-admin", data);
  },

  getAdmins(page = 1, limit = 10) {
    return api.get("/api/admin/list", { params: { page, limit } });
  },

  deleteAdmin(id) {
    return api.delete(`/api/admin/${id}`);
  },

  // User Statistics
  getUserStatistics() {
    return api.get("/api/admin/users/statistics");
  },

  // Contacts (if you implement these endpoints)
  getContacts(status = null) {
    const params = {};
    if (status) params.status = status;
    return api.get("/api/admin/contacts", { params });
  },

  createContact(data) {
    return api.post("/api/admin/contacts", data);
  },

  updateContact(id, data) {
    return api.patch(`/api/admin/contacts/${id}`, data);
  },

  deleteContact(id) {
    return api.delete(`/api/admin/contacts/${id}`);
  },

  // FAQs (if you implement these endpoints)
  getFaqs() {
    return api.get("/api/admin/faqs");
  },

  createFaq(data) {
    return api.post("/api/admin/faqs", data);
  },

  updateFaq(id, data) {
    return api.patch(`/api/admin/faqs/${id}`, data);
  },

  deleteFaq(id) {
    return api.delete(`/api/admin/faqs/${id}`);
  },

  // Tickets (if you implement these endpoints)
  getTickets(status = null, priority = null) {
    const params = {};
    if (status) params.status = status;
    if (priority) params.priority = priority;
    return api.get("/api/admin/tickets", { params });
  },

  createTicket(data) {
    return api.post("/api/admin/tickets", data);
  },

  updateTicket(id, data) {
    return api.patch(`/api/admin/tickets/${id}`, data);
  },

  deleteTicket(id) {
    return api.delete(`/api/admin/tickets/${id}`);
  },
};
