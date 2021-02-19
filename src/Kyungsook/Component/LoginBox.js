import React,{useEffect, useState} from 'react' ;
import styled     from 'styled-components' ;
import { Link, Redirect, Route }   from 'react-router-dom' ;
import axios from "axios";
import KaKaoLogin from 'react-kakao-login';
import { withCookies} from 'react-cookie';

import {
    AWS_URL
} from '../../Util/api'

const LoginBoxSamples =(props)=> {
   

}

   //로그인 버튼 클릭시 실행
    
    // return (
    //     <>
    //     {
    //         isLogin ? (<Redirect to="/" />) : (
    //         <>
    //             <LoginPont>Login</LoginPont>
    //             <LoginBox>
                    
    //                 <KaKaoBtn
    //                     jsKey={'91224fabd87ed64c0173372e3b0e3581'}
    //                     buttonText="카카오 계정으로 회원가입"
    //                     onSuccess={responseKaKao} //로그인 성공한 경우 실행할 함수
    //                     getProfile={true}
    //                 />

    //             </LoginBox>
    //             {/* {isLogin && move()} */}
    //         </>
    //         )
    //     }
    //     </>
    //     )

//로그인 글자 속성
const LoginPont      = styled.div`
    /* box 속성*/
    padding         : 5.5rem 3rem  4rem;
    
    /* 폰트 속성 */
    font-size       : 3.5rem;
    
`;

// 로그인, 비밀번호 박스
const LoginBox       = styled.div`

    /* box 설정 ->   세로*/
    display         : flex;
    flex-direction  : column ;
    justify-content : center ;
    
    /* 위치 */
    padding : 1rem 3rem ;
    
`;

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
export default withCookies(LoginBoxSamples);