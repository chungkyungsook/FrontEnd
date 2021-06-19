import {css} from 'styled-components';

export const BoxShadowTrick = css`
    box-shadow: 5px 5px 5px #dddddd;
    font-size: 0.9em;
    &:active {
        font-size: 0.85em;
        box-shadow: inset -5px 5px 5px #dddddd;
    }
    transition: box-shadow 0.1s ease-in;
`;

export const SvgSize = css`
    width: 30px;
    height: 30px;
`;

export const NotoSansRegular = css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Potta+One&display=swap');
    font-family: 'Noto Sans KR', sans-serif;
`;

export const NotoSansLight = css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap');
    font-family: 'Noto Sans KR', sans-serif;
`;