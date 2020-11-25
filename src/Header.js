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

const Container = styled.header`
    border : 1px solid #333 ;
`;

const Ul = styled.ul`

`;

const Li = styled.li`

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

    return (
        <Container>
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