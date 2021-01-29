import React from "react";
import '../../Css/modal.css';

const Modal = (props) =>{
    //열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const {open, close,header,setTest, makeBtn} = props;

    return(
        <div className={open ? 'openModal modal' : 'modal'}>
            {
                open ?
                (<section>
                    <header>
                        {header}
                        <button className='close' onClick={close}>&times;</button>
                    </header>
                    <main>
                        {props.children}
                        {setTest(5)}
                    </main>
                    <footer>
                        {makeBtn && <button  className="getKey">등록</button>}
                    </footer>
                </section>) 
                : 
                null
            }
        </div>
    )
}

export default Modal