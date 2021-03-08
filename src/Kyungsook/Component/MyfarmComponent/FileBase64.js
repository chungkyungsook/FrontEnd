import React, { useEffect, useRef } from 'react'

const FileBase64 = ({image}) => {

    const canvas = useRef(null)
    
    useEffect(() =>{

        console.log("캔버스 이미지", image) ;

        console.log('canvas 화면 생성');
        if( image && canvas){
            console.log('canvas 사진 적용');
            console.log(canvas);
            setloader()
        }
    },[image])

    const setloader = () =>{
        const ctx = canvas.current.getContext('2d')
        ctx.fillRect(0, 0, 700, 706 + 70 )
        ctx.drawImage(image,0,0,100,100)
    }
    return (
    <div>
            <img
                src={canvas}
                alt='실시간 버섯 사진'
            />
    </div>
)
}

export default FileBase64