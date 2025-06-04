import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleLogin = async (data, setUserInfo) => {
  const response = await axios.post(`${backendUrl}/auth/login`, data);
  const token = response?.data?.token;

  if (token) {
    Cookies.set("token", token, { expires: 1 });
    setUserInfo(response.data.user);
    return { success: true, token };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const handleRegister = async (data) => {
  try {
    await axios.post(`${backendUrl}/auth/register`, data);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const fetchUserInfo = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${backendUrl}/auth/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const handleUpdateProfile = async (data) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(
      `${backendUrl}/auth/update-profile`,
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
    return false;
  }
};

export const handleLogout = async () => {
  try {
    const token = Cookies.get("token");
    await axios.get(`${backendUrl}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Cookies.remove("token");
  } catch (error) {
    console.log(error);
  }
};
