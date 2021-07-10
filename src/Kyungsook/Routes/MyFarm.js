import React,{useState,useEffect} from 'react' ;
import '../Css/Myfarm2.css';
import {Redirect}   from 'react-router-dom' ;
import farmer from '../../assets/farmer.png';
import {Link} from 'react-router-dom';
 // 해당 페이지 보여주기

import {format} from 'date-fns';
import io from 'socket.io-client'

//그래프
import LogoutChart from '../../Beomhwan/Components/LogoutChart';
import Progress from '../Component/Progress'

import { 
  getProgramInfo,
  getMuchineKey,
  getMuchinePwd,
  getMuchineList,
  getMuchineDelete,
  getMuchineSetting,
  getMuchineDeviceId,
  getMuchineMakeDevice,
  getMushroomInfo,
  useKinokoDispatch,
  getStartDay,
  useKinokoState 
} from '../../KinokoContext';
import Modal from '../Component/Modal/Modal'; 
import ModalDel from '../Component/Modal/ModalDel';


export default function MyFarm(){
  
  const state    = useKinokoState();
  const dispatch = useKinokoDispatch();

  //오늘 날짜 
  const today = format(new Date(),'yyyy-MM-dd')

  const { data: muchinList, loading, error } = state.muchinList; 
  const { error: errKey, isOk: isOkKey } = state.muchinKey; 
  const { error: errPwd, isOk:isOkPwd } = state.muchinPwd; 
  const {  error: errDevice, isOk:isOkDevice } = state.muchinMakeDevice; 
  const { data:DeviceId, isOk:isOkDeviceId ,loading:loadingDeviceId} = state.muchinDeviceId; 
  const { data:programInfo,  isOk:isOkProgramInfo ,loading:loadingProgramInfo} = state.programInfo; 
  const { data:mushroomInfo,  isOk:isOkMushroomInfo } = state.getMushroomInfo; 
  const { data:StartDay, loading: startLoading} = state.getStartDay; 

  const [nodivice, setNodivece] = useState(false); // 처음 디바이스 정보 가져올 때
  const [deviceNumber, setDeviceNumber] = useState("")
  const [setDevice, isSetDevice] =useState('muchine-btn')
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalDelOpen, setModalDelOpen ] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const [ harvest, setHarvest] = useState(false)
  const [todayMushroom, setTodayMushroom] = useState(false) // 오늘 자라난 버섯
  const [startMushroom, setStartMushroom] = useState(false)
  
  //실시간 소캣 이미지 저장용
  const [image, setImage] = useState(null)
  // 재배기 온도, 습도 값 저장
  const [temperature, setTemperature] = useState(24)
  const [humidity, setHumidity] = useState(72)

  //가짜 데이터
  const [value, setValue] = useState(false)

  const openModal = () => {
    setModalOpen(true);
  }
  
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

  const closeModalDel = (argIsOk) => {
    setModalDelOpen(false);
    setInputValue('')
    setDeviceNumber('')
    getMuchineSetting(dispatch,'me')
    getMuchineDelete(dispatch,'me')
    getProgramInfo(dispatch,'me')
    if(argIsOk === 202 ){
      console.log('삭제, 선택 성공!');
      setNodivece(false)
      getMuchinList()
      setValue(false)
    }else if(argIsOk === 444){
      console.log('삭제, 선택 실패!');
    }else{
      setNodivece(false)
      getMuchinList()
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
    getMuchineDeviceId(dispatch) //해당 디바이스 끝나면 실행합시다

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
    console.log('loading',loading);
    if(error){
      console.log('error', error.response.data);
      setNodivece(true)
    }
    
    //사용자가 등록된 모든 기기 list 가져오기
    muchinList && muchinList.map( (obj)=>(
      (obj.machine_ison !== "false" && isSetDevice('muchine-btn-setCheck'),
      console.log(obj))
    ))
    
    if(isOkDeviceId === 202){
      console.log('DeviceId', DeviceId.id);
      getProgramInfo(dispatch,DeviceId.id)
      
    }

  },[loading, error,muchinList,isOkDeviceId,DeviceId,dispatch])

  // 모든 버섯 정보 가져오기
  useEffect(()=>{
    if(isOkProgramInfo === 202){
      console.log('isOkProgramInfo',programInfo[0]);
      getMushroomInfo(dispatch,programInfo[0].id)
      getStartDay(dispatch,programInfo[0].id)
    }
  },[isOkProgramInfo])

  // 모든 버섯 정보 에서 수확활 버섯 있는지 확인하기
  useEffect(()=>{
    let num = 0
    let ingDay = 0
    let start = new Date(StartDay)
    let day = new Date()
    console.log('mushroomInfo',isOkMushroomInfo);
    if(isOkMushroomInfo === 202){
      console.log('mushroomInfo',isOkMushroomInfo);
      mushroomInfo.map( data =>{
        data.mr_status ==='complete' && console.log('data.mr_status',data.mr_status);
        data.mr_status ==='harvest' && setHarvest(true)
      })
      
      //오늘 자란 버섯 수
      mushroomInfo.filter(data =>
        format(new Date(data.mr_date),'yyyy-MM-dd') === today && (num = num + 1)
      )
      
    } 
    // 진행 날짜 구하기
    if(StartDay) {
      ingDay = (day.getTime() - start.getTime()) / (1000*60*60*24) + 1
      console.log('startday',StartDay,'day',day,'start',start);
      
      //소캣 통신을 위한 변수 / 프로그램 id가 있으면 소캣 통신 합니다. 
      setValue(false)
    }
    setStartMushroom(parseInt(ingDay))
    // 오늘 자란 버섯 수
    setTodayMushroom(num)

    
    console.log(StartDay,'date');
  },[isOkMushroomInfo,StartDay])

  useEffect(() =>{

  },[harvest])

  //실시간 소캣 통신 
  useEffect(() => {
    
    if(value){
      console.log('value',' 실행됨',value);
     // 소켓 연결 코드
     const socket = io('http://192.168.1.101:3000') ;
     console.log('소캣 연결 확인 중');
    

     console.log(socket) ;
     
     socket.emit('req_video', true) ;
     socket.on('res_video', (data) => {

        console.log("소켓 사진 데이터", data) ;
     
         const byte_chars = atob(data)

         const byteNumbers = new Array(byte_chars.length) ;
   
         for(let i = 0 ; i < byte_chars.length ; i++) {
           byteNumbers[i] = byte_chars.charCodeAt(i) ;
         }
         const byteArray = new Uint8Array(byteNumbers) ;
   
         const blob = new Blob([byteArray], { type : 'image/png' }) ;
       
         setImage(URL.createObjectURL(blob)) ;
   
          
     })
 
     socket.emit('req_cosdata');
     // 온, 습도 데이터 요청
     // 온, 습도 데이터 받아오는 이벤트
     socket.on('res_cosdata', (data) => {
             console.log("소캣 온 습도 값 가져오기",data);
     // 재배기 온도 습도 작동 
     if(data.temperature != null && data.humidity != null){
         setTemperature(parseInt(data.temperature))
         setHumidity(parseInt(data.humidity))
     }
     
     });
    
     return () => { // 화면 끝
      // socket.disconnect() ;
      setValue(false)
      console.log('myfarm 끝');
     }

    }    //예외 처리 

   },[value]) ;


  
  if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>
  
  return(
      <>
        <div className='myfarm-wrap'>
          <div className='inner'>
            {/* 재배기 등록 모달 */}
            <Modal open={ modalOpen } close={ closeModal } header="재배기 등록" onClickBtn={onClickBtn} isOkPwd={isOkPwd}>
            <div>
                    <input  name='keyOnchange' className='modalbtn' size='30' onChange={onChange} placeholder='栽培機のピン番号を入力してください'/>
                    <button name='key' type="button" onClick={onClickBtn} className='ok-btn'>확인</button>
                    {errKey && <div>*失敗しました...</div>}
                    { isOkKey === 202 && <div>*成功しました!</div>}
                    <input name='pwdOnchange' className='modalbtn' size='30' onChange={onChange} placeholder='栽培機パスワードを入力してください' />
                    <button name='pwd' type="button" onClick={onClickBtn} className='ok-btn'>확인</button>
                    {errPwd && <div>*失敗しました...</div>}
                    {isOkPwd === 202 && <div>*成功しました!</div>}
                    <input  name='nickName' className='modalbtn' size='30' onChange={onChange} placeholder='栽培器の名前を入力してください'  />
                    {errDevice && <div>*失敗しました...{errDevice.response.data}</div>}
                    {isOkDevice === 202 && <div>*成功しました!</div>}
                </div>
            </Modal>

            <ModalDel open={ modalDelOpen } close={ closeModalDel }  header="栽培機を削除します。"  onSetMuchin={onSetMuchin} onDelMuchin={onDelMuchin}>
            <div>
                <div>
                    <div className="textStyle">「使用」および 「削除」 を選択してください。</div>
                    <br/>
                    <br/>
                    <div className="textStyle"><span className="text">*注意事項</span></div>
                    <div className="textStyle">その栽培器を削除した場合、以前に記録された情報は</div>
                    <div className="textStyle">「すべて」削除されます。</div>
                </div>
              </div>
            </ModalDel>


            <div className='myfarm-left'>
              <div className='btn-group'>
                <div className='muchine-title'><span>栽培機管理</span></div>
                <button className='muchine-btn' onClick={openModal}> <span>+</span> </button>
                {
                  muchinList && muchinList.map( (obj)=>(
                    <button className={setDevice} onClick={() =>{openModalDel(); (()=>{setDeviceNumber(obj.id)})() }}> <span>{obj.machine_name}</span> </button>
                  ))
                }
              </div>
            </div>

            <div className='myfarm-right'>
              <div className='right-wrap'>
                {nodivice && <span >登録された栽培器がありません。栽培器を登録してください</span>}
                {loading && <span >Loading...</span>}
                
                {!nodivice && !loading && isOkDeviceId !==202 && <span >選択された栽培器がありません。栽培器を選択してください</span>}
                {!loading && !nodivice && loadingDeviceId  && <span >Loading...</span>}
                {!loading && !nodivice && isOkDeviceId ===202 &&!loadingDeviceId  && loadingProgramInfo && <span >Loading...</span>}
                
                {!nodivice && !loading && isOkDeviceId === 202 &&  isOkProgramInfo !== 202 && !loadingProgramInfo && <span>選択されたプログラムがありません。ファーム環境設定からプログラムを選択してください</span>}
                {!loading && !nodivice && !loadingDeviceId && isOkProgramInfo === 202  && startLoading &&<span>Loading...</span>}
                {/* !nodivice &&  임의로 지정*/}
                
                {!nodivice && !loading && programInfo && !startLoading &&
                  <><div className='grap-wrap'>
                    <div className = "grap">
                        <LogoutChart />
                    </div>
                  </div>

                  <div className='kinokoInfo-wrap'>

                    <div className='soket'> 
                      <div className='soket-img'>
                        <div className='soket-title'><span>リアルタイム映像</span></div>
                        {image ? <img src={image} alt='リアルタイム通信'/> : <div> 現在、栽培機がカメラを使用しています。少し待ってください。</div>}

                      </div>
                    </div>

                    <div className='kinokoInfo'> 

                      <div className='info-top'>
                        {/* 온도 습도 */}
                        <div className='info-left'>
                            <div className = "progress">
                              <span>温度</span>
                              <Progress color={'secondary'} value={temperature} name={'온도'}/>
                            </div>    

                            <div className = "progress">
                              <span>湿度</span>
                              <Progress value={humidity}/>
                            </div>       
                        </div>

                        <div className='info-right'>
                          <div className='today-box'>
                            <div className='value1'>進行中のプログラム</div>
                            <div className='value2'>{isOkProgramInfo === 202 && programInfo[0].prg_name}</div>
                          </div>
                          <div className='today-box'>
                            <div className='value1'>Today</div>
                            <div className='value2'>{startMushroom ? startMushroom : 0}日目</div>
                          </div>
                        </div>


                      </div>


                      <div className='info-bottom'>

                        <div className='today-info'>
                          <h3>  今日育ったキノコの数 </h3>
                          <span className='today-growth'>{todayMushroom ? todayMushroom : 0}つ</span>
                        </div>

                        <div className='today-grow'>
                          {harvest ? 
                          (
                            <>
                              <h3>収穫可能なシイタケがあります！</h3>
                              <img src={farmer} alt='farmer' className='farmer' />
                            </>
                          ):
                            <>
                              <h3>まだ、収穫できるシイタケがありません。。。</h3>
                            </>
                          }
                          
                          
                        </div>

                        <div className='from-move'> 
                          <Link to="/farm">
                            <span className='move'>Farmページに移動します。 </span>
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
