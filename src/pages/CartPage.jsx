import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const { user, fetchWithAuth } = useContext(AuthContext);

  const handleFinalizePurchase = async () => {
    if (!user) {
      alert('Necesitas iniciar sesión con Google para completar la compra.');
      return;
    }

    const items = cartItems.map(i => ({ productId: i.id, title: i.name, price: i.price, quantity: i.quantity }));

    try {
      const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Compra realizada correctamente. Gracias!');
        clearCart();
      } else {
        console.error('Order error', data);
        alert(data.message || 'Error al procesar la orden');
      }
    } catch (err) {
      console.error('Order exception', err);
      alert('Error de red al procesar la orden');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen font-sans text-center py-20">
        <h1 className="font-heading text-4xl mb-4">Your Cart is Empty</h1>
        <Link to="/" className="text-fortis-gold hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-48">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="font-heading text-4xl md:text-5xl mb-8">Your Cart</h1>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="grid grid-cols-5 gap-4 items-center bg-gray-900 p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <h2 className="text-xl col-span-1">{item.name}</h2>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  className="w-16 p-1 rounded bg-gray-800 text-white text-center"
                />
              </div>
              <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-400 justify-self-end"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <h2 className="text-3xl font-bold">Total: <span className="text-fortis-gold">${total.toFixed(2)}</span></h2>
          <button
            onClick={handleFinalizePurchase}
            className="mt-4 bg-fortis-gold text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors duration-300"
          >
            Finalize Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
