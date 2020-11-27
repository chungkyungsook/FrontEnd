import React, { memo } from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Container = styled.li`
    width : 150px ;
    color : ${props => props.active ? '#3d5712' : 'white'} ;
    text-align : center ;
`;

const HeaderMenu = ({ path, pathname, children }) => {
    return (
        <Link to={path}>
            <Container 
                active={path === pathname}    
            >
                { children }
            </Container>
        </Link>
    );
};

export default memo(HeaderMenu) ;