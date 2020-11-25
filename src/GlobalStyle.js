import { createGlobalStyle } from 'styled-components' ;
import reset from 'styled-reset' ;

const globalStyle = createGlobalStyle`
    ${reset}
    body {
        padding : 0 ;
        margin : 0 ;
        box-sizing : border-box ;
    }
    a {
        text-decoration : none ;
        color : black ;
        &:active {
            color : black ;
        }
    }
`;

export default globalStyle ;