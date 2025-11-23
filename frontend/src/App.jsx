import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import SearchResults from "./pages/SearchResults";
import Menu from "./pages/Menu";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

import { useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className={`flex-grow ${
          isAdmin ? "w-full" : "container mx-auto px-4 py-8"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/search/:keyword" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!isAdmin && (
        <footer className="bg-secondary text-white py-6 text-center">
          <p>&copy; 2025 Pany - Artisanal Bakery. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <MainLayout />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
