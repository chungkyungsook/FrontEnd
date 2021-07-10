// import './App.css' ;
import { useState, useEffect, useRef } from 'react' ;
import * as THREE from 'three' ;
import { PLYLoader } from '../../../../node_modules/three/examples/jsm/loaders/PLYLoader' ;
import { CSS3DRenderer, CSS3DObject } from '../../../../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
// import { TrackballControls } from '../node_modules/three/examples/jsm/controls/OrbitControls' ;
import { TrackballControls } from '../../../../node_modules/three/examples/jsm/controls/TrackballControls'
import { DragControls } from '../../../../node_modules/three/examples/jsm/controls/DragControls'
import Stats from '../../../../node_modules/three/examples/jsm/libs/stats.module' ;
import styled from 'styled-components' ;

// import { io } from 'socket.io-client' ;
import axios from 'axios';

const Wrapper = styled.div`
  display : flex ;

  align-items : center ;
  justify-content : center ;

`;

const Container = styled.div`
  height: 67%;
`;

const Button = styled.button`
  all : unset ;
  
  width : 30px ;
  height : 30px ;

  background-color : red ;
  
  position : absolute ;
  
  left : 50% - 15px ;
  top : 50% - 15px ;
  /* z-index : 9999 ; */
`;

const moveFace = {
  
} ;

// three js width, height
const WIDTH = window.innerWidth ;
const HIGHT = window.innerHeight ;

const FACEWIDTH = 480 ;
const FACEHEIGHT = 360 ;

const loader = new PLYLoader() ;

function VeidoMushroom() {
  const element = useRef() ;

    useEffect(() =>{

          function get3dData() {
        
              //3D공상 만들기
              var scene = new THREE.Scene();
        
              // const axesHelper = new THREE.GridHelper(10)
              // scene.add(axesHelper)
              scene.background = new THREE.Color(0xfffffff) ;
            
              //카메라
              var camera = new THREE.PerspectiveCamera( 75, WIDTH/HIGHT, 0.1, 200 );
              //카메라 뒤로 후진
              camera.position.set(0, 0, 0.3);
              
              //렌더러 정의 및 크기 지정, 문서에 추가
              var renderer = new THREE.WebGLRenderer() ;
              renderer.setSize( WIDTH, HIGHT ) ;

              //빛 생성
              var light = new THREE.SpotLight() ;
              //적당한 위치에 놓기
              light.position.set(20, 20, 20)
              //생성한 모델 장면에 추가(빛)
              scene.add(light);
              element.current.appendChild( renderer.domElement );
        
              const controls = new TrackballControls(camera, renderer.domElement) ;
              controls.rotateSpeed = 2 ;
          
              //load 1
            loader.load(`/3dScan0.ply`, function(geometry){
          
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
            }) ;
            
              const mesh1 = new THREE.Mesh(geometry, material) ; 
          
              mesh1.position.y = 0 ;
              mesh1.position.x = 0 ;
              mesh1.position.z = 0.41 ;
          
              //생성한 모델 장면에 추가
              scene.add(mesh1) ;
          
              }
              ,(xhr) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                  console.log(error);
              }
              //load end

            ) ; 
            //load 2
            loader.load(`/3dScan90.ply`, function(geometry){
          
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
            }) ;
            
              const mesh1 = new THREE.Mesh(geometry, material) ; 
          
              mesh1.position.y = 0 ;
              mesh1.position.x = -0.345 ;
              mesh1.position.z = 0.045 ;

              mesh1.rotation.y = -1.5 ;
          
              //생성한 모델 장면에 추가
              scene.add(mesh1) ;
          
              }
              ,(xhr) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                  console.log(error);
              }
              //load end

            ) ;
            //load 3
            loader.load(`/3dScan180.ply`, function(geometry){
          
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
            }) ;
            
              const mesh1 = new THREE.Mesh(geometry, material) ; 
          
              mesh1.position.y = 0 ;
              mesh1.position.x = 0.09 ;
              mesh1.position.z = -0.33 ;

              mesh1.rotation.y = 3 ;
          
              //생성한 모델 장면에 추가
              scene.add(mesh1) ;
          
              }
              ,(xhr) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                  console.log(error);
              }
              //load end

            ) ;
            //load 4
            loader.load(`/3dScan270.ply`, function(geometry){
          
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
            }) ;
            
              const mesh1 = new THREE.Mesh(geometry, material) ; 
          
              mesh1.position.y = 0 ;
              mesh1.position.x = 0.39 ;
              mesh1.position.z = 0.08 ;

              mesh1.rotation.y = 1.5 ;
          
              //생성한 모델 장면에 추가
              scene.add(mesh1) ;
          
              }
              ,(xhr) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                  console.log(error);
              }
              //load end

            ) ;

          function animate() {
            //프레임 처리
            controls.update() ;
            requestAnimationFrame( animate );
            render() ;
          };
        
          function render() { // 랜더링 수행
            renderer.render( scene, camera );
          }

          //최초에 한번은 수행
          animate();
            }
         get3dData() ;
    },[])

  return (
    
        <Container ref={element}>
        </Container>
    
  );
}

export default VeidoMushroom;
