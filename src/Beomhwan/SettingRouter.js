import React from 'react' ;
import { Route } from 'react-router-dom' ;

import styled from 'styled-components' ;

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

const Conatiner = styled.div`
    display: flex;
`;

const TemplateContainer = styled.div`
    width: 100%;
`;

const SettingRouter = () => {
    return (
        <Conatiner>
            <SideMenu />
            <TemplateContainer>
                <Route exact path={SETTING} component={Pyogo}/>
                <Route path={`${SETTING}${BAEKHWAGO}`} component={Baekhwago} />
                <Route path={`${SETTING}${CUSTOM}`} component={Custom} />
                <Route path={`${SETTING}${SETTING_ADD}`} component={Add} />
                <Route path={`${SETTING}${SETTING_UPDATE}`} component={Update} />
            </TemplateContainer>
        </Conatiner>
    );
};

export default SettingRouter ;