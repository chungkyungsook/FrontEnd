import React from 'react' ;
import { withRouter } from 'react-router-dom' ;

import styled from 'styled-components' ;

// Util
import { 
    HOME,
    FARM,
    HELP,
    SETTING,
} from './Util/routes' ;

import {
    flexAlign,
    userSelect
} from './Util/css' ;

import HeaderMenu from './HeaderMenu' ;

// 그림 리소스
import logoHeight from './assets/logoHeight.png' ;
import title from './assets/HeaderTitle.png' ;

const Container = styled.header`
    display : ${props => props.views ? 'flex' : 'none' } ;
    background: rgb(160, 156, 128,0.9);
    /* background-color : ; */
`;

const TitleImgContainer = styled.div`
    display : flex ;

    flex : 0.2 ;
`;

const Img = styled.img`
    ${userSelect}

    margin-top : 1.5rem ;

    cursor : default ;
`;

const LogoImg = styled.img`
    ${userSelect}

    background-position : center ;
    
    margin-right : 0.5rem ;
    margin-left : 1rem ;

    cursor : default ;
`;

const MenuContainer = styled.ul`
    ${flexAlign}

    flex : 0.6 ;
`;

const InformationContainer = styled.div`
    ${flexAlign}

    justify-content : flex-end ;
    flex : 0.2 ;
`;

const MachineContainer = styled.div`
    ${flexAlign}
    height : 75% ;

    // 로그인 글자 사이 줄 색깔
    border-right : 1px solid #111 ;
`;

const UserContainer = styled.div`
    
`;  

const MachineName = styled.div`
    ${userSelect}
    
    width : 50px ;
    cursor : default ;
`;

const MachineStatus = styled.span`  
    ${userSelect}
    
    padding : 20px ;
    cursor : default ;
`;

const LoginStatus = styled.span`
    ${userSelect}
    
    padding : 30px ;
`;

const Header = ({ location }) => {

    // 메뉴 데이터
    const menuData = [ 
        {
            route : HOME,
            text : '마이 팜'
        },
        {
            route : SETTING,
            text : '팜 환경설정'
        },
        {
            route : FARM,
            text : '팜 정보'
        },
        {
            route : HELP,
            text : '도움말'
        }
    ] ;
    
    // route 이름
    const { pathname } = location ;

    //path Check /login, /join 일시 가리는 값
    const pathCheck = pathname.includes(FARM) ? 
            FARM 
            : pathname.includes(SETTING) ? SETTING : pathname ;  

    return (
        <Container views={ menuData.some(data => pathCheck === data.route) } >
            <TitleImgContainer>
                <LogoImg src={logoHeight} width="70" height="70" draggable="false" />
                <Img src={title} width="175" height="30" draggable="false" />
            </TitleImgContainer>
            <MenuContainer>
                { menuData.map((menu, index) => (
                        <HeaderMenu 
                            key={index}
                            path={menu.route}
                            pathname={`/${pathname.split('/')[1]}`}
                        >
                            {menu.text}
                        </HeaderMenu>
                )) }
            </MenuContainer>
            <InformationContainer>
                <MachineContainer>
                    <MachineName>키노코</MachineName>
                    <MachineStatus>ON</MachineStatus>
                </MachineContainer>
                <UserContainer>
                    <LoginStatus>Login</LoginStatus>
                </UserContainer>
            </InformationContainer>
        </Container>
    ) ;
} ;

export default withRouter(Header) ;