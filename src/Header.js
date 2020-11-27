import React from 'react' ;
import { withRouter } from 'react-router-dom' ;

import styled from 'styled-components' ;

import { 
    HOME,
    FARM,
    HELP,
    SETTING,
} from './Util/routes' ;

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
    margin-top : 1.5rem ;
`;

const LogoImg = styled.img`
    background-position : center ;
    
    margin-right : 0.5rem ;
    margin-left : 1rem ;
`;

const MenuContainer = styled.ul`
    display : flex ;

    flex : 0.6 ;

    justify-content : center ;
    align-items : center ;
`;

const InformationContainer = styled.div`
    
    flex : 0.2 ;
    display : flex ;

    justify-content : flex-end ;
    align-items : center ;
`;

const MachineContainer = styled.div`
    border-right : 1px solid #111 ;
    
    height : 100% ;

    display : flex ;

    justify-content : center ;
    align-items : center ;
`;

const UserContainer = styled.div`

`;

const MachineName = styled.div`
    width : 50px ;
`;

const MachineStatus = styled.span`  
    padding : 1rem ;
`;

const LoginStatus = styled.span`
    padding : 1.2rem ;
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
    const pathCheck = pathname.includes(SETTING) ? SETTING : pathname ;  

    return (
        <Container views={ menuData.some(data => pathCheck === data.route) } >
            <TitleImgContainer>
                <LogoImg src={logoHeight} width="70" height="70" />
                <Img src={title} width="175" height="30"/>
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