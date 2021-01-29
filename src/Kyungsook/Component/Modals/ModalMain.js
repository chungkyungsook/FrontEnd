import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Modal from './Modal';


const ModalMain = ()=> {
    //useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOnpen] = useState(false)
    const [test, setTest] = useState(0)

    //key번호 확인
    const [isOk, setIsOk] = useState(0)
    const [isOkPwd, setIsOkPwd] = useState(0)
    
    const [input,setInput] = useState({
        keyOnchange : "", //key 번호
        pwdOnchange : "", // key 비밀 번호
        nickName : "", // 기기 등록 이름
        makeBtn : false,
    })

    //url
    const url = '172.26.3.62'

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
        setIsOk(0)
        setIsOkPwd(0)
    }

    useEffect(()=>{
        
    })

    //key번호 확인
    const onClickKey = () =>{
        axios.get(`http://${url}/api/pin/check`,{
            params:{
                pin : input.keyOnchange
            }
        })
        .then(data =>{
            data.status === 200 && setIsOk(1)
            console.log("status",data.status)
        })
        .catch(
            e=>{console.log(e)
            setIsOk(2)
        })
    }

    //key와 비밀번호 확인 && 등록 버튼 판단
    const onClickPwd = () =>{

        axios.get(`http://${url}/api/pin/auth`,{
            params:{
                pin : input.keyOnchange,
                pw : input.pwdOnchange
            }
        })
        .then(data =>{
            data.status === 200 && setIsOkPwd(1)
            console.log("status",data.status)
        })
        .catch(
            e=>{console.log(e)
                setIsOkPwd(2)
        })       
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
        //값 변경 되었는지 확인
        console.log("key",input.keyOnchange)
        console.log("pwd",input.pwdOnchange)
        console.log("setIsOk",isOk)
        console.log("setIsOkPwd",isOkPwd)
        console.log("makeBtn",input.makeBtn)
        console.log("nickName",input.nickName)

        //공백이면 등록 버튼 false로 값 변경
        input.nickName === "" && setInput({...input,makeBtn: false})

        //key, key 비밀번호 일치 및 기기 이름 설정 하면 
        //등록 가능 하게 버튼 true로 값 변경
        isOk === 1 && isOkPwd === 1 && input.nickName !== "" && setInput({...input,makeBtn:true})
    },[isOk, isOkPwd, setInput,input.nickName])
    
    const {makeBtn} = input
    return(
        <div>
            <div className='item1Button' onClick={openModal}>+</div>
            {/* header부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="기기 등록을 시작합니다." setTest={setTest} makeBtn={makeBtn}>

                {/* Modal.js <main> {props.childern}</main> 에 내용이 입력된다.*/}
                <div>
                    <input  name='keyOnchange' className='modalbtn' size='30' placeholder='기기의 핀 번호를 입력해주세요' onChange={onChange}/>
                    <button type="button" onClick={onClickKey} >확인</button>
                    {<div  className='text' >{ isOk===1 ? '*성공했습니다.' : isOk===2 && '*해당번호는 없습니다.'}</div>}

                    <input name='pwdOnchange' className='modalbtn' size='30' placeholder='기기의 초기 비밀번호를 입력해주세요'onChange={onChange} />
                    <button type="button" onClick={onClickPwd}>확인</button>
                    {<div  className='text' >{ isOkPwd===1 ? '*성공했습니다.' : isOkPwd===2 && '*인증에 실패 했습니다.'}</div>}

                    <input  name='nickName' className='modalbtn' size='30' placeholder='기기의 이름을 입력해주세요' onChange={onChange} />
                    
                </div>
            </Modal>
        </div>
    )

}
export default ModalMain
