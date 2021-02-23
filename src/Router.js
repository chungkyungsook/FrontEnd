import React, { useEffect, useState } from 'react' ;
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom' ;

// 공통
import Header from './Header' ;
import { 
    HOME,  
    LOGIN, 
    JOIN, 
    SETTING, 
    FARM,
    HELP 
} from './Util/routes' ;

// 경숙
import Login from './Kyungsook/Routes/Login' ;
import Join from './Kyungsook/Routes/Join' ;
import Help from './Kyungsook/Routes/Help' ;
import FarmRouter from './Kyungsook/FarmRouter' ;
import MyFarm from './Kyungsook/Routes/MyFarm' ;

// 범환
import SettingRouter from './Beomhwan/SettingRouter' ;

//쿠키
import { withCookies } from 'react-cookie';

import axios from 'axios';
import {
    AWS_URL,
    LOGOUT,
}from './Util/api'

import{
    LOGOUT_DEBUG,
}from './Util/debugging'
const RouterComponent = (props) => {
/////////////////////////////////////////////////////////////////////////////////// *변수
    //선택된 재배기 번호와 재배기 이름 저장 -> id : 0이면 선택된 재배기 없음
    const [isOn, setIsOn] = useState({
        id : 0,
        prgName : '',
    })
    //선택된 재배기 on/off 상태 확인 
    const [isValue, setIsValue] = useState('')

    //선택한 기기 정보 바꾸기 위해서 사용됨
    const [isCheck,setIsCheck] = useState(0)

    const [prgInfo, setPrgInfo] = useState({
        prg_id : 0,
        prg_name : ''
    })
    
    //변수 한번에 보내기
    const value = {
        isOn,setIsOn, //재배기 id, name
        isValue, // 재배기 작동 상태
        setIsCheck,isCheck, //재배기 선택 여부 판단 1
        prgInfo, setPrgInfo,
        setIsValue,
    }

    //로그인 확인 하기
    const [isLogin, setIsLogin] = useState(props.cookies.get('token') && true)
/////////////////////////////////////////////////////////////////////////////////// *이후 
    //logout 버튼 클릭
    const logoutOnClick = () =>{
        
        
        axios.put(`${AWS_URL}${LOGOUT}`,{
            token: props.cookies.get('token')
        }).then((data) => {
            LOGOUT_DEBUG && console.log(data,'로그아웃 성공')
            props.cookies.remove('token')
            props.cookies.remove('userId')
        }).catch((e) => {
            LOGOUT_DEBUG && console.log(e.response.status)
            LOGOUT_DEBUG && console.log(e.response.data,"로그아웃 실패")
        })
        
    } 

    useEffect(()=>{
        console.log("===========Router============")
        // console.log(isOn,"값 바뀜");
        console.log(isCheck,"isCheck 값 바뀜");
        isCheck === 1 && setIsCheck(0)
    },[isCheck])

    useEffect(()=>{
        console.log("Router isOn :",isOn);
    },[isOn])


////////////////////////////////////////////////////////////////////////////////////
    return (
        <Router> 
            <Header setIsOn={setIsOn} isOn={isOn} isValue={isValue} setIsValue={setIsValue} isLogin={isLogin}setIsLogin={setIsLogin} isCheck={isCheck} setIsCheck={setIsCheck} logoutOnClick={logoutOnClick}/>
            <Switch>
                <Route path={HOME} exact 
                render = { (props)=> <MyFarm {...props} value={value} logoutOnClick={logoutOnClick}/> } />

                <Route path={LOGIN} 
                render ={ (props) => <Login {...props} setIsLogin={setIsLogin} />}
                />
                <Route path={JOIN} component={Join} />   

                <Route path={FARM} 
                render = { (props)=> <FarmRouter {...props} value={value}/> } />
                
                
                <Route path={HELP} component={Help} />
                <Route path={SETTING}  
                render = { (props)=> <SettingRouter {...props} value={value}/> } />
                <Redirect from="*" to={HOME} />
            </Switch>
        </Router>
    )
} ;

export default withCookies(RouterComponent) ;