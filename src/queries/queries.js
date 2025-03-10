import axios from "axios";

const api = "https://api.perfona.uz/v1/webapp/index.php?";
export const Perfona = {
  coursesCategory: async () => {
    try {
      const { data } = await axios.get(`${api}key=category`, {
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
        `${api}key=main_card&page=${page}&limit=${limet}&category=${category}`,
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
      const { data } = await axios.get(`${api}key=about&course_id=${id}`, {
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
      const { data } = await axios.get(
        `https://api.perfona.uz/v1/payment/card/add.php`,
        {
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
};
