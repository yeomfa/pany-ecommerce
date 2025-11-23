const UsersTable = ({ users }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 font-serif mb-8">
        User Management
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-500 text-sm font-mono">
                    {user._id.substring(0, 10)}...
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                        Admin
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                        Customer
                      </span>
                    )}
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
  );
};

export default UsersTable;
