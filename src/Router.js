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
    MACHINE_ID,
    MACHINE_STATUS,
    PRG_NAME
}from './Util/api'

import{
    LOGOUT_DEBUG,
}from './Util/debugging'
const RouterComponent = (props) => {

    

    return (
        <Router> 
            <Header />
            <Switch>
                <Route path={HOME} exact 
                render = { (props)=> <MyFarm {...props} /> } />

                <Route path={LOGIN} 
                render ={ (props) => <Login {...props} />}
                />
                <Route path={JOIN} component={Join} />   

                <Route path={FARM} 
                render = { (props)=> <FarmRouter {...props} /> } />
                
                
                <Route path={HELP} component={Help} />
                <Route path={SETTING}  
                render = { (props)=> <SettingRouter {...props} /> } />
                <Redirect from="*" to={HOME} />
            </Switch>
        </Router>
    )
} ;

export default withCookies(RouterComponent) ;