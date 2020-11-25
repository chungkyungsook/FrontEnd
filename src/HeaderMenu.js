import React, { memo } from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Li = styled.li`
    color : ${props => props.active ? 'red' : 'black'} ;
`;

const HeaderMenu = ({ path, pathname, children }) => {
    return (
        <Link to={path}>
            <Li 
                active={path === pathname}    
            >
                { children }
            </Li>
        </Link>
    );
};

export default memo(HeaderMenu) ;