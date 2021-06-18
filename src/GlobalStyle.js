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
        width: 1200px;
        margin: auto;
        position: relative;
    }
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .spinner {
        animation: spin 2s linear infinite;
        color: rgb(87,101,116);
      }
      @keyframes spin {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
    }
`;

export default globalStyle ;