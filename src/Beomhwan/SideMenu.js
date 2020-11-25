import React from 'react' ;
import { Link } from 'react-router-dom' ;

import styled from 'styled-components' ;

const Container = styled.aside`
    border : 1px solid #333 ;
`;

const Ul = styled.ul`

`;

const Li = styled.li`

`;

const SideMenu = () => {
    return (
        <Container>
            <Ul>
                <Link to="/setting">
                    <Li>
                        표고버섯
                    </Li>
                </Link>
                <Link to="/setting/baekhwago">
                    <Li>
                        백화고
                    </Li>
                </Link>
                <Link to="/setting/custom">
                    <Li>
                        커스텀
                    </Li>
                </Link>
                <Link to="/setting/add">
                    <Li>
                        환경 추가
                    </Li>
                </Link>
                <Link to="/setting/update">
                    <Li>
                        환경 업데이트(환경 끝난후)
                    </Li>
                </Link>
            </Ul>
        </Container>
    );
};

export default SideMenu ;