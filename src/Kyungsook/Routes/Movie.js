
import React, { useEffect, useRef, useState } from 'react' ;
import axios from 'axios';
import styled from 'styled-components';

import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

//전체 영역
const Container = styled.div`
    width: 60%;
    display : flex;
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
  const [number, setNumber] = useState(0)

  //슬리아더 저장 변수
  const [slides, setSlides] = useState([]);

  useEffect(()=>{
    axios.get(url).then(data =>{
      setViewList(data.data.MovieList)
    })
    setNumber(1)
  },[])

  
  useEffect(()=>{
    setSlides(
      viewList.map((data,index) =>(
        <SwiperSlide key={`slide-${index}`}>
          <img src={data.thumbnail} 
            alt={`Slide ${data}`}
          />
        </SwiperSlide>
      ))
    )

  },[viewList])
    
    return (
      <>
        {
            !isLoginCheck ? (<Redirect to="/login" />) : (
              <Container>
              <Swiper id="main">
                {slides}
              </Swiper>
              </Container>)
        }
        </>
    );
};



export default withCookies(Movie) ;