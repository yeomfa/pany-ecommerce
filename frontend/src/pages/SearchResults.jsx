import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Search, ArrowLeft } from "lucide-react";

const SearchResults = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?keyword=${keyword}`);
        const response = await res.json();
        if (response.status === "success") {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-serif flex items-center">
          <Search className="w-8 h-8 mr-3 text-primary" />
          Search Results: "{keyword}"
        </h1>
        <p className="text-gray-500 mt-2">
          Found {products.length} result{products.length !== 1 && "s"}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No products found
          </h2>
          <p className="text-gray-500">
            Try checking your spelling or using different keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
