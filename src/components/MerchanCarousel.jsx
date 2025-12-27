import React, { useEffect, useState } from 'react';
import img1 from '../../assets/Img/merchan/1.png';
import img2 from '../../assets/Img/merchan/2.png';
import img3 from '../../assets/Img/merchan/3.png';
import img4 from '../../assets/Img/merchan/photo_2025-12-25_14-00-06.jpg';
import img5 from '../../assets/Img/merchan/photo_2025-12-25_14-00-21.jpg';
import img6 from '../../assets/Img/merchan/photo_2025-12-25_14-00-26.jpg';

const MerchanCarousel = () => {
  const images = [img1, img2, img3, img4, img5, img6];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="relative w-full h-80 md:h-[550px] my-6 overflow-hidden rounded-lg shadow-lg">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Merchan ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default MerchanCarousel;
