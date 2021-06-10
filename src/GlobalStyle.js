import { createGlobalStyle } from 'styled-components' ;
import reset from 'styled-reset' ;

const globalStyle = createGlobalStyle`
    ${reset}
    html{
        height: 100%;
    }
    #root{
        height: 100%;
    }
    body {
        height: 100%;
        color: #333;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.4;
        font-family: 'Nanum Gothic', sans-serif;
    }
    * {
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
    img{
        display: block;
    }
    .inner{
        width: 1100px;
        margin: auto;
        position: relative;
    }
`;

export default globalStyle ;