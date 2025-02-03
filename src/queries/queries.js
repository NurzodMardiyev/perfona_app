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

  coursesData: async (page, limet) => {
    // english o'zgaradi && page bilan limet ham o'zgaradi
    console.log(page);
    try {
      const { data } = await axios.get(
        `${api}key=main_card&page=${page}&limit=${limet}&category=english`,
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
