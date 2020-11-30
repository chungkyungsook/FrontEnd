import React from "react";
import styled from "styled-components";

const IMG = styled.img`
    /* margin : 20px; */
    width : 100%;
    height : 55%;
`;

export default function Slide ({img}){
    return (
        <IMG src = {img} />
    )
}