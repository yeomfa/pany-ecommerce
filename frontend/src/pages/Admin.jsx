import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import ProductsTable from "../components/admin/ProductsTable";
import UsersTable from "../components/admin/UsersTable";
import ProductModal from "../components/admin/ProductModal";
import DashboardOverview from "../components/admin/DashboardOverview";
import useAdmin from "../hooks/useAdmin";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: "",
  });

  const {
    products,
    users,
    loading,
    message,
    deleteProduct,
    createOrUpdateProduct,
  } = useAdmin();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setEditMode(false);
    setEditingProductId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      countInStock: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      countInStock: product.countInStock,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createOrUpdateProduct(
      formData,
      editMode,
      editingProductId
    );
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-72px)] bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8 overflow-y-auto h-full">
        {message && (
          <div
            className={`max-w-6xl mx-auto p-4 mb-6 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        {activeTab === "overview" && (
          <DashboardOverview products={products} users={users} />
        )}

        {activeTab === "products" && (
          <ProductsTable
            products={products}
            loading={loading}
            openCreateModal={openCreateModal}
            openEditModal={openEditModal}
            handleDeleteProduct={deleteProduct}
          />
        )}

        {activeTab === "users" && <UsersTable users={users} />}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editMode={editMode}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Admin;
