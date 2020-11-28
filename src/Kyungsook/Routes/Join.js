import React from 'react' ;
import styled     from 'styled-components' ;
// 그림 리소스
import logoHeight from '../../assets/logo2.png' ;
import title      from '../../assets/HeaderTitle.png' ;
import {userSelect} from '../../Util/css' ;


const Container = styled.body`
    /* 화면 크기 지정 */
    width: 1920px;
    height: 1080px;
    display         : flex;
    justify-content : center;

    background      :rgb(224, 224, 218);
    padding         : 3rem;

`;

//로그인 페이지 템플릿
const LoinTemplateBlock  = styled.div`
    width : 1500px;
    height: 800px;

    display         : flex;
    flex-direction  : row;
    margin          : 60px;
    background      : rgb(160, 156, 128,0.9);
    border-radius   : 20px;
    box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06);
    
`;

//왼쪽 레이아웃
const LoinLeft = styled.div`
    display        : flex;
    flex-direction : column;
    flex           : 1.5;
    background     : rgb(160, 156, 128,0.9);
    align-items    : center;
    padding-top    : 15rem;
    padding-bottom : 3rem;
    border-radius  : 20px 0 0 20px;
`;

//왼쪽 사진 
const ColumImg = styled.div`   
    justify-content : center;
    padding : 1rem;
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
    
    margin-right : 0.5rem ;
    margin-left : 1rem ;

    cursor : default ;
`;

//오른쪽 레이아웃
const LoinRight = styled.div`
    flex : 2.4;
    background : white;
    border-radius   : 0 20px 20px 0;
`;

//로그인 레이아웃
const LoginItem      = styled.div`
    
    width : 572px;
    height: 648px;

    position:relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    border-radius: 11px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06);
    
    margin : 0 auto; /*페이지 중앙*/
    
    margin-top     :4.8rem;
    margin-bottom  :1.6rem;
    display        :flex;
    flex-direction :column;

`;
const Join = () => {
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
                <LoinRight>
                    <LoginItem>
                        로그인 구역
                    </LoginItem>
                </LoinRight>
            </LoinTemplateBlock>
        </Container>
    ) ;
};

export default Join ;