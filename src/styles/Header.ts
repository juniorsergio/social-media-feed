import styled from "styled-components";

export const Container = styled.header`
    background: var(--gray-800);
    display: flex;
    justify-content: center;
    padding: 1.25rem;

    a {
        text-decoration: none;
        color: var(--green-300);
        display: flex;
        align-items: center;
        gap: 0.25rem;

        &:hover {
            filter: opacity(0.8);
        }

        img {
            height: 2rem;
        }
    }
`