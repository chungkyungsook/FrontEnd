import React, { useEffect, useState } from 'react' ;
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom' ;

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

const RouterComponent = (props) => {

    console.log(props) ;

    const [ user, setUser ] = useState(null) ;
    const authenticated = user !== null ;

    useEffect(() => {
        console.log('안녕') ;
    }) ;

    console.log(authenticated) ;

    return (
        <Router> 
            <Header />
            <Switch>
                <Route path={HOME} exact component={MyFarm} />
                <Route path={LOGIN} component={Login} />
                <Route path={JOIN} component={Join} />    
                <Route path={FARM} component={FarmRouter} />
                <Route path={HELP} component={Help} />
                <Route path={SETTING} component={SettingRouter} />
                <Redirect from="*" to={HOME} />
            </Switch>
        </Router>
    )
} ;

export default RouterComponent ;