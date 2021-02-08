import React from 'react' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import KinokoInfo from '../Component/FarmComponent/KinokoInfo';



const Farm = (props) => {
  return(
      <>
        <KinokoInfo/>
      </>
  )  
} 

export default withCookies(Farm) ;