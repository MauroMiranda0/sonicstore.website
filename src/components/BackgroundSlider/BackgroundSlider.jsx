import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './BackgroundSlider.module.scss';
import { resolveAssetPath } from '../../utils/assets';

export default function BackgroundSlider({ slides, speed = 800, autoplayDelay = 3200 }) {
  return (
    <div className={styles.slider} aria-hidden="true">
      <div className={styles.overlay} />
      <Swiper
        className={styles.swiper}
        modules={[Autoplay]}
        speed={speed}
        loop
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className={styles.slide}>
              <p className={styles.title}>{slide.title}</p>
              <img className={styles.image} src={resolveAssetPath(slide.image)} alt={slide.alt} loading="lazy" />
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
