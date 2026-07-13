import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_URL
  : "";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/data`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      console.error(
        "Get user data error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error) {
      console.error(
        "Auth state error:",
        error.response?.data || error.message
      );

      setIsLoggedin(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};