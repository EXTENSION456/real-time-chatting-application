import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleSearch = async (searchTerm) => {
  try {
    const token = Cookies.get("token");
    const data = {
      searchTerm: searchTerm,
    };
    const response = await axios.post(
      `${backendUrl}/api/contacts/search`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
