import React, { useEffect, useRef, useState } from 'react' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import KinokoInfo from '../Component/FarmComponent/KinokoInfo';
import FarmMock from '../Component/FarmComponent/FarmMock'
import axios from 'axios';

import io from 'socket.io-client'

import {
  AWS_URL,
  MUSHROOM_ALL, //모든 버섯 상태 가져오기
  PLY,
  MUSHROOM_NAME
} from '../../Util/api.js'

import { pl, tr } from 'date-fns/locale';

import * as THREE from 'three' ;
import { PLYLoader } from '../../../node_modules/three/examples/jsm/loaders/PLYLoader' ;
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls' ;
import Stats from '../../../node_modules/three/examples/jsm/libs/stats.module' ;


const WIDTH = 500 ;
const HIGHT = 700 ;

const loader = new PLYLoader() ;

const Farm = ({cookies,value}) => {
  
  const element = useRef() ;

  //선택한 버섯 정보 저장
  const [kinoko,setKinoko] = useState(null)

  //버섯 객체 정보 담기
  const [growing, setGrowing]         = useState([])
  const [harvest, setHarvest]         = useState([])
  const [whiteflower, setWhiteflower] = useState([])
  const [complete, setComplete]       = useState([])
  const [kinokoList, setKinokoList]   = useState([])

  //로딩 화면 대기
  const [loding, setLoding] = useState(false)

  //버섯 상태별
  const kinokoState = ['growing', 'harvest', 'whiteflower', 'complete']

  //버섯 선택 유무 판단
  const [name, setName] = useState(null)

  const [kinokoName, setKinokoName] = useState()

  const kinokoOnClick = (e) =>{
    console.log(e.target.id)
    setName(e.target.id)
  }

  const onClick = (data) =>{
    console.log("Farm 버섯 객체 누르면 해당 정보 보여주기",data);
    setKinoko(data)
  }
    //버섯 배지 이름 가져오기
  function mushroom_name (){
      
      axios.get(`${AWS_URL}${MUSHROOM_NAME}`,{
          params : {id : parseInt(value.prgInfo.prg_id)}
      }).then(data =>{
          console.log("이름 가져오기 성공",data.data)
          setKinokoName(data.data)
      }).catch(e =>{
          console.log(e);
      })
      
  }
    //4번  버섯 재배기 안 모든 버섯 객체 정보 저장
    function mushroom_all () {
      console.log("==========4. Myfarm 모든 버섯 객체 저장하기==========")
      
      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[0]}`,{
          params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setGrowing(  
              data.data
          )
      }).catch(e =>{
          console.log("자라고 있는 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[1]}`,{
          params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setHarvest(  
                data.data
          )
      }).catch(e =>{
          console.log("수확 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[2]}`,{
          params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setWhiteflower(  
                data.data
          )
      }).catch(e =>{
          console.log("백화고 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[3]}`,{
        params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setComplete(  
                data.data
          )
      }).catch(e =>{
          console.log("수확한 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
        params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setKinokoList(  
                data.data
          )

          setLoding(true)
      }).catch(e =>{
          console.log("수확한 버섯 정보 가져오기 실패",e);
          alert('아직 자라난 표고버섯이 없어요..')
          
          setLoding(1) // 해당 데이터가 없으면 myfarm페이지로 이동
      })

    }

    //3D
    const api = axios.create({
      baseURL : 'http://54.163.128.160'
    }) ;
    
    //3D
    function get3dData() {

      api.get('/api/url/ply/17').then((img_3d) => {

        const { data } = img_3d ;

        var scene = new THREE.Scene();


        const axesHelper = new THREE.GridHelper(10)

        scene.add(axesHelper)
        scene.background = new THREE.Color(0x222222) ;

        var camera = new THREE.PerspectiveCamera( 75, WIDTH/HIGHT, 0.1, 100 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( WIDTH, HIGHT );
        var light = new THREE.SpotLight();
        light.position.set(20, 20, 20)
        scene.add(light);
        element.current.appendChild( renderer.domElement );

        camera.position.z = 10 ;


        const controls = new OrbitControls(camera, renderer.domElement) ;

        loader.load(`http://54.163.128.160/api/url/ply?url=${data}`, function(geometry){

          geometry.computeVertexNormals() ;
          
          const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
          
            metalness: .25,
            roughness: 0.1,
            transparent: true,
            transmission: 1.0,
            side: THREE.DoubleSide,
            clearcoat: 1.0,
            clearcoatRoughness: .25
        });
    
          const mesh = new THREE.Mesh(geometry, material) ; 

          mesh.position.y = 0 ;
          mesh.position.x = 0 ;
          mesh.position.z = 0.3 ;


          scene.add(mesh) ;

          },(xhr) => {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
          },
          (error) => {
              console.log(error);
          }
        ) ; 
        const stats = Stats() ;

        function animate() {
          requestAnimationFrame( animate );
          stats.update() ;
          render() ;
        };

        function render() {
          renderer.render( scene, camera );
        }

        animate();

      }) ;

    }


    //마지막. 재배기 작동 상태  isValue -> 제일 마지막에 실행 isLoding -> true 화면 보이기    
  useEffect(()=>{

    console.log('===========Farm 처음 실행 상태===========');
    
 
  },[])

  useEffect(()=>{
    
    console.log('kinokoList',kinokoList);
    console.log('kinokoList',growing);
    console.log('kinokoList',harvest);
    console.log('kinokoList',whiteflower);
    console.log('kinokoList',complete);
    
  },[kinokoList])

  useEffect(()=>{
    console.log('===========Farm 처음 실행 상태===========');

    if(value.prgInfo.prg_id !== 0){
      mushroom_name()
      mushroom_all()
      get3dData() ;
    } 

  },[value.prgInfo])


  //버섯 상태별로 저장하기

  const view = {
    growing,
    harvest,
    whiteflower,
    complete, 
    kinokoList, 
    kinoko,
    kinokoOnClick,
    name,
    kinokoName
  }
  
  
    
  return(
      <>
        
        {/* 선택한 기기 버섯 정보 가져오기 */}
        <KinokoInfo />
        {/* 버섯 화면에 보이기 -> mock은 test파일 원본은 farmBox */}
        { loding ? (<FarmMock value={value} view={view} onClick={onClick}/>) : (<div>LODING....</div>)}
        
      </>
  )  
} 

export default withCookies(Farm) ;