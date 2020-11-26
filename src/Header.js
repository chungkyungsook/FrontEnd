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
import logoHeight from './assets/logoHeight.jpg' ;
import title from './assets/HeaderTitle.png' ;

const Container = styled.header`
    display : ${props => props.views ? 'flex' : 'none' } ;
`;

const TitleImgContainer = styled.div`
    display : flex ;
`;

const Img = styled.img`
    margin : auto 0 ;
`;

const Ul = styled.ul`
    display : flex ;

    justify-content : center ;
    align-items : center ;
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
                <Img src={logoHeight} width="120" height="70"/>
                <Img src={title} width="185" height="40"/>
            </TitleImgContainer>
            <Ul>
                { menuData.map((menu, index) => (
                        <HeaderMenu 
                            key={index}
                            path={menu.route}
                            pathname={`/${pathname.split('/')[1]}`}
                        >
                            {menu.text}
                        </HeaderMenu>
                )) }
            </Ul>
        </Container>
    ) ;
} ;

export default withRouter(Header) ;