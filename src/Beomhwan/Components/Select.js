import React from 'react';
import styled from 'styled-components';

const SelectBox = styled.div`
    width: 160px;
    height: 60px;
    border: 1px solid gray;
    display: flex;
    flex-direction: row;
`;

const SelectEnvi = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UpDown = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
`;

const NumBox = styled.div`
    width: 100%;
    flex: 1;
    border: 1px solid gray;
    align-items: center;
`;


const Select = ({count, sunChange, waterChange}) => {
    console.log(count);
    return (
        <SelectBox>
            <SelectEnvi>
                <UpDown onClick={() => sunChange('+')}> + </UpDown>
                <NumBox>{count.sunCount}번</NumBox>
                <UpDown onClick={() => sunChange('-')}> - </UpDown>
            </SelectEnvi>
            <SelectEnvi>
                <UpDown onClick={() => waterChange('+')}> + </UpDown>
                <NumBox>{count.waterCount}번</NumBox>
                <UpDown onClick={() => waterChange('-')}> - </UpDown>
            </SelectEnvi>
        </SelectBox>
    );
};

export default Select;