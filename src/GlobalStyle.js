import { createGlobalStyle } from 'styled-components' ;
import reset from 'styled-reset' ;

const globalStyle = createGlobalStyle`
    ${reset}
    body {

    }
    *,
    *::before,
    *::after {
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

    .inner{
        width: 1200px;
        margin: auto;
        position: relative;
    }
`;

export default globalStyle ;