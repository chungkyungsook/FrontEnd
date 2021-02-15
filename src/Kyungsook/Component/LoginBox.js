import React,{useEffect, useState} from 'react' ;
import styled     from 'styled-components' ;
import { Link, Redirect, Route }   from 'react-router-dom' ;
import axios from "axios";
import KaKaoLogin from 'react-kakao-login';
import { withCookies} from 'react-cookie';

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


const LoginBoxSamples =(props)=> {

    const url = '54.210.105.132'
    //처음 시작시 token지우기
    useEffect( ()=>{
        props.cookies.get('token') && (axios.put(`http://${url}/api/logout`,{token:props.cookies.get('token')}))
        
        props.cookies.remove('email');
        props.cookies.remove('token');
        props.cookies.remove('isLogin') ;
        props.cookies.remove('userId') ;

         //cookie상태 확인
         console.log("login page 로그인 상태 확인",isLogin);
         console.log("login page 토큰확인",token);
         console.log("login page email 확인",email);
         console.log("login page userid 확인",userId);

    },[]);

    const [data, setData] = useState({
        datas : '',
        isLogin: false,
        token : '',
        email :'',
        userId : '',
    })

    const {isLogin,token,email,userId} = data;

    const cookieSet = ()=>{
        props.cookies.set('isLogin', isLogin) ;
        props.cookies.set('email', email) ;
        props.cookies.set('token', token) ;
        props.cookies.set('userId', userId) ;
    }

    //로그인 버튼 클릭시 실행
    const responseKaKao = async (res) => {

        console.log(JSON.stringify(res))
    
        //kakao 정보가져오기
        const semi_id    = JSON.stringify(res.profile.id)
        const semi_email = JSON.stringify(res.profile.kakao_account.email)
        const semi_token = JSON.stringify(res.response.refresh_token)
    
        //db값 넣어주기
        try {
            //회원가입
            const signup_response = axios.post(`http://${url}/api/register`,{
                // data : {
                    id : semi_id,
                    email: semi_email.replaceAll('"',''),
                // }
            }).then(data => {
                console.log("loginBox",data);
            }).catch(e=>{
                console.log(e);
            })
            // const signup_response =  axios({
            //     method: "post",
            //     // headers : {
            //     //     "Access-Control-Allow-Origin" : "*"
            //     // },
            //     url:`http://${url}/api/register`,
            //     data: {
            //         id : semi_id,
            //         email: semi_email.replaceAll('"',''),
            //     },
            //     responseType: "json"
            // });

            // axios.post(`http://${url}/api/register`)

        }catch (err) { //이미 가입된 계정
            console.log(err)
        }
        
        //로그인 상태 확인
        try {

            //로그인
            const login_response =  axios({
                method: "post",
                url:`http://${url}/api/login`,
                data: {
                    id : semi_id,
                    token : semi_token.replaceAll('"',''),
                },
                responseType: "json"
            });

            //로그인 여부
            const signup_response =  axios({
                method: "post",
                url:`http://${url}/api/auth`,
                data: {
                    token : semi_token.replaceAll('"',''),
                },
                responseType: "json"
            });

        }catch (err) { //이미 가입된 계정
            console.log(err);
        }

        //값 바꿔주기
        setData({
            isLogin:true,
            token: semi_token,
            email: semi_email,
            userId : semi_id,
        }) ;

    }// responseKakao    

    //로그인 하면 cookie 저장
    isLogin && cookieSet();

    console.log("test")
    return (
        <>
        {
            isLogin ? (<Redirect to="/" />) : (
            <>
                <LoginPont>Login</LoginPont>
                <LoginBox>
                    <br></br>
                    <KaKaoLogin
                        jsKey={'91224fabd87ed64c0173372e3b0e3581'}
                        buttonText="카카오 계정으로 로그인"
                        onSuccess={responseKaKao} //로그인 성공한 경우 실행할 함수
                        getProfile={true}
                    />
                </LoginBox>
                {/* {isLogin && move()} */}
            </>
            )
        }
        </>
        )

}

export default withCookies(LoginBoxSamples);