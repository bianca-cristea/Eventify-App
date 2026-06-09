import React from 'react'
import { Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, EffectFade, Autoplay,Navigation } from 'swiper/modules'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade'; 
import 'swiper/css';

import {Link} from 'react-router-dom'
import {bannerList} from "../../utils/bannerList.js"

const colors = [
  "bg-gradient-to-r from-black via-slate-900 to-indigo-950",
  "bg-gradient-to-r from-black via-purple-950 to-violet-900",
  "bg-gradient-to-r from-black via-blue-950 to-cyan-900",
];

const HeroBanner = () => {

  
  return (
    <div className='py-2 rounded-md'>
       <Swiper 
              grabCursor={true}
              autoplay={{
                delay:4000,
                disableOnInteraction:false
              }}
              navigation
              modules={[Pagination, EffectFade, Navigation, Autoplay]}
              pagination={{clickable: true}}
              scrollbar={{draggable: true}}
              slidesPerView={1}
              >
                {bannerList.map((item,i) => (
              <SwiperSlide key={item.id}>
                <div
                  className={`
                    ${colors[i]}
                    min-h-[400]
                    lg:min-h-[500]
                    rounded-xl
                    overflow-hidden
                  `}
                >
                  <div className="flex flex-col lg:flex-row items-center h-full">
                    
                     
                    <div className="w-full lg:w-1/2 p-8 lg:p-16 text-center lg:text-left">
                      <span className="text-white/80 text-lg">
                        Featured Collection
                      </span>

                      <h3 className="text-2xl lg:text-3xl font-semibold text-white mt-2">
                        {item.title}
                      </h3>

                      <h1 className="text-4xl lg:text-6xl font-bold text-white mt-4">
                        {item.subtitle}
                      </h1>

                      <p className="text-white/90 mt-6 max-w-md mx-auto lg:mx-0">
                        {item.description}
                      </p>

                      <Link
                        to="/events"
                        className="
                          inline-block
                          mt-8
                          px-8
                          py-3
                          bg-black
                          text-white
                          rounded-lg
                          font-medium
                          transition
                          hover:scale-105
                          hover:bg-gray-900
                        "
                      >
                        Shop Now
                      </Link>
                    </div>

                     
                    <div className="w-full lg:w-1/2 flex justify-center p-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="
                          w-full
                          max-w-md
                          object-contain
                          drop-shadow-2xl
                        "
                      />
                    </div>

                  </div>
                </div>
              </SwiperSlide>
                ))}
        </Swiper> 
    </div>
  )
}

export default HeroBanner
