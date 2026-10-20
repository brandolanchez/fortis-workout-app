import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Keyboard, Autoplay } from 'swiper/modules';

const slides = [
  { src: '/assets/Img/nosotros/20251216_175133.webp', alt: 'Miembro de Fortis frente al Lago de Maracaibo con la camiseta del club' },
  { src: '/assets/Img/nosotros/20251216_175758.webp', alt: 'Atleta en el aire haciendo un movimiento dinámico en las barras' },
  { src: '/assets/Img/nosotros/20251216_182659.webp', alt: 'Miembros de Fortis sobre las barras de la Vereda del Lago al atardecer' },
  { src: '/assets/Img/nosotros/20251216_203959.webp', alt: 'Parada de manos de noche en la Vereda del Lago' },
  { src: '/assets/Img/nosotros/20251216_180228.webp', alt: 'Parada de manos sobre las paralelas del parque' },
  { src: '/assets/Img/nosotros/20251216_181150.webp', alt: 'Miembros de Fortis en el área de barras al atardecer' },
];

const Carousel = () => (
  <div className="rounded-lg overflow-hidden">
    <Swiper
      pagination={{ clickable: true }}
      keyboard={true}
      modules={[Pagination, Keyboard, Autoplay]}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={s.src}>
          <img
            src={s.src}
            alt={s.alt}
            width="1600"
            height="900"
            loading={i === 0 ? 'eager' : 'lazy'}
            className="w-full h-[22rem] md:h-[34rem] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Carousel;
