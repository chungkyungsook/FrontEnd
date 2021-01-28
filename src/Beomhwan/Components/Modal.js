import styled from 'styled-components';

const Overlay = styled.div`
    display: ${props => props.opacity ? 'flex' : 'none'};
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
`;

const ModalBox = styled.div`
    display: ${props => props.opacity ? 'block' : 'none'};
    position: fixed;
    border: 1px solid gray;
    background-color: white;
    flex: 1;
    transform: (-50%, -50%);
`;

const Modal = ({opacity, onOverlayClick}) => {
    return (
        <Overlay opacity={opacity} onClick={onOverlayClick}>
            <ModalBox opacity={opacity}>

            </ModalBox>
        </Overlay>
    );
};

export default Modal;