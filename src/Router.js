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

const RouterComponent = (props) => {
    
    useEffect(()=>{
        
    },[])

    const [isOn, setIsOn] = useState({
        id : 0,
        grgName : ''
    })

    const value = {
        isOn,setIsOn
    }

    useEffect(()=>{
        console.log('Router in isOn',isOn);
        // setIsOn({...isOn,id : isOn.id})
    },[isOn.id,isOn.grgName])

    return (
        <Router> 
            <Header setIsOn={setIsOn} isOn={isOn} />
            <Switch>
                <Route path={HOME} exact 
                render = { ()=> <MyFarm value={value}/> } />
                <Route path={LOGIN} component={Login} />
                <Route path={JOIN} component={Join} />    
                <Route path={FARM} component={FarmRouter} 
                render = { ()=> <MyFarm value={value}/> }/>
                <Route path={HELP} component={Help} />
                <Route path={SETTING} component={SettingRouter} />
                <Redirect from="*" to={HOME} />
            </Switch>
        </Router>
    )
} ;

export default withCookies(RouterComponent) ;