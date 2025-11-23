import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const response = await res.json();
        if (response.status === "success") {
          const data = response.data.products;
          setProducts(data);

          // Extract unique categories
          const uniqueCategories = [...new Set(data.map((p) => p.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
          Our Menu
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide selection of freshly baked goods, from artisanal
          breads to sweet pastries.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            filter === "all"
              ? "bg-primary text-white shadow-lg transform -translate-y-1"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all capitalize ${
              filter === category
                ? "bg-primary text-white shadow-lg transform -translate-y-1"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No items found
          </h2>
          <p className="text-gray-500">Try selecting a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
