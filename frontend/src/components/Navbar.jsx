import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const itemCount = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-primary font-serif tracking-tight"
        >
          Pany
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={submitHandler}
          className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 mx-6 flex-1 max-w-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for bread, pastries..."
            className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>

        <div className="flex items-center space-x-8">
          <div className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            {user && user.isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <User className="w-6 h-6" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
