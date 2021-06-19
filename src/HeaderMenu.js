import React, { memo } from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;
import { userSelect } from './Util/css' ;

const Container = styled.li`
    ${userSelect}

    width : 150px ;

    color : ${props => props.active ? '#3d5712' : 'white'} ;
    
    text-align : center ;
    :hover{
        color: #3d5712;
        transition: .4s;
    }
`;


const HeaderMenu = ({ path, pathname, children}) => {
    
    return (
        <Link to={path} draggable="false">
            <Container 
                active={path === pathname}    
            >
                { children }
                
            </Container>
            
        </Link>
    );
};

export default memo(HeaderMenu) ;