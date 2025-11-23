import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-gray-100">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-background text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            disabled={product.countInStock === 0}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
