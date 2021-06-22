import React, { useEffect, useState } from 'react' ;

import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';

import '../Css/help.css'
import kinokoImg      from '../../assets/logoHeight.png' ;
import noteBg from '../../assets/notebg.png';
import kinokoImg1 from '../../assets/kinokoImg1.png';
import kinokoImg2 from '../../assets/kinokoImg2.png';
import kinokoImg3 from '../../assets/kinokoImg3.png';
import kinokoImg4 from '../../assets/kinokoImg4.png';
import axios from 'axios';


const Help = (props) => {

    //isLogin cookie 값 확인
    //axios 값 담기
    const [mushroomList, setMushroomList] = useState(false)
    const [kinokoInfo, setKinokoInfo] = useState(false)
    //해당 버튼 클릭시 정보 보여주기
    const onClick = (data) =>{
        console.log("help data",data);
        setKinokoInfo(data)
    }
    
    useEffect(()=>{
        let api = '/dummy/KinokoInfo.json'
        const data = axios.get(api)

        data.then( data =>{
            console.log('data',data.data.kinokos);
            setMushroomList(data.data.kinokos)
            setKinokoInfo(data.data.kinokos[0])
        })

    },[])

    // useEffect(()=>{
    //     console.log('help main',mushroomList);
    //     mushroomList.map(data => ( data.id === 1 && setKinokoInfo(data)))
    // },[mushroomList])

    if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>
    if(!mushroomList) {
        return(
            <div className='help-wrap'>
                <div className='inner'>Loding...</div>
            </div>
            )
    }
    return (
        <>
        <div className='help-wrap'>
          <div className='inner'>
          
            <div className='help-left'>

              <div className='kinoko-info-group'>
                <div className='info-img-box'>
                  
                  <div className='info-img'>
                    <img src={kinokoInfo.thumbnail} alt={kinokoInfo.title}/>
                  </div>
                  <div className='info-title'> &#60;{kinokoInfo.title} &#62;</div>
                  <div className='info-list'>
                      <div className='list-wrap'>
                        <h1>개요</h1>
                        <span className='list-text'>
                            {kinokoInfo.list}
                        </span>
                        <h1>맛</h1>
                        <span className='list-taste'>
                            {kinokoInfo.taste}
                        </span>
                      </div>
                  </div>
                  <img src={kinokoImg} draggable="false" alt='logoimg' className='logo-img'/>

                </div>
              </div>

              <div className='info-box'>
                  <div className='infoBtn-box'>
                    {mushroomList && mushroomList.map(
                        data =>(
                            console.log('datat',data),
                            <div className='kinoko-info' onClick={()=> onClick(data)}>
                                <img src={data.thumbnail} alt={data.title}/>
                            </div>        
                        )
                    )}
                    
                    
                  </div>
              </div>
            </div>


            <div className='help-right'>
              
              <div className='right-wrap'>
                <img src={noteBg}  draggable='false'alt='Note' className='note-img'/>
                <img src={noteBg}  draggable='false' alt='Note' className='note-img'/>
                
                <div className='text-wrap'>
                  <h1 clasName='help-title'>재배기 사용 방법!</h1>
                  <div className='kinokoImg1-text'>1. 재배기에 표고버섯 배지를 넣습니다.</div>
                  <img src={kinokoImg1} alt='kinokoImg1' className='kinokoImg1'/>
                  <img src={kinokoImg2} alt='kinokoImg2' className='kinokoImg2'/>
                  <div className='kinokoImg2-text'>2. 마이 팜 페이지에 해당 재배기 정보를 등록합니다.(재배기 PIN 번호, 패스워드)</div>
                  <div className='kinokoImg3-text'>3. 팜 환경 설정 페이지에서 표고버섯을 키울 환경을 직접 설정합니다.</div>
                  <img src={kinokoImg3} alt='kinokoImg3' className='kinokoImg3'/>
                  <img src={kinokoImg4} alt='kinokoImg4' className='kinokoImg4'/>
                  <div className='kinokoImg4-text'>4. 팜 정보 페이지에서 표고버섯의 성장 정보를 볼 수 있습니다.</div>
                </div>
              </div>
            </div>


          </div>
        </div>
        </>
    );
};

export default withCookies(Help) ;