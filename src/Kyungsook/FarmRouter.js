import React from 'react' ;
import { Route } from 'react-router-dom' ;

import styled from 'styled-components' ;

import { 
    FARM,
    MOVIE 
} from '../Util/routes' ;

// 팜 페이지 메뉴
import FarmMenu from './FarmMenu' ;

// 페이지
import Farm from './Routes/Farm' ;
import Movie from './Routes/Movie' ;

const Container = styled.div`
    
`;

const TemplateContainer = styled.div`

`;


const FarmRouter = () => {
    return (
        <Container>
            <FarmMenu />
            <TemplateContainer>
                <Route exact path={FARM} component={Farm} />
                <Route path={`${FARM}${MOVIE}`} component={Movie} />
            </TemplateContainer>
        </Container>
    );
};

export default FarmRouter;