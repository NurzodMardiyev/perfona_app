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

  coursesData: async () => {
    // english o'zgaradi && page bilan limet ham o'zgaradi
    try {
      const { data } = await axios.get(
        `${api}key=main_card&page=2&limit=3&category=english`,
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
};
