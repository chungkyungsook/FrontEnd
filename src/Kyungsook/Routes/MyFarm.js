import React,{useState,useEffect, useRef} from 'react' ;
import '../Css/MyFarm.css';
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import axios from 'axios';

 // 해당 페이지 보여주기

import {format} from 'date-fns';
import { da } from 'date-fns/locale';
import { concat } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import io from 'socket.io-client'
import MyFarmComponent from '../Component/MyFarmComponent';
import swal from 'sweetalert';


import {
  AWS_URL,
  LOGOUT
}from '../../Util/api'

export default function MyFarm(){


  if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>

  return(
      <>
        <div className='myfarm-wrap'>
          <div className='inner'>
            <div>
              <div>Myfarm</div>
            </div>
          </div>
        </div>
      </>
  )

}
