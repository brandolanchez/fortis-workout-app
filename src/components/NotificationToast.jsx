import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from '../context/NotificationContext';
import { CartContext } from '../context/CartContext';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const NotificationToast = () => {
  const { notification, hideNotification } = useContext(NotificationContext);
  const { cartItems } = useContext(CartContext);

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Use a local state to manage the transition if needed,
  // but for simple mount/unmount and CSS, direct class changes are often sufficient.
  // The 'notification' context value will control the actual visible/hidden state.

  const { product, details } = notification || {}; // Destructure safely even if notification is null

  return (
    <div 
      className={`fixed top-5 right-5 z-50 transition-all duration-300 ease-out transform
        ${notification ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      // This outer div now always renders, but its children are conditionally rendered for performance/accessibility
    >
      {notification && ( // Only render inner content if there's a notification
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full font-sans">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500 text-xl" />
              <span className="font-semibold text-gray-800 text-base">Artículo agregado a tu carrito</span>
            </div>
            <button onClick={hideNotification} className="text-gray-400 hover:text-gray-600">
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="flex gap-5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-[80px] h-[100px] object-cover rounded border border-gray-200"
              />
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                {details.map(detail => (
                  <p key={detail.etiqueta} className="text-base text-gray-600 mt-1">
                    <span className="font-medium">{detail.etiqueta}:</span> {detail.valor}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with CTAs */}
          <div className="p-4 bg-gray-50 rounded-b-lg space-y-3">
            <Link
              to="/cart"
              onClick={hideNotification}
              className="block w-full text-center px-4 py-3 bg-white border border-gray-300 rounded-md font-semibold text-gray-800 hover:bg-gray-100 text-base"
            >
              Ver carrito ({totalCartItems})
            </Link>
            <Link
              to="/cart" // As checkout page is not ready, this will also go to cart
              onClick={hideNotification}
              className="block w-full text-center px-4 py-3 bg-gray-900 border border-transparent rounded-md font-semibold text-white hover:bg-gray-800 text-base"
            >
              Pagar pedido
            </Link>
            <button 
              onClick={hideNotification} 
              className="w-full text-center text-base text-gray-600 hover:underline"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationToast;
