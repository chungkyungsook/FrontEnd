import React, { useEffect, useState} from 'react'
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
} from '../../KinokoContext';
import { format } from 'date-fns';

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

// import Swiper core and required modules
import SwiperCore, {
  Pagination,Navigation
} from 'swiper/core';
import { AWS_URL, IMG_COMPOST } from '../../Util/api';
import axios from 'axios';

// install Swiper modules
SwiperCore.use([Pagination,Navigation]);

export default function Farm(){

  
  //버섯 성장 상태별로 저장 
  const [mushroomNum, setMushroomNum] = useState()

  //context 
  const state    = useKinokoState();
  const dispatch = useKinokoDispatch();

  const { data:DeviceId, isOk:isOkDeviceId } = state.muchinDeviceId; 
  const { data:programInfo,  isOk:isOkProgramInfo ,loading: loadingProgramInfo} = state.programInfo; 
  const { data:mushroomInfo,  isOk:isOkMushroomInfo ,loading: lodingMushroomInfo} = state.getMushroomInfo; 

  const {isOk:isOkmushroom3D } = state.getMushroom3D; 


  const [mushroomGrowing, setMushroomGrowing] = useState(false)
  const [image, setImage] = useState(true)
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
    setImgData(obj)
    //해당 버섯 객체 사진 가져오기
  getMushroomImg(dispatch,data.mr_imgid)

  }
  
  useEffect(()=>{
    
    if(isOkDeviceId === 202){
      console.log('DeviceId', DeviceId.id);
      getProgramInfo(dispatch,DeviceId.id)
      axios.get('http://184.73.45.24/api/check/ply').then(data =>{
        console.log('ok',data);
        setImage(false)
      }).catch(e =>{
        console.log('e',e);
        setImage(true)
      })
    }else {
      alert('選択した栽培機がありません。')
    }

  },[isOkDeviceId,dispatch,DeviceId])
  useEffect(()=>{

    if(isOkProgramInfo === 202){
      console.log('isOkProgramInfo',programInfo[0]);
      getMushroomInfo(dispatch,programInfo[0].id)
      getStartDay(dispatch,programInfo[0].id)
      
    }
  },[isOkProgramInfo,isOkmushroom3D])

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
          <div>3Dシイタケ</div>
          {image ? <div className='noText'>加工された3Dファイルなし</div> : <VeidoMushroom/> }
          <div className='farm-btn-wrap'>
            
            {
              mushroomInfo !== null && (
                console.log('isOkMushroomInfo',isOkMushroomInfo),
                mushroomInfo.map(data =>(
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
                  {!mushroomGrowing ? 
                  <SwiperSlide>ボタンを押してみてください！</SwiperSlide> 
                  : 
                  <>
                  {imgData !== null &&  imgData.map(
                    data =>(
                      <SwiperSlide><img src={`${AWS_URL}${IMG_COMPOST}/1`} alt=''/></SwiperSlide>
                  ))
                  }
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
