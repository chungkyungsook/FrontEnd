import axios from 'axios';
import React, { useEffect } from 'react'

const HelpList = ({setList}) =>{
    const url = "http://localhost:3000/dummy/KinokoInfo.json";

    useEffect(()=>{
        console.log('help List');
        axios.get(url).then(data => {
            console.log("helpList",data.data.kinokos);
            setList(data.data.kinokos)
        }).catch(e =>{
            console.log("helpList erorr",e);
        })    
    },[])

    return(
        <>
        </>
    )
}

export default HelpList;