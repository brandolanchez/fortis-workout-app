import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const navigate = useNavigate();

  return (
    // Outer wrapper captures clicks on the background to navigate back
    <div
      className="bg-black text-white min-h-screen font-sans pt-48"
      onClick={() => navigate('/')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Escape') navigate('/'); }}
    >
      <div className="max-w-4xl mx-auto p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-3xl font-bold text-fortis-gold mb-6">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
