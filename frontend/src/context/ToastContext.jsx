import { createContext, useState, useContext, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-xl shadow-lg border transform transition-all duration-300 animate-slide-in ${
              toast.type === "success"
                ? "bg-white border-green-100 text-green-800"
                : toast.type === "error"
                ? "bg-white border-red-100 text-red-800"
                : "bg-white border-blue-100 text-blue-800"
            }`}
          >
            <div className="mr-3">
              {toast.type === "success" && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <p className="font-medium text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
