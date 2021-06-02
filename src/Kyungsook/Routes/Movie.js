
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
  AWS_URL,
  CLUSTER
}from '../../Util/api'
import { log } from 'three';
SwiperCore.use([Navigation, Pagination,Thumbs]);


const Movie = (props) => {
  //isLogin cookie 값 확인

  //슬리아더 저장 변수
  const [slides, setSlides] = useState([]);

  const [number, setNumber] = useState(0)

  const canvas = [useRef(),useRef(),useRef()]
        
  const WIDTH = 500 - 22, HEIGHT = 500 - 22, FPS = 6;

  const arr = []
  const [images, setImages] = useState('') //모든 이미지 저장

  const [temp, setTemp] = useState() //모든 이미지 저장


  useEffect(()=>{
      
      
    const kinokoImg = async () => { // 모든 이미지 저장 temp
        await axios.get(`${AWS_URL}${CLUSTER}/1`, {
          params : {
            token : props.cookies.get('token') 
          }
        }).then(data => {
            console.log(data);
            setTemp(data.data.filter(data => data !== null ))
            setImages(
              data.data.filter(data => data !== null )
            )
        }).catch(e => {
          alert('해당 데이터가 없습니다.')
          console.log('movie 값 오류 났습니다.');
        });
        
    }

    kinokoImg();

    const test = async () => {
      await axios.get(`${AWS_URL}/farm/enddate`,{
        params:{id:1}
      }).then(data => {
        console.log(data);
      })
    }

    test()
      
  },[])

    useEffect(() =>{

      if(temp !== undefined ){ //빈 값이 없는 지 확인 후 실행
          if(temp.length !== 0){
            console.log(temp.length);
            for(let i = 0 ; i < temp.length + 5; i++) {
              for(let j = 0 ; j < temp[0].members.length ; j++) {
                  const img = new Image() ;
                  img.src = `${AWS_URL}/api/compost/${temp[0].members[j]}` ;
                  img.width = 480
                  arr.push(img)
              } 
            }
    
              setImages(arr) // 모든 데이터 저장
              setNumber(1)
    
          }else if(temp.length === 0){
            alert('아직 완성된 영상이 없어요..')
          }
      }
    
  },[temp])

  useEffect(()=>{

    number === 1 && setSlides(
      temp.map((data,index) =>(
        //alt 이름
        
        <SwiperSlide key={`slide-${index}`} tag="li"> 
          <canvas
              ref={canvas[index]}
              width={500}
              height={500}
              
          />
          <Btn_play onClick={() =>replay(index)}> 재생 </Btn_play>
        </SwiperSlide>
      ))

    )
  },[number])

  useEffect(()=>{
    //aix 값 다 바뀌면 확인을 위한 선언
    number === 1 && setNumber(2)
  },[slides])
  
    // 사진 합쳐서 영상처럼 보여주기
    const replay = (index) =>{
      let count = 0;
      const ctx = canvas[index].current.getContext('2d')
      console.log("해당 페이지 번호 ",index)
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

const Btn_play = styled.button`
    display: block;
    margin-left: 236px;
    margin-top: 9px;
    
`
export default withCookies(Movie) ;