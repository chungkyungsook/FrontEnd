import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore,{Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination])

const SwiperImg  = (prors) => {
  const [slides,setSlides] = useState([])
  const data = new Date()
  const {kinoko} = prors

  // const listVeiw = () =>{

  //   const slideData = [] ;

  //   for( let i = 0; i<kinoko.length ; i++){
  //     slideData.push(
  //       <SwiperSlide 
  //         key={`slide-${i}`}>
  //         <img
  //           src={kinoko[i].thumbnail}
  //           style={{listStyle :'none'}}
  //           alt={`Slide ${i}`}
  //          />
  //          <h2>{`날짜 ${JSON.stringify(data)}`}</h2>
  //       </SwiperSlide>
  //     )
  //   }

  //     setSlides(slideData) ;
  // }

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