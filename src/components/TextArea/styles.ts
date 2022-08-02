import styled from "styled-components";

export const Container = styled.form`
    width: 100%;

    strong {
        line-height: 1.6;
        color: var(--gray-100);
    }

    textarea {
        width: 100%;
        background: var(--gray-800);
        border: 0;
        resize: none;
        height: 6rem;
        padding: 1rem;
        border-radius: 8px;
        color: var(--gray-100);
        line-height: 1.4;
        margin-top: 1rem;

        &:focus {
            outline: transparent;
            box-shadow: 0 0 0 2px var(--green-500);
        }
    }

    footer {
        visibility: hidden;
        max-height: 0;
    }

    &:focus-within footer {
        visibility: visible;
        max-height: none;
    }

    button[type=submit] {
        padding: 1rem 1.5rem;
        margin-top: 1rem;
        border-radius: 8px;
        border: 0;
        background: var(--green-500);
        color: var(--white);
        font-weight: bold;
        cursor: pointer;

        transition: background-color 0.1s;

        &:not(:disabled):hover {
            background: var(--green-300);
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }
`