import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useKinokoState } from '../../../KinokoContext';
import "../../Css/modal.css";

const ModalDel = ( props ) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, onSetMuchin, onDelMuchin} = props;
  const state    = useKinokoState();
  const {  error: errSetting, isOk:isOkSetting } = state.muchinSetting; // state.data 를 users 키워드로 조회
  const {  error: errDelete, isOk:isOkDelete } = state.muchinDelete; // state.data 를 users 키워드로 조회

  useEffect(()=>{
    if(errSetting ) {
        swal('選択に失敗しました。。。')
        close('3')
    }else if(isOkSetting === 202) {
        swal('選択できました。:)')
        close(isOkSetting)
    }else if(errDelete) {
        swal('削除にしっぱいしました。。。')
        close('3')
    }else if(isOkDelete === 202) {
        swal('削除しました。 :)')
        close(isOkDelete)
    }

  },[errSetting,isOkSetting,close,errDelete,isOkDelete])
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
                    <button className="close" onClick={onSetMuchin}> 私用 </button>
                    <button className="close" onClick={onDelMuchin}> 削除 </button>
                  </footer>
              </section>
          ) : null }
      </div>
  )
}

export default ModalDel