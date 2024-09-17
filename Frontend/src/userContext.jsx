import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = async () => {
    setUser(null);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}api/v1/auth/logout`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }, 
        }
      );
      setTimeout(() => {
        toast.success(data?.message);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        toast.error(
          error?.response?.data?.message || "Error Occurred during loginout"
        );
      }, 500);
    }
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
