import api from "./api";

const beatService = {
  // Create a new beat
  async createBeat(formData) {
    try {
      console.log("Creating beat with FormData...");
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(
            pair[0] +
              ": File - " +
              pair[1].name +
              " (" +
              pair[1].size +
              " bytes)"
          );
        } else {
          console.log(pair[0] + ": " + pair[1]);
        }
      }

      // Let the browser/axios set Content-Type and boundary for multipart
      const response = await api.post("/api/beats", formData);

      console.log("Beat creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Beat creation error:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      throw error;
    }
  },

  // Upload a cover image for a beat (returns uploaded image URL)
  // If `id` is provided, upload to `/api/beats/{id}/cover-image` (update);
  // otherwise upload to `/api/beats/cover-image` (create).
  uploadCoverImage(file, id = null) {
    const formData = new FormData();
    // Backend expects the file field to be named 'coverImage'
    formData.append("coverImage", file);
    const endpoint = id
      ? `/api/beats/${id}/cover-image`
      : "/api/beats/cover-image";

    // Also append 'file' as a fallback field name (some endpoints expect 'file')
    formData.append("file", file);

    // Debug: log endpoint and form entries
    try {
      console.log("uploadCoverImage endpoint:", endpoint);
      for (let [k, v] of formData.entries()) {
        if (v instanceof File) {
          console.log(`  ${k}: File(${v.name}, ${v.type}, ${v.size} bytes)`);
        } else {
          console.log(`  ${k}: ${v}`);
        }
      }
    } catch (e) {
      console.warn("Failed to log formData entries", e);
    }

    // Try POST first; if server rejects with 405, retry with PUT (some backends use PUT for uploads)
    return api.post(endpoint, formData).catch(async (err) => {
      // Log server error body if present for debugging
      console.error("Cover upload error response data:", err?.response?.data);
      if (err?.response?.status === 405) {
        try {
          return await api.put(endpoint, formData);
        } catch (err2) {
          console.error(
            "Cover upload PUT retry error:",
            err2?.response?.data || err2
          );
          throw err2;
        }
      }
      throw err;
    });
  },

  // Get all beats
  async getAllBeats() {
    try {
      const response = await api.get("/api/beats");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch beats:", error);
      throw error;
    }
  },

  // Get beats by user ID
  async getBeatsByUser(userId, page = 1, limit = 10) {
    try {
      const response = await api.get(`/api/beats/user/${userId}`, {
        params: { page, limit },
      });
      console.log("User beats response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user beats:", error);
      throw error;
    }
  },

  // Get a single beat by ID
  async getBeat(id) {
    try {
      const response = await api.get(`/api/beats/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch beat:", error);
      throw error;
    }
  },

  // Update a beat
  async updateBeat(id, data) {
    try {
      console.log("Updating beat with data:", data);
      // If data is FormData (files), let axios/browser set Content-Type and boundary
      const isFormData = data instanceof FormData;
      const response = await api.put(
        `/api/beats/${id}`,
        data,
        isFormData
          ? undefined
          : { headers: { "Content-Type": "application/json" } }
      );
      console.log("Beat update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Beat update error:", error);
      console.error("Error response:", error.response?.data);

      // Some servers (or CORS configs) reject PUT preflight (OPTIONS) with 405.
      // As a fallback, try POST with X-HTTP-Method-Override header so servers
      // that support method override can accept the update.
      if (error.response?.status === 405) {
        try {
          console.warn(
            "PUT returned 405, retrying with POST + X-HTTP-Method-Override"
          );
          // If data is FormData, don't set Content-Type; otherwise send JSON with override
          const isFormData = data instanceof FormData;
          const resp2 = await api.post(
            `/api/beats/${id}`,
            data,
            isFormData
              ? { headers: { "X-HTTP-Method-Override": "PUT" } }
              : {
                  headers: {
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "PUT",
                  },
                }
          );
          console.log("Beat update (override) response:", resp2.data);
          return resp2.data;
        } catch (err2) {
          console.error("Fallback update failed:", err2);
          throw err2;
        }
      }

      throw error;
    }
  },

  // Delete a beat
  async deleteBeat(id) {
    try {
      const response = await api.delete(`/api/beats/${id}`);
      return response.data;
    } catch (error) {
      console.error("Beat deletion error:", error);
      throw error;
    }
  },

  // Record beat play
  async recordBeatPlay(id) {
    try {
      const response = await api.post(`/api/beats/${id}/play`);
      return response.data;
    } catch (error) {
      console.error("Beat play recording error:", error);
      throw error;
    }
  },

  // Get view count for a beat
  async getBeatViews(id) {
    try {
      const response = await api.get(`/api/beats/${id}/views`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch beat views:", error);
      throw error;
    }
  },
};

export default beatService;
