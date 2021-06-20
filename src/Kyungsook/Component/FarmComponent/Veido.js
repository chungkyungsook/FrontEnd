import React, { useEffect, useRef, useState } from 'react' ;

import * as THREE from 'three' ;
import { PLYLoader } from '../../../../node_modules/three/examples/jsm/loaders/PLYLoader' ;
import { OrbitControls } from '../../../../node_modules/three/examples/jsm/controls/OrbitControls' ;
import Stats from '../../../../node_modules/three/examples/jsm/libs/stats.module' ;
import axios from 'axios';
import styled from 'styled-components' ;
import {
  AWS_URL,
}from '../../../Util/api';
const WIDTH = 500 ;
const HIGHT = 600 ;

const loader = new PLYLoader() ;

const Veido  = () =>{
    
    const element = useRef() ;


    useEffect(() =>{

          function get3dData() {
        
              //3D공상 만들기
              var scene = new THREE.Scene();
        
              const axesHelper = new THREE.GridHelper(10)
              scene.add(axesHelper)
              scene.background = new THREE.Color(0x222222) ;
            
              //카메라
              var camera = new THREE.PerspectiveCamera( 75, WIDTH/HIGHT, 0.1, 100 );
              
              //렌더러 정의 및 크기 지정, 문서에 추가
              var renderer = new THREE.WebGLRenderer();
              // renderer.setSize( WIDTH, HIGHT );
              // renderer.setSize( window.innerWidth/4, window.innerHeight/4, false);
              // console.log('window.innerWidth',window.innerWidth,'window.innerHeight',window.innerHeight);
              //빛 생성
              var light = new THREE.SpotLight();
              //적당한 위치에 놓기
              light.position.set(20, 20, 20)
              //생성한 모델 장면에 추가(빛)
              scene.add(light);
              element.current.appendChild( renderer.domElement );
              //카메라 뒤로 후진
              camera.position.z = 10 ;
        
        
              const controls = new OrbitControls(camera, renderer.domElement) ;
          
              //load
              loader.load(`${AWS_URL}/api/ply/1`, function(geometry){
          
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
          
              //생성한 모델 장면에 추가
              scene.add(mesh) ;
          
              }
              ,(xhr) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                  console.log(error);
              }
              //load end

            ) ; 
            const stats = Stats() ;
        
          function animate() {

            //프레임 처리
            requestAnimationFrame( animate );
            stats.update() ;
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

    return(
      <View  ref={element}>
      </View>
    )
}

const View = styled.div`
  height: 83%;
`;
export default Veido;