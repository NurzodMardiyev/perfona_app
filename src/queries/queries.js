import axios from "axios";

const api = "https://api.perfona.uz/api/";
export const Perfona = {
  coursesCategory: async () => {
    try {
      const { data } = await axios.get(`${api}contents/categories/`, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  coursesData: async (page, limet, category) => {
    // english o'zgaradi && page bilan limet ham o'zgaradi
    try {
      const { data } = await axios.get(
        `${api}contents/?page=${page}&page_size=${limet}&category=${category}`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  courseDetails: async (id) => {
    try {
      const { data } = await axios.get(`${api}contents/${id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  addCard: async (data) => {
    try {
      const response = await axios.post(`${api}payments/cards/bind/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  otpCode: async (data) => {
    try {
      const response = await axios.post(`${api}payments/cards/verify/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  userCards: async (chatID) => {
    try {
      const response = await axios.post(
        `https://api.perfona.uz/v1/payment/card/get.php`,
        chatID,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
