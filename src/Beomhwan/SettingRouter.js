import React, {useEffect} from 'react' ;
import { Route, Redirect } from 'react-router-dom' ;
import styled from 'styled-components' ;
import {useKinokoState} from '../KinokoContext';

import { 
    SETTING,
    BAEKHWAGO,
    CUSTOM,
    SETTING_ADD,
    SETTING_UPDATE 
} from '../Util/routes' ;

// 사이드 메뉴
import SideMenu from './SideMenu' ;

// 페이지
import Pyogo from './Routes/Pyogo' ;
import Baekhwago from './Routes/Baekhwago' ;
import Custom from './Routes/Custom' ;
import Add from './Routes/Add' ;
import Update from './Routes/Update' ;

const Container = styled.div`
    /* background-color: rgb(246,246,244); */
    display: flex;
`;

const TemplateContainer = styled.div`
    width: 100%;
`;

const SettingRouter = ({location, value, history}) => {
    const {pathname} = location;

    const state = useKinokoState();
    console.log(state);
    const { data:DeviceId } = state.muchinDeviceId;

    if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>

    if(!DeviceId) return <Redirect to='/' />

    return (
        <Container className="inner">
                <SideMenu pathname={pathname} />
                <TemplateContainer>
                    <Route exact path={SETTING} component={Pyogo}/>
                    <Route path={`${SETTING}${BAEKHWAGO}`} component={Baekhwago} />
                    <Route path={`${SETTING}${CUSTOM}`} component={Custom} />
                    <Route path={`${SETTING}${SETTING_ADD}`} component={Add} />
                    <Route path={`${SETTING}${SETTING_UPDATE}`} component={Update} />
                </TemplateContainer>
        </Container>
    );
};

export default SettingRouter ;