import styled from 'styled-components';
import {flexAlign} from '../../Util/css';
import {NotoSansRegular, NotoSansLight} from '../css/cssModule';
import {Chart as PyogoChart} from '../Routes/Pyogo';
import {BaekhwagoChart as BaekhwaChart} from '../Routes/Baekhwago';

// ---------모달 스타일--------------
export const ModalTitleBox = styled.div`
    ${flexAlign}
    ${NotoSansRegular}
    width: 100%;
    height: 40px;
    user-select: none;
    font-size: 1.2em;
`;

export const ModalTextBox = styled.p`
    ${flexAlign}
    ${NotoSansLight}
    width: 100%;
    height: 30px;
`;

const ModalEnvText = styled.p`
    ${NotoSansLight}
    width: 100%;
    height: 30px;
    margin: 0 0 0 20px;
`;

const ModalContentBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ModalChartBox = styled.div`
    width: 70%;
    height: 55vh;
`;

const ModalEnvInfoBox = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
`;

export const ModalFooter = styled.div`
    width: 100%;
    height: 60px;
    margin-top: 20px;
    ${flexAlign}
`;

export const Button = styled.button`
    ${NotoSansRegular}
    width: 80px;
    height: 50px;
    margin: 0 10px 0 10px;
    background-color: white;
    border: 1px solid #dddddd;
    border-radius: 10px;
    &:focus{
        outline: none;
    };
    cursor: pointer;
    color: rgba(0,0,0,0.7);
`;

// =========모달 스타일==============

const ModalContent = ({chartname, text, onClose}) => {

    return (
        <>
        <ModalTitleBox>
            {text.title}
        </ModalTitleBox>
        <ModalTextBox>
            {text.caution1}
        </ModalTextBox>
        <ModalTextBox>
            {text.caution2}
        </ModalTextBox>
        <ModalContentBox>
            <ModalChartBox>
                {chartname === 'pyogo' ? <PyogoChart /> : <BaekhwaChart/>}
            </ModalChartBox>
            <ModalEnvInfoBox>
                <ModalEnvText>
                    {text.waterText}
                </ModalEnvText>
                <ModalEnvText>
                    {text.sunText}
                </ModalEnvText>
            </ModalEnvInfoBox>
        </ModalContentBox>
        <ModalFooter>
            <Button onClick={onClose}> 적용 </Button>
            <Button onClick={onClose}> 취소 </Button>
        </ModalFooter>
        </>
    );
}

export default ModalContent;