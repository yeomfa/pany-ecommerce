import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-xl text-gray-500 mb-6">
            Your cart is currently empty.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-secondary transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-6 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-6"
                    />
                    <div className="flex-grow">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-bold text-gray-900 hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-gray-700 font-medium">
                        {item.qty} x ${item.price.toFixed(2)}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Tax (8%)</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between mb-8 text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-secondary transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
