import React from 'react' ;
import { Link } from 'react-router-dom' ;
import { 
    SETTING,
    BAEKHWAGO,
    CUSTOM,
    SETTING_ADD,
    SETTING_UPDATE 
} from '../Util/routes' ;

import styled from 'styled-components' ;

const Container = styled.aside`
    position: sticky;
    top: 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Ul = styled.ul`
    margin: 1.2rem;
    height: 100%;
`;

const Li = styled.li`
    font-size: 1.2em;
    text-align: center;
    border: 2px solid rgba(160,156,128,0.9);
    width: 100px;
    height: 100px;
    margin: 1rem;
    line-height: 100px;
    border-radius: 100px;
    cursor: pointer;
    &:hover {
        background: rgba(160,156,128,0.9);
        border: 2px solid beige;
        color: white;
    }
    transition: 0.5s;
    user-select: none;
`;

const LinkStyled = styled(Link)`
    cursor: default;
`;

const SideMenu = ({pathname}) => {

    return (
        <Container>
            <Ul>
                <LinkStyled to={SETTING}>
                    <Li style={pathname === '/setting' ? {background: 'rgba(160,156,128,0.9)', color: 'white'} : {}}>
                        표고버섯
                    </Li>
                </LinkStyled>
                <LinkStyled to={SETTING + BAEKHWAGO}>
                    <Li style={pathname === '/setting/baekhwago' ? {background: 'rgba(160,156,128,0.9)', color: 'white'} : {}}>
                        백화고
                    </Li>
                </LinkStyled>
                <LinkStyled to={SETTING + CUSTOM}>
                    <Li style={pathname === '/setting/custom' ? {background: 'rgba(160,156,128,0.9)', color: 'white'} : {}}>
                        커스텀
                    </Li>
                </LinkStyled>
                <LinkStyled to={SETTING + SETTING_ADD}>
                    <Li style={pathname === '/setting/add' ? {background: 'rgba(160,156,128,0.9)', color: 'white'} : {}}>
                        환경 추가
                    </Li>
                </LinkStyled>
                <LinkStyled to={SETTING + SETTING_UPDATE}>
                    <Li style={pathname === '/setting/update' ? {background: 'rgba(160,156,128,0.9)', color: 'white'} : {}}>
                        업데이트
                    </Li>
                </LinkStyled>
            </Ul>
        </Container>
    );
};

export default SideMenu;