
import React, { useEffect, useRef, useState } from 'react' ;
import axios from 'axios';
import styled from 'styled-components';

import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore ,{Navigation, Pagination,Thumbs}from 'swiper';
import 'swiper/swiper-bundle.css';
import '../Css/Movie.css';
import { number } from '@amcharts/amcharts4/core';

SwiperCore.use([Navigation, Pagination,Thumbs]);
//전체 영역
const Container = styled.div`
    width: 60%;
    display : flex;
    text-align: center;
`;

const MovieContainer = styled.div`
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`;

const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
`;

const Movie = (props) => {
  //isLogin cookie 값 확인
  const isLoginCheck = props.cookies.get('isLogin')

  const url = "http://localhost:3000/dummy/Movie.json";
  const [viewList, setViewList] = useState([])
  //슬리아더 저장 변수
  const [slides, setSlides] = useState([]);

  const [number, setNumber] = useState(0)

  useEffect(()=>{

    number === 0 && ( axios.get(url).then(data =>{
      console.log("1번",number);
      setNumber(1)
      setViewList(data.data.MovieList)
    }))

    number === 1 && setSlides(
      viewList.map((data,index) =>(
        console.log("2번",data),
        <SwiperSlide key={`slide-${index}`} tag="li">
          <img 
            width= '500px'
            // style={{listStyle : 'none'}}
            src={data.thumbnail} 
            alt={`Thumbnail ${data}`}
          />
        </SwiperSlide>
      ))
    )
  },[viewList])

  useEffect(()=>{

    setNumber(2)
  },[slides])
  
    return (
      <>
        {
            !isLoginCheck ? (<Redirect to="/login" />) : number === 2 && (
               <div className='test'>              
                <Swiper 
                id="main" 
                tag="section" 
                wrapperTag="ul" 
                navigation 
                pagination 
                spaceBetween={0} 
                slidesPerView={1}
                onInit ={(swiper) => console.log('Swiper initalized!')}
                onSlideChange={(swiper) => {console.log("Slide index changed to:", swiper.activeIndex);}}
                onReachEnd={()=>console.log('Swiper end reached')}
                >
                  {slides}
                </Swiper>
              </div>
            )
        }
        </>
    );
};



export default withCookies(Movie) ;