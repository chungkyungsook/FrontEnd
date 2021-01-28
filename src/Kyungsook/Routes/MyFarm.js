import React,{useState,useEffect} from 'react' ;
import '../Css/MyFarm.css';
import MyFarmComponent from '../Component/MyFarmComponent'
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';

const MyFarm = (props) => {

    const [data, setData] = useState({
        isLogin : false,
        token : '',
        email : '',
    })

    //isLogin cookie 값 확인
    const isLoginCheck = props.cookies.get('isLogin')

    //cookie상태값 확인하기
    console.log("MyFarm page 로그인 상태 확인",props.cookies.get('isLogin'));
    console.log("MyFarm page 토큰확인",props.cookies.get('token'));
    console.log("MyFarm page email 확인",props.cookies.get('email'));

    //cookie 저장하기
    return (
        <>
        {
            !isLoginCheck ? (<Redirect to="/login" />) : (<MyFarmComponent/>)
            
        }
        </>
        
    );
};

export default withCookies(MyFarm);
