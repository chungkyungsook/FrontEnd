import React, { useState } from 'react' ;

import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import HelpCss from '../Component/HelpComponent/HelpCss';

const Help = (props) => {

    //isLogin cookie 값 확인
    const isLoginCheck = props.cookies.get('isLogin')
    //axios 값 담기
    const [list, setList] = useState([])

    //해당 버튼 클릭시 정보 보여주기
    const onClick = () =>{
        
    }
    return (
        <>
        {
            !isLoginCheck ? (<Redirect to="/login" />) : (
                <HelpCss list={list} onClick={onClick} />
        )
        }
        </>
    );
};

export default withCookies(Help) ;