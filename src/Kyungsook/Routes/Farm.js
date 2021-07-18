import React, { useEffect, useState,useRef} from 'react'
import {Redirect}   from 'react-router-dom' ;
import VeidoMushroom from '../Component/FarmComponent/VeidoMushroom';
import '../Css/farm2.css'
import ProgressChart from '../../Beomhwan/Components/ProgressChart'
import { 
  getProgramInfo,
  getMushroomInfo,
  useKinokoDispatch,
  getStartDay,
  useKinokoState ,
  getMushroomImg,
  getMushroomCluster,
  getMushroomHistory,
  getMushroomRotation
} from '../../KinokoContext';
import { format } from 'date-fns';

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

// import Swiper core and required modules
import SwiperCore, {
  EffectCube,
  Pagination,Navigation
} from 'swiper/core';
import { AWS_URL, MUSHROOM_REALTIME,IMG_COMPOST } from '../../Util/api';


// install Swiper modules
SwiperCore.use([EffectCube,Pagination,Navigation]);

export default function Farm(){

  
  //버섯 성장 상태별로 저장 
  const [mushroomNum, setMushroomNum] = useState()

  //context 
  const state    = useKinokoState();
  const dispatch = useKinokoDispatch();

  const { data:DeviceId,     isOk:isOkDeviceId } = state.muchinDeviceId; 
  const { data:programInfo,  isOk:isOkProgramInfo ,loading: loadingProgramInfo} = state.programInfo; 
  const { data:mushroomInfo, isOk:isOkMushroomInfo ,loading: lodingMushroomInfo} = state.getMushroomInfo; 
  const {isOk:isOkmushroom3D } = state.getMushroom3D; 
  
  // 실시간 배지 이미지를 가져오기
  const {data: mushroomCluster, isOk: isOkMushroomCluster} = state.getMushroomCluster;
  const {data: mushroomRotation, isOk: isOkMushroomRotation} = state.getMushroomRotation;
  const {data: mushroomHistory, isOk: isOkMushroomHistory} = state.getMushroomHistory;

  const [mushroomGrowing, setMushroomGrowing] = useState(false)
  const [mushroomImgInfo, setMushroomImgInfo] = useState(false)
  const [imgData, setImgData] = useState(null)

  
  //오늘 날짜 
  const today = format(new Date(),'yyyy-MM-dd')

  // 객체 버섯 정보 가져오기
  const onGetMushroom = (data)=>{
    console.log('data',data);
    setMushroomGrowing({
      growing: data.mr_growthrate,
      cm :data.mr_size
    })
    let obj = Object.keys(data).map(function (key) { return data[key]; })
    console.log("obj",obj);
    setImgData(obj)
    //해당 버섯 객체 사진 가져오기
    getMushroomHistory(dispatch,data.id)
    getMushroomImg(dispatch,data.mr_imgid)

  }
  

  // 해당 각도의 버섯 정보 가져오기
  function onChange(data){
    console.log('dddddddddddddddddddddd');
    console.log("data",data.activeIndex)
    console.log("swiperdata",data)

    // 270, 180, 90, 0
    if (data.activeIndex === 0){
      getMushroomRotation(dispatch,{prgId:75,rotation:270})
    }else if (data.activeIndex === 1){
      getMushroomRotation(dispatch,{prgId:75,rotation:180})
    }else if (data.activeIndex === 2){
      getMushroomRotation(dispatch,{prgId:75,rotation:90})
    }else if (data.activeIndex === 3){
      getMushroomRotation(dispatch,{prgId:75,rotation:0})
    }
   
  }
  useEffect(()=>{
    
    if(isOkDeviceId === 202){
      console.log('DeviceId', DeviceId.id);
      getProgramInfo(dispatch,DeviceId.id)
      getMushroomCluster(dispatch,DeviceId.id)
    }else {
      alert('選択した栽培機がありません。')
    }

  },[isOkDeviceId,dispatch,DeviceId])

  useEffect(()=>{
    if(isOkMushroomCluster === 202){
      // getMushroomHistory(dispatch,3)
    }
  },[isOkMushroomCluster,dispatch ])

  useEffect(()=>{

    if(isOkProgramInfo === 202){
      console.log('isOkProgramInfo',programInfo[0]);
      getMushroomInfo(dispatch,programInfo[0].id)
      getStartDay(dispatch,programInfo[0].id)
    }
  },[isOkProgramInfo,isOkmushroom3D])

  // 버섯 이미지 가져오기 
  useEffect(()=>{
    if(isOkMushroomRotation === 444){
      getMushroomHistory(dispatch,"me")
      setMushroomGrowing(false)
    }
  },[isOkMushroomRotation])

  useEffect(()=>{
    let num = [0,0,0,0,0,0]
    // ['growing', 'harvest', 'whiteflower', 'complete','mushroomAll','today']
    if(isOkMushroomInfo === 202){
      console.log('mushroomInfo',isOkMushroomInfo);
      mushroomInfo.map( data =>{
        if(data.mr_status ==='growing' ){
          num[0] = num[0] + 1
        }else if(data.mr_status ==='harvest'){
          num[1] = num[1] + 1
        }else if(data.mr_status ==='whiteflower' ){
          num[2] = num[2] + 1
        }else if(data.mr_status ==='complete' ){
          num[3] = num[3] + 1
        }
      
      }) 

      mushroomInfo.filter(data =>
        format(new Date(data.mr_date),'yyyy-MM-dd') === today && (num[5] = num[5] + 1)
      )

      num[4] = mushroomInfo.length
      console.log(num);
      setMushroomNum(num)
    }else{
      setMushroomNum(num)
    }
    
  },[isOkMushroomInfo])
   

  if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>
  if(loadingProgramInfo) return (
    <div className='farm-wrap'> 
      <div className='inner'>Loading....</div>
    </div>
  )
  if(lodingMushroomInfo) return (
    <div className='farm-wrap'> 
      <div className='inner'>Loading....</div>
    </div>
  )
  return(
    <div className='farm-wrap'>
    {isOkDeviceId !== 202 &&<Redirect to='/'/>}
      <div className='inner'>
      <div className='farm-left'>
        <div className='three-wrap'>
          
          <div className="text">2Dシイタケ</div>
          <div className='img2D'>
            {isOkMushroomCluster === 202 && (
            <Swiper effect={'cube'} grabCursor={true} cubeEffect={{
            "shadow": true,
            "slideShadows": true,
            "shadowOffset": 20,
            "shadowScale": 0.94
            }}  
               className="mySwiper"
               onSwiper={(defaultValue) => onChange(defaultValue)}
               onSlideChange={(defaultValue) => onChange(defaultValue)}
              //  pagination={true}
               >
              <SwiperSlide> <img src={`${AWS_URL}${MUSHROOM_REALTIME}/${mushroomCluster[0].id}`} alt=''/> </SwiperSlide>
              <SwiperSlide> <img src={`${AWS_URL}${MUSHROOM_REALTIME}/${mushroomCluster[1].id}`} alt=''/> </SwiperSlide>
              <SwiperSlide> <img src={`${AWS_URL}${MUSHROOM_REALTIME}/${mushroomCluster[2].id}`} alt=''/> </SwiperSlide>
              <SwiperSlide> <img src={`${AWS_URL}${MUSHROOM_REALTIME}/${mushroomCluster[3].id}`} alt=''/> </SwiperSlide>
            </Swiper>
            
            )} 
          </div>

          <div className='farm-btn-wrap'>

            {
              isOkMushroomRotation === 202 && (
                mushroomRotation.map(data =>(
                  data.mr_status ==='growing'?
                  <button onClick={() => onGetMushroom(data)}>成長したシイタケ</button>
                : data.mr_status ==='harvest' ?
                  <button onClick={() => onGetMushroom(data)}>収穫可能</button>
                :data.mr_status ==='whiteflower'?
                  <button onClick={() => onGetMushroom(data)}>花どんこ</button>
                : null
                ))
              )
            }
          
          </div>
        </div>
      </div>
      
      <div className='farm-right'>
        <div className='right-wrap'>

          <div className='grap-wrap'>
            <div className = "grap">
                <ProgressChart />
            </div>
          </div>

          <div className='farm-info-wrap'>
            <div className='info-left'>
                <h1>ギャラリー</h1>
                
                <Swiper pagination={{
                  "type": "progressbar"
                  }} navigation={true} className="mySwiper">
                    {/* 해당 각도에 버섯 정보가 없을 때 */}
                  {isOkMushroomRotation === 444 && (
                  <SwiperSlide>情報なし</SwiperSlide>   
                  )}  
                  {/* 해당 각도에 버섯 정보가 있을 때*/}
                  {isOkMushroomRotation === 202 && !mushroomGrowing ? 
                  <SwiperSlide>ボタンを押してみてください！</SwiperSlide> 
                  : 
                  <>
                  {isOkMushroomHistory === 202 && (
                    mushroomHistory.map(data=>(
                      <SwiperSlide><img src={`${AWS_URL}${IMG_COMPOST}/${data.id}`} alt=''/></SwiperSlide>
                    ))
                  )}
                  </>
                }
                </Swiper>
                <div className='mushroom-info'>
                  <div className='grow-box'>
                    <div className='text2'>成長率</div>
                    <spna className='text3'>{mushroomGrowing ? mushroomGrowing.growing : 0}%</spna>
                  </div>
                  <div className='grow-box'>
                    <div className='text2'>シイタケの長さ</div>
                    <spna className='text3'>{mushroomGrowing ? mushroomGrowing.cm : 0}cm</spna>
                  </div>
                </div>
            </div>
            <div className='info-right'>
              <div className='info-text-wrap'>
                <h2>Todayキノコ</h2>
                <span>{mushroomNum && mushroomNum[5]}つ</span>
              </div>

              <div className='info-text-wrap'>
                <h2>花ドン</h2>
                <span>{mushroomNum && mushroomNum[2]}つ</span>
              </div>

              <div className='info-text-wrap'>
                <h2>収穫できキノコ</h2>
                <span>{mushroomNum && mushroomNum[1]}つ</span>
              </div>

              <div className='info-text-wrap'>
                <h2>成長中キノコ</h2>
                <span>{mushroomNum && mushroomNum[0]}つ</span>
              </div>

              <div className='info-text-wrap'>
                <h2>収穫しキノコ</h2>
                <span>{mushroomNum && mushroomNum[3]}つ</span>
              </div>

              <div className='info-text-wrap'>
                <h2>すべてキノコ</h2>
                <span>{mushroomNum && mushroomNum[4]}つ</span>
              </div>

            </div>
          </div>

        </div>
      </div>


      </div>
    </div>
  )
}
