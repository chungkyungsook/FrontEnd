import styled from 'styled-components';
import {NotoSansRegular} from '../css/cssModule';

const Overlay = styled.div`
    display: ${props => props.opacity && props.customId ? 'flex' : 'none'};
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 88;
`;

const ModalBox = styled.div`
    display: flex;
    position: fixed;
    background-color: white;
    width: ${props=>props.width ? props.width+'px' : '80%'};
    height: ${props=>props.height ? props.height+'px' : '80%'};
    z-index: 89;
    flex-direction: column;
    border-radius: 12px;
`;

const ModalHeader = styled.div`
    border-radius: 12px 12px 0 0;
    display: flex;
    width: 100%;
    height: 40px;
    z-index: 90;
    justify-content: flex-end;
    padding-right: 10px;
    border-bottom: 1px solid #dddddd;
    background-color: #f1f1f1;
`;

const CloseButton = styled.span`
    ${NotoSansRegular}
    font-size: 2.0em;
    user-select: none;
    cursor: pointer;
    color: rgba(0,0,0,0.5);
    &:hover {
        color: black;
    }
    transition: 0.3s;
    height: 40px;
`;

const Modal = ({opacity, onClose, children, width, height, customId}) => {

    return (
        <Overlay opacity={opacity} customId={customId} >
            <Overlay opacity={opacity} customId={customId} onClick={onClose}></Overlay>
            <ModalBox width={width} height={height}>
                <ModalHeader>
                    <CloseButton onClick={onClose}>
                        x
                    </CloseButton>
                </ModalHeader>
                {children}
            </ModalBox>
        </Overlay>
    );
};

export default Modal;