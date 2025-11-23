import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const response = await res.json();
        if (response.status === "success") {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, Number(qty));
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Menu</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-96 md:h-[600px] relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary uppercase tracking-widest shadow-sm">
                {product.category}
              </span>
            </div>
          </div>

          <div className="p-10 md:p-14 flex flex-col justify-center bg-white">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight font-serif">
              {product.name}
            </h1>

            <div className="flex items-center mb-8">
              <span className="text-4xl font-bold text-primary font-serif">
                ${product.price.toFixed(2)}
              </span>
              {product.countInStock > 0 ? (
                <span className="ml-6 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  In Stock
                </span>
              ) : (
                <span className="ml-6 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light">
              {product.description}
            </p>

            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-center space-x-6 mb-8">
                <label
                  htmlFor="qty"
                  className="font-medium text-gray-900 text-lg"
                >
                  Quantity
                </label>
                <div className="relative">
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-xl py-3 pl-6 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-5 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                disabled={product.countInStock === 0}
              >
                <ShoppingBag className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
