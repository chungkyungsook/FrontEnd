import React from 'react' ;
import '../Css/Join.css'
// 그림 리소스
import logoimg1 from '../../assets/logo.png' ;
import logoimg2   from '../../assets/logo2.png' ;
import logo_text1      from '../../assets/logo_text1.png' ;
import { Swiper,SwiperSlide } from 'swiper/react';
import KakaoLogin from 'react-kakao-login'
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"
import "swiper/components/pagination/pagination.min.css"

//API
import {
  AWS_URL,
  REGISTER,
  LOGIN,
}from '../../Util/api'

// import Swiper core and required modules
import SwiperCore, {
  EffectCube,Autoplay
} from 'swiper/core';

import axios from 'axios';
import { useLoginContext } from '../../KinokoContext';

// install Swiper modules
SwiperCore.use([EffectCube,Autoplay]);

export default function Join(){
  const {isLogin, setIsLogin} = useLoginContext()

  //로그인
  const login = (res) =>{
    localStorage.setItem('userInfo',JSON.stringify(res.profile))
    console.log("kakao",res);
    getJoinAccount(res.profile)
    swal(`いらっしゃいませ ${res.profile.properties.nickname}さま!:)`); //window 창
  }

  //회원가입 api
  async function getJoinAccount( data ){
    
    await axios.post(`${AWS_URL}${REGISTER}`,{
      id: data.id,
      email: data.kakao_account.email
    }).then(response =>{
      console.log("회원가입 성공",response);
      swal(`会員登録に成功しました。 いらっしゃいませ ${data.profile.properties.nickname}さま!:)`); //window 창
      getLoginAccount(data)
    }).catch(e=>{
      let message = e.response.data
      if (message === '이미 가입된 계정입니다.'){
        getLoginAccount(data)
      }
    })
  
  }

  //로그인 api
  async function getLoginAccount( data ){
    
    await axios.post(`${AWS_URL}${LOGIN}`,{
      // token: window.Kakao.Auth.getAccessToken(),
      token: window.Kakao.Auth.getAccessToken(),
      id: data.id
    }).then(response =>{
      console.log("로그인 성공",response);
      localStorage.setItem('isLogin', '로그인성공')
      setIsLogin(true) // 전역 context변수 사용 (X)
    }).catch(e=>{
      console.log("로그인 실패",e);
    })
  }
 

  // token 없으면 로그인 페이지로 이동
  if( window.Kakao.Auth.getAccessToken() || isLogin )return <Redirect to='/' />

  return(
    <>
      <section className='login-wrap'>
        <div className='inner'>                    

          <div className='login tit'>
              <img src={logo_text1} alt='title'/>
          </div>

          <div className='logo-img'>
              <p> マッシュマッシュプロジェクトへようこそ!　</p>
              <Swiper 
                effect={'cube'} 
                grabCursor={true} 
                cubeEffect={{
                  "shadow": true,
                  "slideShadows": true,
                  "shadowOffset": 25,
                  "shadowScale": 0.74,
                }}
                loop={true}
                autoplay={{delay:5000}}
                className="mySwiper">
                <SwiperSlide><img src={logoimg1} alt='logo' className='logo1'/></SwiperSlide>
                <SwiperSlide><img src={logoimg2} alt='logo'/></SwiperSlide>
                </Swiper>
          </div>

          <div className='kakao-btn'>
            <KakaoLogin
                jsKey={'f8f1fac656c36d6630bc59140a724fb5'}
                onSuccess={(res) => {login(res)}}
            >
              <p className='kakao-font'>KAKAOでログイン</p>
            </KakaoLogin>
          </div>
        </div>
      </section>
    </>
  )
}
