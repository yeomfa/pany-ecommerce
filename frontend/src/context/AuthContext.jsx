import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const loading = false;

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();

      if (response.status === "success") {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
        return { success: true };
      } else {
        const message =
          response.data?.message || response.message || "Login failed";
        return { success: false, message };
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const response = await res.json();

      if (response.status === "success") {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
