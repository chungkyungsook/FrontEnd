import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore,{Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../Css/farm.css';

SwiperCore.use([Navigation, Pagination])

const SwiperImg  = ({kinoko}) => {
  const [slide,setSlide] = useState([])
  const [slides,setSlides] = useState([])
  const [number, setNuber] = useState(0)
  useEffect(() =>{
    console.log("===================farm SwiperImg 처음 실행 화면===================");
    console.log(kinoko);
    setSlide(
      <SwiperSlide>
        <div className="farm_text">버섯을 눌러보세요</div>
      </SwiperSlide>
    )
  },[])

  useEffect(()=>{
    console.log("===================farm SwiperImg===================");
    kinoko && (
      setSlides(
        kinoko.thumbnail.map((data,index) =>(
          setNuber(1),
          <SwiperSlide key={`slide-${index}`} tag="li">
            <img src={data} alt={`Thumbanil ${data}`}/>
          </SwiperSlide>
        ))
      ) 
    )

    
  },[kinoko])

  useEffect(()=>{
    setNuber(2)
  },[slides])

  return(
       number === 2 && (<Swiper 
        id="main"
        tag="section" 
        wrapperTag="ul" 
        navigation 
        spaceBetween={0} 
        slidesPerView={1}
        onInit ={(swiper) => console.log('Swiper initalized!')}
        onSlideChange={(swiper) => {console.log("Slide index changed to:", swiper.activeIndex);}}
        onReachEnd={()=>console.log('Swiper end reached')}
        >
          {kinoko != null ? slides : slide}
      </Swiper> )
  )
}


export default SwiperImg;