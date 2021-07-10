import React from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Container = styled.div`
    display: flex;
    justify-content:center;
    border-bottom: 1px solid rgb(0,0,0,0.5);
`;

const Ul = styled.ul`
    display: flex;
    margin : 10px;
`;

const Li = styled.li`
    padding : 0 8px;
    cursor: pointer;
    &:hover {
        background: beige;
        border-radius : 10px;
    }
    
`;

const FarmMenu = ({pathname}) => {
    
    return (
        <>
        <Container className='inner'>
            <Ul>
                <Link to="/farm">
                    <Li>
                        Farm情報
                    </Li>
                </Link>
                <Link to="/farm/movie">
                    <Li>
                        映像
                    </Li>
                </Link>
            </Ul>
        </Container>
        </>
    );
};

export default FarmMenu;