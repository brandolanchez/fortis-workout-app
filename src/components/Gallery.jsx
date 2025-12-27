import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { products } from '../data/products';

const ProductSlide = ({ product }) => (
  <div className="group relative overflow-hidden rounded-lg bg-gray-800">
    <Link to={`/product/${product.id}`}>
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-2xl font-bold">{product.name}</h3>
      </div>
    </Link>
  </div>
);


const ProductCarousel = () => {
  return null;
};

export default ProductCarousel;
