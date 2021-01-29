import styled from 'styled-components';
import {useEffect} from 'react';

const Overlay = styled.div`
    display: ${props => props.opacity ? 'flex' : 'none'};
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 0;
`;

const ModalBox = styled.div`
    display: ${props => props.opacity ? 'block' : 'none'};
    position: fixed;
    border: 1px solid gray;
    background-color: white;
    width: 500px;
    height: 200px;
    z-index: 10;
`;

const Modal = ({opacity, onOverlayClick}) => {

    useEffect(() => {
        opacity ? 
            document.body.style.overflow = "hidden" : 
            document.body.style.overflow = "auto"
    },[opacity]);

    return (
        <Overlay opacity={opacity} onClick={onOverlayClick} >
            <ModalBox opacity={opacity}>
                <button onClick={() => alert('clicked')}>click</button>
            </ModalBox>
        </Overlay>
    );
};

export default Modal;