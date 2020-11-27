import React from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Container = styled.div`
    border : 1px solid #333 ;
    display: flex;
    justify-content:center;
    
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
        <Container>
            <Ul>
                <Link to="/farm">
                    <Li>
                        팜 정보
                    </Li>
                </Link>
                <Link to="/farm/movie">
                    <Li>
                        영상
                    </Li>
                </Link>
            </Ul>
        </Container>
        </>
    );
};

export default FarmMenu;