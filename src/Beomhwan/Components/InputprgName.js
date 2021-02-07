import React from 'react';
import styled from 'styled-components';
import { flexAlign } from '../../Util/css';

const InputBox = styled.div`
    ${flexAlign};
    width: 200px;
    height: 40px;
    border: 1px solid gray;
    padding: 10px;
`;

const Input = styled.input`
    flex: 1;
    height: 100%;
    border: none;
    &:focus{
        outline: none;
    }
`;

const InputPrgName = ({onChange}) => {
    return (
        <InputBox>
            <Input 
                onChange={onChange}
                placeholder="프로그램 이름을 등록해주세요"
            />
        </InputBox>
    );
};

export default InputPrgName;