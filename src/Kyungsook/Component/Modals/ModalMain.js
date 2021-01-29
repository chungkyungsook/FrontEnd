import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Modal from './Modal';
import { withCookies} from 'react-cookie';

const ModalMain = (props)=> {
    //useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOnpen] = useState(false)
    const [openStr, setOpenStr] = useState({
        isKey : 0,
        isPwd : 0,
        isNickName : 0
    })
    
    
    const [input,setInput] = useState({
        keyOnchange : "", //key 번호
        pwdOnchange : "", // key 비밀 번호
        nickName : "", // 기기 등록 이름
        makeBtn : false,
    })

    //url
    const url = '172.26.3.62'
    const {isKey,isPwd,isNickName} = openStr

    //Modal확인
    const openModal = () =>{
        setModalOnpen(true);
    }

    const closeModal = () =>{
        setModalOnpen(false)

        setInput({
            keyOnchange : "",
            pwdOnchange : "",
            nickName : "",
            makeBtn : false,
        })

        setOpenStr({
            isKey : 0,
            isPwd : 0,
            isNickName : 0
        })
    }


    //key번호 확인
    const onClickBtn= (e) =>{
        const {name} = e.target
        
        if(name === 'key'){ // 기기 key 번호 확인
            axios.get(`http://${url}/api/pin/check`,{
                params:{
                    pin : input.keyOnchange
                }
            })
            .then(data =>{
                data.status === 200 && setOpenStr({...openStr,isKey:1})
                console.log("status",data.status)
            })
            .catch(
                e=>{console.log(e)
                    setOpenStr({...openStr,isKey:2})
            })
        }else if(name === 'pwd'){ //기기 비밀번호 확인
            axios.get(`http://${url}/api/pin/auth`,{
                params:{
                    pin : input.keyOnchange,
                    pw : input.pwdOnchange
                }
            })
            .then(data =>{
                data.status === 200 && setOpenStr({...openStr,isPwd:1})
                console.log("status",data.status)
            })
            .catch(
                e=>{console.log(e)
                    setOpenStr({...openStr,isPwd:2})
            })       
        }else if(name === 'makeDevice'){ //기기 등록
            axios.put(`http://${url}/api/myfarm/register`,{
                params:{
                    pin : input.keyOnchange,
                    pw : input.pwdOnchange,
                    userId : props.cookies.get('userId'),
                    machineName : input.nickName,
                }
            })
            .then(data =>{
                data.status === 200 && setOpenStr({...openStr,isNickName:1})
                console.log("status",data.status)
            })
            .catch(
                e=>{console.log(e)
                setOpenStr({...openStr,isNickName:2})
            })       
        }
        
    }

    //input 값 바꾸기
    const onChange = (e) =>{
        const {name,value} = e.target
        setInput({
            ...input,
            [name] : value
        })
    }
    
    //기기 이름 관리
    useEffect(()=>{
        console.log("key",input.keyOnchange)
        console.log("pwd",input.pwdOnchange)
        console.log("setIsOk",isKey)
        console.log("setIsOkPwd",isPwd)
        console.log("makeBtn",input.makeBtn)
        //기기 이름 공백이면 버튼 숨기기
        input.nickName === "" && setInput({...input,makeBtn: false}) 
        isKey === 1 && isPwd === 1 && input.nickName !== "" && setInput({...input,makeBtn:true})
    },[isKey, isPwd, setInput,input.nickName])
    
    const {makeBtn} = input

    return(
        <div>
            <div className='item1Button' onClick={openModal}>+</div>
            {/* header부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="기기 등록을 시작합니다." makeBtn={makeBtn} onClickBtn={onClickBtn}>


                {/* Modal.js <main> {props.childern}</main> 에 내용이 입력된다.*/}
                <div>
                    <input  name='keyOnchange' className='modalbtn' size='30' placeholder='기기의 핀 번호를 입력해주세요' onChange={onChange}/>
                    <button name='key' type="button" onClick={onClickBtn} >확인</button>
                    {<div  className='text' >{ isKey===1 ? '*성공했습니다.' : isKey===2 && '*해당번호는 없습니다.'}</div>}
                    
                    <input name='pwdOnchange' className='modalbtn' size='30' placeholder='기기의 초기 비밀번호를 입력해주세요'onChange={onChange} />
                    <button name='pwd' type="button" onClick={onClickBtn}>확인</button>
                    {<div  className='text' >{ isPwd===1 ? '*성공했습니다.' : isPwd===2 && '*인증에 실패 했습니다.'}</div>}
                    
                    <input  name='nickName' className='modalbtn' size='30' placeholder='기기의 이름을 입력해주세요' onChange={onChange} />
                    {<div  className='text' >{ isNickName===1 ? closeModal() : isNickName===2 && '*등록에 실패했습니다. 관리자에게 문의 바랍니다.'}</div>}
                </div>

            </Modal>
        </div>
    )

}
export default withCookies(ModalMain)
