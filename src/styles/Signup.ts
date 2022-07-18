import styled from "styled-components";

export const Container = styled.form`
    margin: 10vh auto;
    padding: 2rem;

    background: var(--gray-600);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 500px;
    height: 80vh;

    @media (max-width: 768px) {
        width: auto;
    }

    input {
        background: var(--gray-900);
        color: var(--gray-100);

        width: 70%;

        border-radius: 8px;
        border: 0;
        padding: 1rem;

        &:focus {
            outline: transparent;
            box-shadow: 0 0 0 2px var(--green-500);
        }
    }

    .avatarSelector {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        .avatarImgs {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            width: 80%;

            img {
                flex-basis: 20%;
                transition: border 0.2s;
            }

            img:hover:not(.withBorder) {
                border: 2px solid var(--green-500);
                cursor: pointer;
            }
        }
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