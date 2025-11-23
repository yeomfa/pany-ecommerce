import { Package, Users, AlertTriangle, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
      {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const DashboardOverview = ({ products, users }) => {
  const totalProducts = products.length;
  const totalUsers = users.length;
  const lowStockProducts = products.filter((p) => p.countInStock < 5);
  const totalValue = products.reduce(
    (acc, p) => acc + p.price * p.countInStock,
    0
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 font-serif mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="bg-blue-500"
          subtext="Active items in inventory"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="bg-purple-500"
          subtext="Registered customers"
        />
        <StatCard
          title="Low Stock"
          value={lowStockProducts.length}
          icon={AlertTriangle}
          color="bg-orange-500"
          subtext="Items needing restock"
        />
        <StatCard
          title="Inventory Value"
          value={`$${totalValue.toFixed(0)}`}
          icon={TrendingUp}
          color="bg-green-500"
          subtext="Total asset value"
        />
      </div>

      {/* Recent Activity / Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Low Stock Alerts
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-bold">
                        {product.countInStock}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          Critical
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No low stock items. Good job!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats or Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-500" />
              Newest Users
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.slice(0, 5).map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
