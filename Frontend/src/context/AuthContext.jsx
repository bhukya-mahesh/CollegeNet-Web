import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4545/api";

  const checkAuth = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/isauthenticated`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    checkAuth,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};