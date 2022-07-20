import styled from "styled-components";

export const Container = styled.div`
    img {
        height: 6em;
        padding: 1.5em;
        will-change: filter;

        &:hover {
            filter: drop-shadow(0 0 2em #61dafbaa);
        }
    }

    @keyframes logo-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    }
`