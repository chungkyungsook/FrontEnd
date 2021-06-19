import React,{useState,useEffect} from 'react' ;
import '../Css/Myfarm2.css';
import {Redirect}   from 'react-router-dom' ;
import logoimg1 from '../../assets/logo.png' ;
import farmer from '../../assets/farmer.png';
import {Link} from 'react-router-dom';
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
}from '../../Util/api'
import { getMuchineList,getMuchineDeviceId,getMuchineKey,getMuchinePwd,getMuchineMakeDevice, getMuchineSetting,getMuchineDelete,useKinokoDispatch, useKinokoState } from '../../KinokoContext';
import Modal from '../Component/Modal/Modal'; 
import ModalDel from '../Component/Modal/ModalDel';


export default function MyFarm(){
  
  const state    = useKinokoState();
  const dispatch = useKinokoDispatch();
  //api axios 
  const { data: muchinList, loading, error } = state.muchinList; // state.data 를 users 키워드로 조회
  const { error: errKey, isOk: isOkKey } = state.muchinKey; // state.data 를 users 키워드로 조회
  const { error: errPwd, isOk:isOkPwd } = state.muchinPwd; // state.data 를 users 키워드로 조회
  const {  error: errDevice, isOk:isOkDevice } = state.muchinMakeDevice; // state.data 를 users 키워드로 조회
  const { data:DeviceId, isOk:isOkDeviceId } = state.muchinDeviceId; // state.data 를 users 키워드로 조회
  
  
  const [nodivice, setNodivece] = useState(false); // 처음 디바이스 정보 가져올 때
  const [deviceNumber, setDeviceNumber] = useState("")
  const [setDevice, isSetDevice] =useState('muchine-btn')
  // useState를 사용하여 open상태를 변경한다. (모달 창에서 사용됨)
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalDelOpen, setModalDelOpen ] = useState(false);
  const [inputValue, setInputValue] = useState('')
  
  //실시간 소캣 이미지 저장용
  const [image, setImage] = useState(null)
  
  // 재배기 온도, 습도 값 저장
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)

  //가짜 데이터 : 실시간 소캣 통신 일단 막기 위해 사용됨 -> true로 바꿔줘야 실행
  const [value, setValue] = useState(false)

  const openModal = () => {
    setModalOpen(true);
  }

  //key,pwd,device 모달 창 닫기 : 초기화 과정 진행 
  const closeModal = () => {
    setModalOpen(false);
    setInputValue('')
    getMuchinePwd(dispatch,'me')
    getMuchineKey(dispatch,'me')
    getMuchineMakeDevice(dispatch,'me')
    getMuchinList()
  }

  // 선택 삭제
  const openModalDel = () => {
    setModalDelOpen(true);
  }

  // 선택, 삭제 모달 창 닫기 : 초기화 과정 진행
  const closeModalDel = (argIsOk) => {
    setModalDelOpen(false);
    setInputValue('')
    setDeviceNumber('')
    getMuchineSetting(dispatch,'me')
    getMuchineDelete(dispatch,'me')
    if(argIsOk === 202 ){
      console.log('삭제, 선택 성공!');
      setNodivece(false)
      getMuchinList()
      
    }else{
      console.log('삭제, 선택 실패!');
    }
  }
  

  //모달 창에서 사용 됨, key, pwd,device 맞는 지 확인 과정
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

  //재배기 in,key,nikcname 입력값
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

  //선택
  const onSetMuchin = ()=>{
    console.log('onsetMuchin',deviceNumber);
    getMuchineSetting(dispatch,deviceNumber)
  }

  //삭제
  const onDelMuchin = ()=>{
    console.log('onDelMuchin',deviceNumber);
    getMuchineDelete(dispatch,deviceNumber)
  }



  //============= useEffect =======================

  useEffect(()=>{
    console.log("Myfarm");
    console.log('처음 loading',loading);
    if(error){
      console.log('error', error.response.data);
      setNodivece(true)
    }
    
    //사용자가 등록된 모든 기기 list 가져오기
    muchinList && muchinList.map( (obj)=>(
      (obj.machine_ison !== "false" && isSetDevice('muchine-btn-setCheck'),
      console.log(obj))
    ))
    
    //선택된 디바이스 있는 지 확인
    DeviceId && console.log('DeviceId',DeviceId);

  },[loading, error,muchinList,DeviceId,isOkDevice,isOkDeviceId])

  //실시간 소캣 통신 
  useEffect(() => {
    if(value){
     // 소켓 연결 코드
     const socket = io('http://192.168.0.10:3000') ;
     
     socket.emit('req_video', true) ;
     socket.on('res_video', (data) => {
     
         const byte_chars = atob(data)

         const byteNumbers = new Array(byte_chars.length) ;
   
         for(let i = 0 ; i < byte_chars.length ; i++) {
           byteNumbers[i] = byte_chars.charCodeAt(i) ;
         }
         const byteArray = new Uint8Array(byteNumbers) ;
   
         const blob = new Blob([byteArray], { type : 'image/png' }) ;
       
         setImage(URL.createObjectURL(blob)) ;
   
          
     }) ;
 
     // 온, 습도 데이터 요청
     socket.emit('req_cosdata');
     // 온, 습도 데이터 받아오는 이벤트
     socket.on('res_cosdata', (data) => {
             console.log(data);
     // 재배기 온도 습도 작동 
     //  parseInt(data.temperature) && parseInt(data.humidity) && maching_setting(parseInt(data.temperature), parseInt(data.humidity) ) 
     // maching_setting(parseInt(data.temperature), parseInt(data.humidity) )
     if(data.temperature != null && data.humidity != null){
         setTemperature(parseInt(data.temperature))
         setHumidity(parseInt(data.humidity))
     }
     
     });
 
     return () => { // 화면 끝
       socket.disconnect() ;
       console.log('myfarm 끝');
     }

    }    //예외 처리
   }, []) ;


  
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
                    <button className={setDevice} onClick={() =>{openModalDel(); (()=>{setDeviceNumber(obj.id)})() }}> <span>{obj.machine_name}</span> </button>
                  ))
                }
                <button className='muchine-btn' onClick={getMuchinList}> <span>새로 불러오기</span> </button>
                <button className='muchine-btn' onClick={openModalDel}> <span>기기 삭제</span> </button>
              </div>
            </div>

            <div className='myfarm-right'>
              <div className='right-wrap'>
                {nodivice && <span >등록된 기기가 없습니다. 기기를 등록해 주세요</span>}
                {!nodivice && !loading && isOkDeviceId !==202 && <span >선택된 기기가 없습니다. 기기를 선택해 주세요</span>}
                {loading && <span >Loding...</span>}
                { DeviceId && 
                  <><div className='grap-wrap'>
                    <div className = "grap">
                        <LogoutChart value={deviceNumber&&deviceNumber}/>
                    </div>
                  </div>

                  <div className='kinokoInfo-wrap'>

                    <div className='soket'> 
                      <div className='soket-img'>
                        <div className='soket-title'><span>실시간 영상</span></div>
                        {image && <img src={image} alt='실시간 통신'/>}
                        {/* <img src={logoimg1} alt='logo' className='logo1'/> */}
                      </div>
                    </div>

                    <div className='kinokoInfo'> 
                      <div className='info-top'>
                        <div className='info-left'>

                        </div>
                        <div className='info-right'>

                        </div>
                      </div>


                      <div className='info-bottom'>

                        <div className='today-info'>
                          <h3>오늘 자란 버섯 수</h3>
                          <span className='today-growth'>4개</span>
                          {/* <span className='today-growth'>0...</span> */}
                        </div>

                        <div className='today-grow'>
                          <h3>수확 가능한 버섯이 있어요!</h3>
                          <img src={farmer} alt='farmer' className='farmer' />
                          {/* <h3>아직은 수확 가능한 버섯이 없네요...</h3> */}
                        </div>

                        <div className='from-move'> 
                          <Link to="/farm">
                            <span className='move'>상세 페이지로 이동 </span>
                          </Link>
                        </div>
                        
                      </div>

                    </div>


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
