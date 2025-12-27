import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

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
            <source media="(max-width: 768px)" srcSet="/assets/Img/nosotros/20251216_201354.jpg" />
            <img src="/assets/Img/nosotros/ChatGPT%20Image%2023%20dic%202025,%2018_09_15.png" alt="Slide 1" className="w-full h-[40rem] object-cover object-top" />
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Img/nosotros/20251216_175133.jpg" alt="Slide 2" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Img/nosotros/20251216_175758.jpg" alt="Slide 3" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Img/nosotros/20251216_182659.jpg" alt="Slide 4" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Img/nosotros/20251216_203959.jpg" alt="Slide 5" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Img/nosotros/20251216_180228.jpg" alt="Slide 6" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Img/nosotros/20251216_181150.jpg" alt="Slide 7" className="w-full h-[40rem] object-cover object-top" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
