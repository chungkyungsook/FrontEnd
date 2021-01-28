import React, { useRef, useState }      from 'react' ;
import styled     from 'styled-components' ;
// 그림 리소스
import logoHeight from '../../assets/logo.png' ;
import title      from '../../assets/HeaderTitle.png' ;
import {userSelect} from '../../Util/css' ;

import LoginBox from './LoginBox';


const Container = styled.div`
    /* 화면 크기 지정 */
    width           : 100%;
    
    /* box 설정 */
    display         : flex;
    justify-content : center;
    align-items     : center;
    /* 배경 설정 (옅은 베이지) */
    background      :rgb(224, 224, 218);
    padding         : 11rem 5rem;
`;

//로그인 페이지 템플릿
const LoinTemplateBlock  = styled.div`
    
    /* 화면 크기 지정 */
    width           : 83%;
    
    /* box 설정 */
    display : flex;

    /* 배경 설정(진한 녹색) */
    border-radius   : 20px;

    /* box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06); */
    
`;

//왼쪽 레이아웃
const LoinLeft = styled.div`
    
    /* box 설정    : 세로*/
    display        : flex;
    flex           : 1.5;
    flex-direction : column;
    justify-content: center;
    align-items    : center;
    
    /* 배경 설정(진한 녹색) */
    background     : rgb(160, 156, 128,0.9);
    border-radius  : 20px 0 0 20px;
`;

//왼쪽 사진 
const ColumImg = styled.div`   

`;

//이미지
const Img = styled.img`
    
    ${userSelect}

    cursor : default ;
`;

//로고이미지
const LogoImg = styled.img`
    ${userSelect}

    background-position : center ;

    cursor : default ;
`;

//오른쪽 레이아웃
const LoinRight = styled.div`
    /* box 설정     : 세로*/
    display         : flex;
    flex            : 2.4;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;

    /* 배경 설정(흰색) */
    background      : white;
    border-radius   : 0 20px 20px 0;
`;

//로그인 레이아웃
const LoginItem      = styled.div`
    /* box 설정 ->   세로*/
    width           : 60%;
    height          : 85%;
    margin          : 0 auto; /*페이지 중앙*/

    display         : flex;
    flex-shrink     : 1;
    flex-direction  : column;
    justify-content : center;

    /* border-radius   : 11px; */
    /* box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06); */

    /* 글자 속성 */
    font-weight     : bold;

`;


const LoginForm = () => {

    return (
        <Container>
            <LoinTemplateBlock>
                <LoinLeft> 
                    <ColumImg>
                        <LogoImg src={logoHeight} width="150" height="200" draggable="false" />
                    </ColumImg>

                    <ColumImg>
                        <Img     src={title}      width="250" height="100"  draggable="false" />
                    </ColumImg>
                </LoinLeft> 

                {/* 로그인  */}
                <LoinRight>
                    <LoginItem>
                       <LoginBox/>
                    </LoginItem>
                </LoinRight>

            </LoinTemplateBlock>
        </Container>
    ) ;
} ;

export default LoginForm;