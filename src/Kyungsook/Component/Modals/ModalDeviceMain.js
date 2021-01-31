import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DeviceModal from './DeviceModal';
import { withCookies} from 'react-cookie';

const ModalDeviceMain = (props)=> {
    //useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOnpen] = useState(false)
    const {userDeviceInfo,deviceNum} = props
    //url
    const url = '172.26.3.62'


    //Modal확인
    const openModal = () =>{
        setModalOnpen(true);
    }

    const closeModal = () =>{
        setModalOnpen(false)
    }

    
    return(
        <div>
            {/* 등록된 기기 출력 */}
            {
                userDeviceInfo.map(data=>(
                    
                    <div className = "item1Button" onClick={openModal}>
                        {data.machine_name} 
                    </div>
                    ))
            }

            {/* header부분에 텍스트를 입력한다. */}
            <DeviceModal open={modalOpen} close={closeModal} header="기기 관리" >


                {/* Modal.js <main> {props.childern}</main> 에 내용이 입력된다.*/}
                <div>
                    <div className="textStyle">선택 및 삭제를 선택해 주세요</div>
                    <div className="textStyle">해당 기기를 삭제하면 그전에 기록한 정보들은</div>
                    <div className="textStyle">"전부" 사라집니다</div>
                </div>

            </DeviceModal>
        </div>
    )

}
export default withCookies(ModalDeviceMain)
