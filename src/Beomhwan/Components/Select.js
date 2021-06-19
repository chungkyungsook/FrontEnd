import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../Util/css';
import {BoxShadowTrick, SvgSize} from '../css/cssModule';
import { BiMinus, BiPlus } from 'react-icons/bi';

const PlusIcon = styled(BiPlus)`
    ${SvgSize};
    color: #BBBBBB;
`;
const MinusIcon = styled(BiMinus)`
    ${SvgSize};
    color: #BBBBBB;
`;

const Container = styled.div`
    ${flexAlign};
`;

const SelectBox = styled.div`
    height: 80px;
    ${flexAlign};
    flex-direction: column;
    margin: 0 10px 0 10px;
`;

const SelectEnvi = styled.div`
    flex: 1;
    ${flexAlign};
`;

const UpDown = styled.button`
    flex: 1;
    ${flexAlign};
    background-color: white;
    width: 40px;
    height: 40px;
    border: 1px solid #dddddd;
    border-radius: 40px;
    user-select: none;
    cursor: pointer;
    ${BoxShadowTrick};
`;

const NumBox = styled.div`
    width: 40px;
    height: 40px;
    font-size: 1.2em;
    ${flexAlign};
    margin: 0 10px 0 10px;
`;

const Select = ({count, sunChange, waterChange}) => {
    console.log(count);
    return (
        <Container>
            <SelectBox>
                <div>일조 횟수</div>
                <SelectEnvi>
                <UpDown onClick={() => sunChange('-')}> <MinusIcon /> </UpDown>
                <NumBox>{count.sunCount}번</NumBox>
                <UpDown onClick={() => sunChange('+')}> <PlusIcon /> </UpDown>
                </SelectEnvi>
            </SelectBox>
            <SelectBox>
                <div>물 주기 횟수</div>
                <SelectEnvi>
                <UpDown onClick={() => waterChange('-')}> <MinusIcon /> </UpDown>
                <NumBox>{count.waterCount}번</NumBox>
                <UpDown onClick={() => waterChange('+')}> <PlusIcon /> </UpDown>
                </SelectEnvi>
            </SelectBox>
        </Container>
    );
};

export default Select;