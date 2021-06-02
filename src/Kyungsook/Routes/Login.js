import React, { useEffect, useState }      from 'react' ;
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import LoginForm from '../Component/LoginForm';

import {
    AWS_URL,
    REGISTER,
    LOGIN
}from '../../Util/api'

import{
    LOGIN_DEBUG
}from '../../Util/debugging'

import axios from 'axios';

const Login = ({cookies,setIsLogin}) => {
//////////////////////////////////////////////////////////////////// 변수
    const [userKakaoInfo, setUserKakaoInfo] = useState({
        userId : null,
        userEmail : null,
        userToken : null
    })

    const {userId, userEmail, userToken} = userKakaoInfo

    // 로그인 별로 확인 해주기 1 = 회원가입 2 = 로그인 
    const [login, setLogin] = useState(0)

    //token 저장하기
//////////////////////////////////////////////////////////////////// 함수


    //user정보 저장하기
    const onClickLogin = async(res)=>{
        LOGIN_DEBUG && console.log("로그인 버튼 클릭",JSON.stringify(res))
        //kakao정보 받아 오기 -> 필요한 정보, userId, toekn, email
        setUserKakaoInfo({
            userId : JSON.stringify(res.profile.id),
            userEmail :res.profile.kakao_account.email,
            userToken : res.response.refresh_token
        })

        //정보 가져오기 성공 -> 1
        setLogin(1)
                
    }

    //쿠키에 값 저장하기 token, userId
    const setCookie = ()=>{
        cookies.set('token',userToken)
        cookies.set('userId',userId)
    }


//////////////////////////////////////////////////////////////////// 
   
    //처음 시작 한번만
    useEffect(()=>{
        //로그인 여부 확인해주기 -> token값 
        //token값이 없으면 모든 쿠키 값 지워주기
        
        LOGIN_DEBUG && console.log("===================Login 페이지 처음 화면===================");
        LOGIN_DEBUG && console.log("Login cookies token",cookies.get('token'))
        LOGIN_DEBUG && console.log("Login userId",cookies.get('userId'))
    },[])

    //카카오 로그인후 회원가입 여부및 로그인 해주기
    useEffect(()=>{
        LOGIN_DEBUG && console.log("=========== Login 카카오 로그인 =======");
        LOGIN_DEBUG && console.log("Login cookies token",cookies.get('token'))
        login !== 0 && 
        (login === 1 ? 
        //1. 회원가입 여부 확인(가입된 정보 있으면 2번) 후 회원가입(2번) -> 필요한 정보 userId, email 
        (
             axios.post(`${AWS_URL}${REGISTER}`,{
                 
                    id :  userId,
                    email : userEmail
                
            }).then(data => {
                LOGIN_DEBUG && console.log(data.status,"회원가입 성공")
                setLogin(2)
            }).catch(e=>{
                LOGIN_DEBUG && console.log(e.response.status)
                LOGIN_DEBUG && console.log(e.response.data,"회원가입 실패")
                e.response.status === 401 && setLogin(2)
            })

        )
        //2. 로그인 해주기 -> 필요한 정보 userid, token 
        : login === 2? 
        //로그인 여부 확인
        (
            axios.post(`${AWS_URL}${LOGIN}`,{
                id : userId,
                token : userToken
            }).then(data =>{
                LOGIN_DEBUG && console.log(data.status,"로그인 성공")
                setLogin(3) //로그인 성공
                setIsLogin(true)
            }).catch(e=>{
                LOGIN_DEBUG && console.log(e.response.status)
                LOGIN_DEBUG && console.log(e.response.data,"로그인 실패")
            })
        )
        : login === 3 ?
        (
            //로그인 성공 하면 cookie에 token, userId 저장하기
            setCookie()
        )
        :
        (console.log("실패"))
        )

    },[login])

////////////////////////////////////////////////////////////////////

    return (
        <>
        {/* 로그인 전체 페이지 */}
        {
            //token값 여부에 따라 달라 진다.
            cookies.get('token') ? 
                (<Redirect to="/"/>)
                :
                (<LoginForm onClickLogin={onClickLogin}/> )
        }
        </>
    ) ;
} ;

export default withCookies(Login) ;