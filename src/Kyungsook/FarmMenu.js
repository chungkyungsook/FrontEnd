import React from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Container = styled.div`
    border : 1px solid #333 ;
`;

const Ul = styled.ul`

`;

const Li = styled.li`

`;

const FarmMenu = () => {
    return (
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
    );
};

export default FarmMenu;