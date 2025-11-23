import { LayoutDashboard, Package, Users } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm sticky top-[72px] h-[calc(100vh-72px)] z-10 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 font-serif flex items-center">
          <LayoutDashboard className="w-6 h-6 mr-2 text-primary" />
          Dashboard
        </h2>
      </div>
      <nav className="px-4 space-y-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
            activeTab === "overview"
              ? "bg-primary/10 text-primary"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
            activeTab === "products"
              ? "bg-primary/10 text-primary"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Package className="w-5 h-5 mr-3" />
          Products
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
            activeTab === "users"
              ? "bg-primary/10 text-primary"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Users className="w-5 h-5 mr-3" />
          Users
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
