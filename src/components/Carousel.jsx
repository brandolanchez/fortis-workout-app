import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import img1 from '../../assets/Img/nosotros/ChatGPT Image 23 dic 2025, 18_09_15.png';
import img1_mobile from '../../assets/Img/nosotros/20251216_201354.jpg';
import img2 from '../../assets/Img/nosotros/20251216_175133.jpg';
import img3 from '../../assets/Img/nosotros/20251216_175758.jpg';
import img4 from '../../assets/Img/nosotros/20251216_182659.jpg';
import img5 from '../../assets/Img/nosotros/20251216_203959.jpg';
import img6 from '../../assets/Img/nosotros/20251216_180228.jpg';
import img7 from '../../assets/Img/nosotros/20251216_181150.jpg';

const Carousel = () => {
  return (
    <div className="bg-black py-16">
      <Swiper
        cssMode={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <picture>
            <source media="(max-width: 768px)" srcSet={img1_mobile} />
            <img src={img1} alt="Slide 1" className="w-full h-[40rem] object-cover object-top" />
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Slide 2" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Slide 3" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="Slide 4" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="Slide 5" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="Slide 6" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img7} alt="Slide 7" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
