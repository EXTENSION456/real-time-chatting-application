import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getMessages = async (id) => {
  try {
    const token = Cookies.get("token");
    const data = {
      id: id,
    };
    const response = await axios.post(
      `${backendUrl}/api/messages/get-messages`,
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

export const getAllContacts = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${backendUrl}/api/messages/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
