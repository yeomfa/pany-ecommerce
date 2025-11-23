import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useAdmin = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    } else {
      fetchProducts();
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const response = await res.json();
      if (response.status === "success") {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const res = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (response.status === "success") {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setMessage({
            type: "success",
            text: "Product deleted successfully!",
          });
          fetchProducts();
        } else {
          const data = await res.json();
          setMessage({
            type: "error",
            text:
              data.data?.message || data.message || "Failed to delete product.",
          });
        }
      } catch {
        setMessage({ type: "error", text: "Error connecting to server." });
      }
    }
  };

  const createOrUpdateProduct = async (
    formData,
    editMode,
    editingProductId
  ) => {
    try {
      const url = editMode
        ? `/api/products/${editingProductId}`
        : "/api/products";
      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (response.status === "success") {
        setMessage({
          type: "success",
          text: `Product ${editMode ? "updated" : "created"} successfully!`,
        });
        fetchProducts();
        return true;
      } else {
        setMessage({
          type: "error",
          text:
            response.data?.message ||
            response.message ||
            `Failed to ${editMode ? "update" : "create"} product.`,
        });
        return false;
      }
    } catch {
      setMessage({ type: "error", text: "Error connecting to server." });
      return false;
    }
  };

  return {
    products,
    users,
    loading,
    message,
    deleteProduct,
    createOrUpdateProduct,
  };
};

export default useAdmin;
