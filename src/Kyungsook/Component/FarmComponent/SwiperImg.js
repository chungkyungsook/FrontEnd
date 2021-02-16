import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore,{Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination])

const SwiperImg  = (prors) => {
  const [slides,setSlides] = useState([])
  const data = new Date()
  const {kinoko} = prors


  useEffect(() =>{
    console.log("kinoko" + kinoko) ;

  },[kinoko])

  return(
    <>
      <Swiper id="main" navigation={true} pagination={true}>
        {kinoko.map((data, index) => (
          <SwiperSlide key={index}>{JSON.stringify(data)}</SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}



export default SwiperImg;