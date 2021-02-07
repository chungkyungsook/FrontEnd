import React from "react";
import '../../Css/modal.css';

const Modal = (props) =>{
    //열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const {open, close,header,choiceOnClick} = props;

    return(
        <div className={open ? 'openModal modal' : 'modal'}>
            
                <section>
                    <header>
                        {header}
                        <button className='close' onClick={close}>&times;</button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer className="btnCenter">
                        <button name='ChoiceDevice' className="device"type="button" onClick={choiceOnClick} >선택</button>
                        <button name='DeleteDevice' className="device"type="button" onClick={choiceOnClick}>삭제</button>
                    </footer>
                </section>
                
        </div>
    )
}

export default Modal