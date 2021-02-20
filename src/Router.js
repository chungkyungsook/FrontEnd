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
import { Cookies, withCookies } from 'react-cookie';

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

    //사용자가 등록한 모든 재배기 정보 가져오기
    const [userMachines, setUserMachines] = useState({

        machins : null
    })
    const [prgInfo, setPrgInfo] = useState({
        prg_id : 0,
        name : ''
    })
    
    //변수 한번에 보내기
    const value = {
        isOn,setIsOn, //재배기 id, name
        isValue, // 재배기 작동 상태
        setIsCheck,isCheck, //재배기 선택 여부 판단 1
        prgInfo, setPrgInfo
    }

    //로그인 확인 하기
    const [isLogin, setIsLogin] = useState(props.cookies.get('token' && true))
/////////////////////////////////////////////////////////////////////////////////// *이후 
    
    useEffect(()=>{
        console.log("===========Router 처음 실행============")
    },[])

    useEffect(()=>{
        console.log('Router in isOn',isOn.id);
        console.log('Router in isOn prgName',isOn.prgName);
        console.log('Router in isOn isValue',isValue);
        console.log('Router in isOn isValue',prgInfo);
        // setIsOn({...isOn,id : isOn.id})
    },[isOn.id,isOn.prgName,isValue,prgInfo])

////////////////////////////////////////////////////////////////////////////////////
    return (
        <Router> 
            <Header setIsOn={setIsOn} isOn={isOn} isValue={isValue} setIsValue={setIsValue} isLogin={isLogin}setIsLogin={setIsLogin} isCheck={isCheck} setIsCheck={setIsCheck}/>
            <Switch>
                <Route path={HOME} exact 
                render = { (props)=> <MyFarm {...props} value={value}/> } />

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