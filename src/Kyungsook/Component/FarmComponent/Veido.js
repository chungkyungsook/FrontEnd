import React, { useEffect, useRef, useState } from 'react' ;

import * as THREE from 'three' ;
import { PLYLoader } from '../node_modules/three/examples/jsm/loaders/PLYLoader' ;
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls' ;
import Stats from '../node_modules/three/examples/jsm/libs/stats.module' ;
import axios from 'axios';

const WIDTH = 500 ;
const HIGHT = 700 ;

const loader = new PLYLoader() ;

const Veido  = () =>{
    
    const element = useRef() ;


    useEffect(() =>{

        const api = axios.create({
            baseURL : 'http://54.163.128.160'
          }) ;
          
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
        
          get3dData() ;
    },[])
  
}


export default Veido;