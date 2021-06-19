import React from 'react';
import styled from 'styled-components';
import { flexAlign } from '../../Util/css';

const Input = styled.input`
    width: 300px;
    height: 40px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    &:focus {
        outline: none;
        border: 1px solid #7FDBDA;
    }
    padding: 0 10px 0 10px;
`;

const InputPrgName = ({onChange}) => {
    return (
        <Input 
            onChange={onChange}
            placeholder="프로그램 이름을 등록해주세요"
        />
    );
};

export default InputPrgName;