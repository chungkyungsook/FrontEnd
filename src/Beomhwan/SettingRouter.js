import React, {useEffect} from 'react' ;
import { Route, Redirect } from 'react-router-dom' ;
import styled from 'styled-components' ;
import {withCookies} from 'react-cookie';
import ChartContext from './ChartContext';

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

// 기기 아이디 확인 후 없으면 이동
function machineIdCheck(machineId, history) {
    if(machineId === 0) {
        alert('기기를 선택해주세요!');
        history.push('/');
    }
}

const SettingRouter = ({location, cookies, value, history}) => {
    const isLoginCheck = cookies.get('token');
    const {pathname} = location;

    console.log('asdklfhlasjdhflkasjld', value);
    
    machineIdCheck(value.isOn.id, history);

    return (
        <>
        {!isLoginCheck ? (<Redirect to="/login" />) : (
        <ChartContext machineId={value.isOn.id}>
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
        </ChartContext>
        )}
        </>
    );
};

export default withCookies(SettingRouter) ;