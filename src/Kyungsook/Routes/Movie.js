
import React, { useEffect, useRef, useState } from 'react' ;
import Slide from "../Slide";
import styled from 'styled-components';
import img1 from "../../assets/HeaderTitle.png"; 
import img2 from "../../assets/logo.png"; 
import img3 from "../../assets/logo2.png"; 
//노력해

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

const TOTAL_SLIDES = 2 * 5;

const Movie = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    
    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
        setCurrentSlide(0);
        } else {
        setCurrentSlide(currentSlide + 5);
        }
    };

    const prevSlide = () => {
        if (currentSlide === 0) {
        setCurrentSlide(TOTAL_SLIDES);
        } else {
        setCurrentSlide(currentSlide -5);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}0%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);

    return (
      <Container>
        <MovieContainer>
        {currentSlide}
        <SliderContainer ref={slideRef}>
            <Slide img = {img1}/>
            <Slide img = {img1}/>
            <Slide img = {img1}/>
        </SliderContainer>
        <Button onClick={prevSlide}>Previous Slide</Button>
        <Button onClick={nextSlide}>Next Slide</Button>
        </MovieContainer>
    </Container>
    );
};



export default Movie ;