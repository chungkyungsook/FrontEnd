import axios from 'axios';
import React, { useEffect } from 'react'
import {
    AWS_URL,

}from '../../../Util/api'

const HelpList = ({setList}) =>{
    
    useEffect(()=>{
        console.log('help List');
        axios.get(`${AWS_URL}/api/list/help`).then(data =>{
            console.log(data.data);
            setList(data.data)
        }).catch(e => {
            console.log(e);
        })
    },[])

    return(
        <>
        </>
    )
}

export default HelpList;