import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;

    animation: fadein 3s;
`
const size = '50vmin'

export const YinYang = styled.div`   
    width: ${size};
    height: ${size};
    border-radius: 50%;
    background: linear-gradient(black 50%, white 0);
    
    display: flex;
    align-items: center;

    animation: rotate 2s linear infinite;

    @keyframes yinyang {
        to { transform: scale(1.5) }
    }

    @keyframes rotate {
        to { transform: rotate(1turn) }
    }
    
    &:before, &:after {
        flex: 1;
        height: calc(${size}/6);
        border-radius: 50%;
        background: black;
        content: '';
        border: solid calc(${size}/6) white;

        transform-origin: 0 50%;
        transform: scale(0.5);
        animation: yinyang 1s ease-in-out infinite alternate;
    }

    &:after {
        background: white;
        border-color: black;

        transform-origin: 100% 50%;
        animation-delay: -1s;
    }
`