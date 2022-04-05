import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

import { BannerList } from "@/types";
import "./slider.scss";

interface SliderProps {
  bannerList: BannerList;
}

function Slider(props: SliderProps) {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: { el: ".swiper-pagination" }
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <div className="slider">
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider, index) => {
            return (
              <div
                className="swiper-slide"
                key={`${slider.imageUrl} + ${index}`}
              >
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
}

export default React.memo(Slider);
