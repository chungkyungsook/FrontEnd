import React, {useState} from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Container = styled.aside`
    position: sticky;
    top: 70px;
    border : 1px solid #333;
    border-top: 0; border-bottom: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Ul = styled.ul`
    margin: 1.2rem;
    height: 100vh - 70px;
`;

const Li = styled.li`
    font-size: 2vh;
    text-align: center;
    border: 1px solid gray;
    width: 15vh;
    height: 15vh;
    margin: 1rem;
    line-height: 15vh;
    border-radius: 15vh;
    cursor: pointer;    
    &:hover {
        background: beige;
        border: 1px solid beige;
    }
    transition: 0.5s;
`;

const LinkStyled = styled(Link)`
    cursor: default;
`;

const SideMenu = () => {
    return (
        <Container>
            <Ul>
                <LinkStyled to="/setting">
                    <Li>
                        표고버섯
                    </Li>
                </LinkStyled>
                <LinkStyled to="/setting/baekhwago">
                    <Li>
                        백화고
                    </Li>
                </LinkStyled>
                <LinkStyled to="/setting/custom">
                    <Li>
                        커스텀
                    </Li>
                </LinkStyled>
                <LinkStyled to="/setting/add">
                    <Li>
                        환경 추가
                    </Li>
                </LinkStyled>
                <LinkStyled to="/setting/update">
                    <Li>
                        환경 업데이트
                    </Li>
                </LinkStyled>
            </Ul>
        </Container>
    );
};

export default SideMenu ;