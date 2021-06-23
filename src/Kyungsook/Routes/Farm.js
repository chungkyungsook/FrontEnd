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
  getMushroom3D
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

  // const socket = useRef(io('http://192.168.1.101:3000')) ;

  const { data:DeviceId, isOk:isOkDeviceId } = state.muchinDeviceId; 
  const { data:programInfo,  isOk:isOkProgramInfo ,loading: loadingProgramInfo} = state.programInfo; 
  const { data:mushroomInfo,  isOk:isOkMushroomInfo ,loading: lodingMushroomInfo} = state.getMushroomInfo; 
  const { data:mushroomImg,  isOk:isOkMushroomImg } = state.getMushroomImg; 
  const { data:StartDay, isOk:isOkStartDay } = state.getStartDay; 

  const { data:mushroom3D, isOk:isOkmushroom3D } = state.getMushroom3D; 


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
      alert('선택한 재배기가 없습니다.')
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
      <div className='inner'>Loding....</div>
    </div>
  )
  if(lodingMushroomInfo) return (
    <div className='farm-wrap'> 
      <div className='inner'>Loding....</div>
    </div>
  )
  return(
    <div className='farm-wrap'>
    {isOkDeviceId !== 202 &&<Redirect to='/'/>}
      <div className='inner'>
      <div className='farm-left'>
        <div className='three-wrap'>
          <div>3D 배지</div>
          {image ? <div className='noText'>가공된 3D 파일 없음</div> : <VeidoMushroom/> }
          <div className='farm-btn-wrap'>
            
            {
              mushroomInfo !== null && (
                console.log('isOkMushroomInfo',isOkMushroomInfo),
                mushroomInfo.map(data =>(
                  data.mr_status ==='growing'?
                    <button onClick={() => onGetMushroom(data)}>성장버섯</button>
                  : data.mr_status ==='harvest' ?
                    <button onClick={() => onGetMushroom(data)}>수확가능</button>
                  :data.mr_status ==='whiteflower'?
                    <button onClick={() => onGetMushroom(data)}>백화고</button>
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
                <h1>버섯 갤러리</h1>
                <Swiper pagination={{
                  "type": "progressbar"
                  }} navigation={true} className="mySwiper">
                  {!mushroomGrowing ? 
                  <SwiperSlide>버섯 버튼을 눌러보세요!</SwiperSlide> 
                  : 
                  <>
                  {imgData !== null &&  imgData.map(
                    data =>(
                      <SwiperSlide><img src={`${AWS_URL}${IMG_COMPOST}/1`}/></SwiperSlide>
                  ))
                  }
                  </>
                }
                </Swiper>
                <div className='mushroom-info'>
                  <div className='grow-box'>
                    <div className='text2'>성장률</div>
                    <spna className='text3'>{mushroomGrowing ? mushroomGrowing.growing : 0}%</spna>
                  </div>
                  <div className='grow-box'>
                    <div className='text2'>버섯 길이</div>
                    <spna className='text3'>{mushroomGrowing ? mushroomGrowing.cm : 0}cm</spna>
                  </div>
                </div>
            </div>
            <div className='info-right'>
              <div className='info-text-wrap'>
                <h2>Today 버섯</h2>
                <span>{mushroomNum && mushroomNum[5]}개</span>
              </div>

              <div className='info-text-wrap'>
                <h2>백화고</h2>
                <span>{mushroomNum && mushroomNum[2]}개</span>
              </div>

              <div className='info-text-wrap'>
                <h2>수확 가능 버섯</h2>
                <span>{mushroomNum && mushroomNum[1]}개</span>
              </div>

              <div className='info-text-wrap'>
                <h2>성장중인 버섯</h2>
                <span>{mushroomNum && mushroomNum[0]}개</span>
              </div>

              <div className='info-text-wrap'>
                <h2>수확한 버섯</h2>
                <span>{mushroomNum && mushroomNum[3]}개</span>
              </div>

              <div className='info-text-wrap'>
                <h2>모든 버섯</h2>
                <span>{mushroomNum && mushroomNum[4]}개</span>
              </div>

            </div>
          </div>

        </div>
      </div>


      </div>
    </div>
  )
}


// import React, { useEffect, useRef, useState } from 'react' ;
// import styled from 'styled-components' ;
// import {Redirect}   from 'react-router-dom' ;
// import { withCookies} from 'react-cookie';
// import KinokoInfo from '../Component/FarmComponent/KinokoInfo';
// import FarmMock from '../Component/FarmComponent/FarmMock'
// import axios from 'axios';

// import io from 'socket.io-client'

// import {
//   AWS_URL,
//   MUSHROOM_ALL, //모든 버섯 상태 가져오기
//   PLY,
//   MUSHROOM_NAME
// } from '../../Util/api.js'

// import { pl, tr } from 'date-fns/locale';

// import * as THREE from 'three' ;
// import { PLYLoader } from '../../../node_modules/three/examples/jsm/loaders/PLYLoader' ;
// import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls' ;
// import Stats from '../../../node_modules/three/examples/jsm/libs/stats.module' ;




// const WIDTH = 500 ;
// const HIGHT = 700 ;

// const loader = new PLYLoader() ;

// const Farm = ({cookies,value}) => {
  
//   const element = useRef() ;

//   //선택한 버섯 정보 저장
//   const [kinoko,setKinoko] = useState(null)

//   //버섯 객체 정보 담기
//   const [growing, setGrowing]         = useState([])
//   const [harvest, setHarvest]         = useState([])
//   const [whiteflower, setWhiteflower] = useState([])
//   const [complete, setComplete]       = useState([])
//   const [kinokoList, setKinokoList]   = useState([])

//   //로딩 화면 대기
//   const [loding, setLoding] = useState(false)

//   //버섯 상태별
//   const kinokoState = ['growing', 'harvest', 'whiteflower', 'complete']

//   //버섯 선택 유무 판단
//   const [name, setName] = useState(null)

//   const [kinokoName, setKinokoName] = useState()

//   const kinokoOnClick = (e) =>{
//     console.log(e.target.id)
//     setName(e.target.id)
//   }

//   const onClick = (data) =>{
//     console.log("Farm 버섯 객체 누르면 해당 정보 보여주기",data);
//     setKinoko(data)
//   }
//     //버섯 배지 이름 가져오기
//   function mushroom_name (){
      
//       axios.get(`${AWS_URL}${MUSHROOM_NAME}`,{
//           params : {id : parseInt(value.prgInfo.prg_id)}
//       }).then(data =>{
//           console.log("이름 가져오기 성공",data.data)
//           setKinokoName(data.data)
//       }).catch(e =>{
//           console.log(e);
//       })
      
//   }
//     //4번  버섯 재배기 안 모든 버섯 객체 정보 저장
//     function mushroom_all () {
//       console.log("==========4. Myfarm 모든 버섯 객체 저장하기==========")
      
//       axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[0]}`,{
//           params : {prgId : value.prgInfo.prg_id}
//       }).then(data =>{               
//           console.log(data.data);
//           setGrowing(  
//               data.data
//           )
//       }).catch(e =>{
//           console.log("자라고 있는 버섯 정보 가져오기 실패",e);
//       })

//       axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[1]}`,{
//           params : {prgId : value.prgInfo.prg_id}
//       }).then(data =>{               
//           console.log(data.data);
//           setHarvest(  
//                 data.data
//           )
//       }).catch(e =>{
//           console.log("수확 버섯 정보 가져오기 실패",e);
//       })

//       axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[2]}`,{
//           params : {prgId : value.prgInfo.prg_id}
//       }).then(data =>{               
//           console.log(data.data);
//           setWhiteflower(  
//                 data.data
//           )
//       }).catch(e =>{
//           console.log("백화고 버섯 정보 가져오기 실패",e);
//       })

//       axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[3]}`,{
//         params : {prgId : value.prgInfo.prg_id}
//       }).then(data =>{               
//           console.log(data.data);
//           setComplete(  
//                 data.data
//           )
//       }).catch(e =>{
//           console.log("수확한 버섯 정보 가져오기 실패",e);
//       })

//       axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
//         params : {prgId : value.prgInfo.prg_id}
//       }).then(data =>{               
//           console.log(data.data);
//           setKinokoList(  
//                 data.data
//           )

//           setLoding(true)
//       }).catch(e =>{
//           console.log("수확한 버섯 정보 가져오기 실패",e);
//           alert('아직 자라난 표고버섯이 없어요..')
          
//           setLoding(1) // 해당 데이터가 없으면 myfarm페이지로 이동
//       })

//     }

//     //3D
//     const api = axios.create({
//       baseURL : 'http://54.163.128.160'
//     }) ;
    
//     //3D
//     function get3dData() {

//       api.get('/api/url/ply/17').then((img_3d) => {

//         const { data } = img_3d ;

//         var scene = new THREE.Scene();


//         const axesHelper = new THREE.GridHelper(10)

//         scene.add(axesHelper)
//         scene.background = new THREE.Color(0x222222) ;

//         var camera = new THREE.PerspectiveCamera( 75, WIDTH/HIGHT, 0.1, 100 );
//         var renderer = new THREE.WebGLRenderer();
//         renderer.setSize( WIDTH, HIGHT );
//         var light = new THREE.SpotLight();
//         light.position.set(20, 20, 20)
//         scene.add(light);
//         element.current.appendChild( renderer.domElement );

//         camera.position.z = 10 ;


//         const controls = new OrbitControls(camera, renderer.domElement) ;

//         loader.load(`http://54.163.128.160/api/url/ply?url=${data}`, function(geometry){

//           geometry.computeVertexNormals() ;
          
//           const material = new THREE.MeshPhysicalMaterial({
//             color: 0xffffff,
          
//             metalness: .25,
//             roughness: 0.1,
//             transparent: true,
//             transmission: 1.0,
//             side: THREE.DoubleSide,
//             clearcoat: 1.0,
//             clearcoatRoughness: .25
//         });
    
//           const mesh = new THREE.Mesh(geometry, material) ; 

//           mesh.position.y = 0 ;
//           mesh.position.x = 0 ;
//           mesh.position.z = 0.3 ;


//           scene.add(mesh) ;

//           },(xhr) => {
//             console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
//           },
//           (error) => {
//               console.log(error);
//           }
//         ) ; 
//         const stats = Stats() ;

//         function animate() {
//           requestAnimationFrame( animate );
//           stats.update() ;
//           render() ;
//         };

//         function render() {
//           renderer.render( scene, camera );
//         }

//         animate();

//       }) ;

//     }


//     //마지막. 재배기 작동 상태  isValue -> 제일 마지막에 실행 isLoding -> true 화면 보이기    
//   useEffect(()=>{

//     console.log('===========Farm 처음 실행 상태===========');
    
 
//   },[])

//   useEffect(()=>{
    
//     console.log('kinokoList',kinokoList);
//     console.log('kinokoList',growing);
//     console.log('kinokoList',harvest);
//     console.log('kinokoList',whiteflower);
//     console.log('kinokoList',complete);
    
//   },[kinokoList])

//   useEffect(()=>{
//     console.log('===========Farm 처음 실행 상태===========');

//     if(value.prgInfo.prg_id !== 0){
//       mushroom_name()
//       mushroom_all()
//       // get3dData() ;
//     } 

//   },[value.prgInfo])


//   //버섯 상태별로 저장하기

//   const view = {
//     growing,
//     harvest,
//     whiteflower,
//     complete, 
//     kinokoList, 
//     kinoko,
//     kinokoOnClick,
//     name,
//     kinokoName
//   }
  
  
    
//   return(
//       <>
        
//         {/* 선택한 기기 버섯 정보 가져오기 */}
//         <KinokoInfo />
//         {/* 버섯 화면에 보이기 -> mock은 test파일 원본은 farmBox */}
//         { loding ? (<FarmMock value={value} view={view} onClick={onClick}/>) : (<div>LODING....</div>)}
        
//       </>
//   )  
// } 

// export default withCookies(Farm) ;