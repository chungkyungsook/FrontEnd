import React,{useState,useEffect} from 'react' ;
import '../Css/Myfarm2.css';
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import axios from 'axios';

 // 해당 페이지 보여주기

import {format} from 'date-fns';
import { da } from 'date-fns/locale';
import { concat } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import io from 'socket.io-client'
import MyFarmComponent from '../Component/MyFarmComponent';
import swal from 'sweetalert';

//그래프
import LogoutChart from '../../Beomhwan/Components/LogoutChart';

import {
  AWS_URL,
  LOGOUT,
  MUCHIN_SETTING
}from '../../Util/api'
import { getMuchineList,getMuchineDeviceId,getMuchineKey,getMuchinePwd,getMuchineMakeDevice, getMuchineSetting,getMuchineDelete,useKinokoDispatch, useKinokoState } from '../../KinokoContext';
import Modal from '../Component/Modal/Modal'; 
import ModalDel from '../Component/Modal/ModalDel';
export default function MyFarm(){
  
  const state    = useKinokoState();
  const dispatch = useKinokoDispatch();

  const { data: muchinList, loading, error } = state.muchinList; // state.data 를 users 키워드로 조회
  const { data: muchinKey, error: errKey, isOk: isOkKey } = state.muchinKey; // state.data 를 users 키워드로 조회
  const { error: errPwd, isOk:isOkPwd } = state.muchinPwd; // state.data 를 users 키워드로 조회
  const {  error: errDevice, isOk:isOkDevice } = state.muchinMakeDevice; // state.data 를 users 키워드로 조회
  const { data:DeviceId, error: errDeviceId, isOk:isOkDeviceId } = state.muchinDeviceId; // state.data 를 users 키워드로 조회
  const [nodivice, setNodivece] = useState(false); // 처음 디바이스 정보 가져올 때
  const [isDevice, setIsDevice] = useState(false)
  const [deviceNumber, setDeviceNumber] = useState("")
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalDelOpen, setModalDelOpen ] = useState(false);
  const [inputValue, setInputValue] = useState('')


  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
    setInputValue('')
    getMuchinePwd(dispatch,'me')
    getMuchineKey(dispatch,'me')
    getMuchineMakeDevice(dispatch,'me')
  }

  // 선택 삭제
  const openModalDel = () => {
    setModalDelOpen(true);
  }

  const closeModalDel = (argIsOk) => {
    setModalDelOpen(false);
    setInputValue('')
    setDeviceNumber('')
    getMuchineSetting(dispatch,'me')
    getMuchineDelete(dispatch,'me')
    if(argIsOk === 200 ){
      console.log('삭제, 선택 성공!');
      setNodivece(false)
      getMuchineList(dispatch)
    }else{
      console.log('삭제, 선택 실패!');
    }
  }
  

  const onClickBtn = (e)=>{
    const {name} = e.target

    if(name === 'key'){
      getMuchineKey(dispatch,inputValue.keyOnchange)
    }else if(name === 'pwd'){
      getMuchinePwd(dispatch, {pin:inputValue.keyOnchange,pw:inputValue.pwdOnchange})
    }else if (name === 'makeDevice'){
      getMuchineMakeDevice(dispatch, {pin:inputValue.keyOnchange,pw:inputValue.pwdOnchange, machineName: inputValue.nickName})
    }

  }

  const onChange = (e)=>{
    const {name,value} = e.target
    
    setInputValue(
      { 
        ...inputValue,
        [name] : value
      }
    )
      
  }

  //정보 가져오기
  const getMuchinList = ()=>{
    setNodivece(false)
    getMuchineList(dispatch)
    getMuchineDeviceId(dispatch)
  }

  const onSetMuchin = ()=>{
    console.log('onsetMuchin',deviceNumber);
    getMuchineSetting(dispatch,deviceNumber)
  }

  const onDelMuchin = ()=>{
    console.log('onDelMuchin',deviceNumber);
    getMuchineDelete(dispatch,deviceNumber)
  }

  useEffect(()=>{
    console.log("Myfarm");
    console.log('loading',loading);
    if(error){
      console.log('error', error.response.data);
      setNodivece(true)
    }
    
    muchinList && muchinList.map( (obj)=>(
      (obj.machine_ison !== "false" && setIsDevice(true),
      console.log(obj))
    ))
    DeviceId && console.log('DeviceId',DeviceId);

  },[loading, error,muchinList,DeviceId])


  
  if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>
  
  return(
      <>
        <div className='myfarm-wrap'>
          <div className='inner'>
            {/* 재배기 등록 모달 */}
            <Modal open={ modalOpen } close={ closeModal } header="재배기 등록" onClickBtn={onClickBtn} isOkPwd={isOkPwd}>
            <div>
                    <input  name='keyOnchange' className='modalbtn' size='30' onChange={onChange} placeholder='재배기 핀 번호를 입력해주세요'/>
                    <button name='key' type="button" onClick={onClickBtn} className='ok-btn'>확인</button>
                    {errKey && <div>*실패 했습니다...</div>}
                    { isOkKey === 202 && <div>*성공 했습니다!</div>}
                    <input name='pwdOnchange' className='modalbtn' size='30' onChange={onChange} placeholder='재배기 비밀번호를 입력해주세요' />
                    <button name='pwd' type="button" onClick={onClickBtn} className='ok-btn'>확인</button>
                    {errPwd && <div>*실패 했습니다...</div>}
                    {isOkPwd === 202 && <div>*성공 했습니다!</div>}
                    <input  name='nickName' className='modalbtn' size='30' onChange={onChange} placeholder='기기의 이름을 입력해주세요'  />
                    {errDevice && <div>*실패 했습니다...{errDevice.response.data}</div>}
                    {isOkDevice === 202 && <div>*성공 했습니다!</div>}
                </div>
            </Modal>

            <ModalDel open={ modalDelOpen } close={ closeModalDel }  header="재배기 삭제"  onSetMuchin={onSetMuchin} onDelMuchin={onDelMuchin}>
            <div>
                <div>
                    <div className="textStyle">"사용" 및 "삭제"를 선택해 주세요.</div>
                    <br/>
                    <br/>
                    <div className="textStyle"><span className="text">*주의사항</span></div>
                    <div className="textStyle">해당 재배기를 삭제하면 그전에 기록한 정보들은</div>
                    <div className="textStyle">"전부" 삭제됩니다</div>
                </div>
              </div>
            </ModalDel>


            <div className='myfarm-left'>
              <div className='btn-group'>
                <div className='muchine-title'><span>재배기 관리</span></div>
                <button className='muchine-btn' onClick={openModal}> <span>+</span> </button>
                {
                  muchinList && muchinList.map( (obj)=>(
                    <button className='muchine-btn' onClick={() =>{openModalDel(); (()=>{setDeviceNumber(obj.id)})() }}> <span>{obj.machine_name}</span> </button>
                  ))
                }
                <button className='muchine-btn' onClick={getMuchinList}> <span>새로 불러오기</span> </button>
                <button className='muchine-btn' onClick={openModalDel}> <span>기기 삭제</span> </button>
              </div>
            </div>

            <div className='myfarm-right'>
              <div className='right-wrap'>
                {nodivice && <span >등록된 기기가 없습니다. 기기를 등록해 주세요</span>}
                {/* {!loading && !isDevice && <span >선택된 기기가 없습니다. 기기를 선택해 주세요</span>} */}
                {loading && <span >Loding...</span>}
                { DeviceId && 
                  <><div className='grap-wrap'>
                    <div className = "grap">
                        <LogoutChart value={deviceNumber&&deviceNumber}/>
                    </div>
                  </div>

                  <div className='kinokoInfo-wrap'>

                    <div className='soket'> 실시간 소캣 </div>
                    <div > 버섯 정보 영역</div>


                  </div>
                </>
              }
              </div>
            </div>


          </div>
        </div>
      </>
  )

}
