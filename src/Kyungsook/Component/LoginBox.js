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

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;


const LoginBoxSamples =(props)=> {

    const url = '54.210.105.132'
    //처음 시작시 token지우기
    useEffect( ()=>{
        
        
        props.cookies.get('token') && (
            axios.put(`http://${url}/api/logout`,
                {token:props.cookies.get('token')}
                ).then(data =>{
                    console.log("loginBox 처음 시작 시",data);
                }).catch(e =>{
                    console.log("loginBox 처음 시작 시 error 로그아웃 실패",e);
                })
            )

        console.log("LoginBox 버튼 클릭 쿠키 남아 있으면 삭제");
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

        console.log("로그인 버튼 클릭 ",JSON.stringify(res))
    
        //kakao 정보가져오기
        const semi_id    = JSON.stringify(res.profile.id)
        const semi_email = JSON.stringify(res.profile.kakao_account.email)
        const semi_token = JSON.stringify(res.response.refresh_token)
    
        //db값 넣어주기
        try {
            //회원가입
            axios.post(`http://${url}/api/register`,{
                // data : {
                    id : semi_id,
                    email: semi_email.replaceAll('"',''),
                // }
            }).then(data => {
                console.log("loginBox",data);
            }).catch(e=>{
                console.log(e);
            })
            

        }catch (err) { //이미 가입된 계정
            console.log(err)
        }
        
        //로그인 상태 확인
        try {

            //로그인
            axios({
                method: "post",
                url:`http://${url}/api/login`,
                data: {
                    id : semi_id,
                    token : semi_token.replaceAll('"',''),
                },
                responseType: "json"
            });

            //로그인 여부
            axios({
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

    return (
        <>
        {
            isLogin ? (<Redirect to="/" />) : (
            <>
                <LoginPont>Login</LoginPont>
                <LoginBox>
                    
                    <KaKaoBtn
                        jsKey={'91224fabd87ed64c0173372e3b0e3581'}
                        buttonText="카카오 계정으로 회원가입"
                        onSuccess={responseKaKao} //로그인 성공한 경우 실행할 함수
                        getProfile={true}
                    />
{/* 
                    <KaKaoBtn
                        jsKey={'91224fabd87ed64c0173372e3b0e3581'}
                        buttonText="카카오 계정으로 로그인"
                        onSuccess={responseKaKao} //로그인 성공한 경우 실행할 함수
                        getProfile={true}
                    /> */}

                </LoginBox>
                {/* {isLogin && move()} */}
            </>
            )
        }
        </>
        )

}

export default withCookies(LoginBoxSamples);