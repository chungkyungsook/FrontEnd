
import React, { useEffect, useRef, useState } from 'react' ;
import axios from 'axios';
import styled from 'styled-components';

import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore ,{Navigation, Pagination,Thumbs}from 'swiper';
import 'swiper/swiper-bundle.css';
import '../Css/Movie.css';
// import { number } from '@amcharts/amcharts4/core';
import{
  AWS_URL
}from '../../Util/api'
SwiperCore.use([Navigation, Pagination,Thumbs]);


const Movie = (props) => {
  //isLogin cookie 값 확인

  const url = "http://localhost:3002/dummy/Movie.json";
  const test = 'dd'
  const [viewList, setViewList] = useState([])
  //슬리아더 저장 변수
  const [slides, setSlides] = useState([]);

  const [number, setNumber] = useState(0)

  const canvas = useRef('')
        
  const WIDTH = 500 - 120, HEIGHT = 800 - 100, FPS = 5;
  const FILE_NUM = 6 ;
  
  const api = '18.205.150.140'

  const arr = []
  const [images, setImages] = useState('') //모든 이미지 저장

  useEffect(()=>{
      

      for(let i = 0 ; i < FILE_NUM ; i++) {
          for(let j = 0 ; j < FILE_NUM -4 ; j++) {
              const img = new Image() ;
              img.src = `http://${AWS_URL}/api/help/image/${j + 1}` ;
              
              arr.push(img)
          }
      }

      setImages(arr) // 모든 데이터 저장
      
  },[])

  useEffect(()=>{

    number === 0 && ( axios.get(url).then(data =>{ // 모든 객체 사진 가져오기
      console.log("1번",number);
      setNumber(1)
      setViewList(data.data.MovieList) // 영상 리스트 
    }))

    number === 1 && setSlides(
      viewList.map((data,index) =>(
        // console.log("2번",data), index => 고유 숫자
        //alt 이름
        <>
        <SwiperSlide key={`slide-${index}`} tag="li"> 
          {/* <img 
            width= '500px'
            // style={{listStyle : 'none'}}
            src={data.thumbnail} 
            alt={`Thumbnail ${data}`}
          /> */}
          <canvas
              ref={canvas}
              width={500}
              height={500}
          />
          
        </SwiperSlide>
        <button onClick={replay}> 재생 </button>
        </>
      ))
    )
  },[viewList])

  useEffect(()=>{
    //aix 값 다 바뀌면 확인을 위한 선언
    number === 1 && setNumber(2)
  },[slides])

  
    // 사진 합쳐서 영상처럼 보여주기
    const replay = () =>{
      let count = 0;
      const ctx = canvas.current.getContext('2d')
      //배경 설정
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, 700, 706 + 70 )

      const clearData = setInterval(() => { //일정한 시간 간격으로 작업을 수행하기 위해서 사용
          if(count === images.length) {  // 영상 없으면 멈춤
              clearInterval(clearData) ; // 반복을 멈추기 위해 
              return ; 
          }
          ctx.drawImage(images[count++], 10, 10, WIDTH, HEIGHT) ;
      }, 1000 / FPS) ; 
  }
  
    return (
      <>
        {
            props.cookies.get('token') ? 
            
            number === 2 && (
               <div className='test'>              
                <Swiper 
                id="main"
                tag="section" 
                wrapperTag="ul" 
                // navigation 
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
            : 
            (<Redirect to="/login" />)
        }
        </>
    );
};


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
export default withCookies(Movie) ;