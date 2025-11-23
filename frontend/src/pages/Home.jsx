import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-stone-900 rounded-3xl overflow-hidden mb-16 shadow-2xl">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Bakery Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>

        <div className="relative z-10 px-10 py-24 md:px-20 md:py-32 max-w-4xl">
          <span className="inline-block px-4 py-2 bg-primary/90 text-white rounded-full text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Artisanal Bakery
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight font-serif">
            Baked with Love, <br />
            <span className="text-accent">Served with Joy</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-xl leading-relaxed font-light">
            Experience the authentic taste of traditional baking. From crispy
            sourdoughs to buttery croissants, every bite tells a story of
            passion and craftsmanship.
          </p>
          <Link to="/menu">
            <button className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
          Fresh from the Oven
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Handcrafted daily using only the finest organic ingredients.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
