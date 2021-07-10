import { Redirect } from "react-router-dom";


import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { AWS_URL } from "../../Util/api";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "../Css/movie2.css";
import videoMushroom from '../../../src/videos/mock.mp4'

import SwiperCore, {
  Pagination,Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination,Navigation]);

export default function Movie(){
  if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>

  return (
    <div className='movie-wrap'>
      <div className='inner'>

         <div className='movie-title'> &#60; MOVIE &#62;</div>
         <div className='video-wrap'>
         <Swiper pagination={{
            "type": "progressbar"
            }} navigation={false} className="mySwiper">
          <SwiperSlide>
              <video className='video-mushroom' controls >
                <source src={`${AWS_URL}/api/mock/1`}/>
              </video>

            <div className='play-wrap'>
              <a  className='btn-value' href={videoMushroom} download="Mushroom"> ダウンロード </a>
            </div>
          </SwiperSlide>

        </Swiper>
      
        </div>
      
      </div>
    </div>
  );
};
