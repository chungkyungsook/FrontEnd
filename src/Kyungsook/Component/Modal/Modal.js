import React, { useEffect } from 'react';
import { useKinokoState } from '../../../KinokoContext';
import "../../Css/modal.css";

const Modal = ( props ) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, onClickBtn} = props;
  const state    = useKinokoState();
  const {  isOk:isOkPwd } = state.muchinPwd; // state.data 를 users 키워드로 조회

  useEffect(()=>{
    console.log("Modal isOkPwd",isOkPwd);
  },[isOkPwd])
  
  return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={ open ? 'openModal modal' : 'modal' }>
          { open ? (  
              <section>
                  <header>
                      {header}
                      <button className="close" onClick={close}> &times; </button>
                  </header>
                  <main>
                      {props.children}
                  </main>
                  <footer>
                    {isOkPwd === 202 && <button name='makeDevice' className="close" type="button" onClick={onClickBtn}>登録</button>}
                    <button className="close" onClick={close}> close </button>
                  </footer>
              </section>
          ) : null }
      </div>
  )
}

export default Modal