import React from 'react' ;
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom' ;

// 공통
import Header from './Header' ;
import { 
    HOME,  
    JOIN, 
    SETTING, 
    FARM,
    HELP 
} from './Util/routes' ;

// 경숙
import Join from './Kyungsook/Routes/Join' ;
import Help from './Kyungsook/Routes/Help' ;
import FarmRouter from './Kyungsook/FarmRouter' ;
import MyFarm from './Kyungsook/Routes/MyFarm' ;

// 범환
import SettingRouter from './Beomhwan/SettingRouter' ;

const RouterComponent = () => {

    

    return (
        <Router> 
            <Header />
            <Switch>
                <Route path={HOME} exact component = {MyFarm}/>
                <Route path={JOIN} component = {Join}/>
                <Route path={FARM} component = {FarmRouter}/>
                <Route path={HELP} component = {Help}/>
                <Route path={SETTING} component = {SettingRouter}/>
                <Redirect from="*" to={HOME} />
            </Switch>
        </Router>
    )
} ;

export default RouterComponent;