import styled from "styled-components";

export const Container = styled.img`   
    border-radius: 8px;
    background: var(--gray-300);
    width: 4rem;
    height: 4rem;

    @media (max-width: 768px) {
        width: 3rem;
        height: 3rem;
    }

    &.withBorder {
        width: calc(4rem + 12px);
        height: calc(4rem + 12px);
        border: 4px solid var(--gray-800);
        outline: 2px solid var(--green-500);

        @media (max-width: 768px) {
            width: calc(3rem + 12px);
            height: calc(3rem + 12px);
        }
    }
`