import React      from 'react' ;
import styled     from 'styled-components' ;
// 그림 리소스
import logoHeight from '../../assets/logo.png' ;
import title      from '../../assets/HeaderTitle.png' ;
import {userSelect} from '../../Util/css' ;

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

//로그인 글자 속성
const LoginPont      = styled.div`
    /* box 속성*/
    padding         : 5.5rem 3rem  4rem;
    
    /* 폰트 속성 */
    font-size       : 3.5rem;
    
`;

// 로그인, 비밀번호 박스
const LoginBox       = styled.div`

    /* box 설정 ->   세로*/
    display         : flex;
    flex-direction  : column ;
    justify-content : center ;
    
    /* 위치 */
    padding : 1rem 3rem ;
    
`;

//
const InputBox      = styled.input`
    /* box 속성(input) */
    all             : unset ;
    border-radius   : 10px;
    height          : 30px;
    /* margin          : 0.7rem 0 0 0; */
    background      : #E0E0DA;
    padding         : 5px;

`;


const TextBox       = styled.div`
    display         : flex ;
    justify-content : flex-start ;
`;

const Text          = styled.span`
    
`;

// 아이디, 비밀번호 찾기
const TextInput     = styled.span`
    /* box 속성 */
    display         : flex ;
    justify-content : flex-end ;
    padding-top      : 0.5rem;

    /* 폰트 속성  */
    font-size       : 15px;
    color           : rgb(224, 224, 218);

    cursor: pointer;

    &:hover{
        color : #232d;    
    }

`;

const ButtonBox     = styled.div`
    
    all             : unset;
    /* box 속성  */
    display         : flex;
    justify-content : center;
    align-items     : center;
    
    padding-top     : 1rem;
`;

const Button       = styled.div`

    background     : #ABB48B;
    border-radius  : 17px;
    color          : white;
    margin         : 0.8rem 0.4rem 8rem;;
    padding        : 0.6rem;

    cursor: pointer;
    &:hover{
        background : #232d;    
    }

`;

const Login = () => {
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
                {/* 로그인 오른쪽 */}
                <LoinRight>
                    <LoginItem>
                        <LoginPont>Login</LoginPont>
                        <LoginBox>
                            <TextBox>
                                <Text>ID</Text>
                            </TextBox>      
                            <InputBox />
                            <TextInput>Forget id?</TextInput>
                        </LoginBox>

                        <LoginBox>
                            <TextBox>
                                <Text>PASSWORD</Text>
                            </TextBox>
                            <InputBox type = 'password'/>
                            <TextInput>Forget password?</TextInput>
                        </LoginBox>

                        <ButtonBox>
                            <Button>Login</Button>
                            <Button>signUp</Button>
                        </ButtonBox>

                    </LoginItem>
                </LoinRight>
            </LoinTemplateBlock>
        </Container>
    ) ;
} ;

export default Login ;