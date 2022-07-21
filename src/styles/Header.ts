import styled from "styled-components";

export const Container = styled.header`
    background: var(--gray-800);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem 0;

    a {
        text-decoration: none;
        color: var(--green-300);

        &:hover {
            color: var(--green-500);
        }
    }

    img {
        height: 2rem;
    }
`