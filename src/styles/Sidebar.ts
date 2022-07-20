import styled from "styled-components";

export const Container = styled.aside`
    background: var(--gray-800);
    border-radius: 8px;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 72px;
        object-fit: cover;
        background: var(--gray-300);
    }

    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: calc(0px - 1.5rem - 6px);

        strong {
            margin-top: 1rem;
            color: var(--gray-100);
            line-height: 1.6;
        }

        span {
            font-size: 0.875rem;
            color: var(--gray-400);
            line-height: 1.6;
        }
    }

    footer {
        border-top: 1px solid var(--gray-600);
        margin-top: 1.5rem;
        padding: 1.5rem 2rem 2rem;
        display: flex;
        justify-content: center;

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            
            background: transparent;
            color: var(--green-500);
            font-weight: bold;

            border: 1px solid var(--green-500);
            border-radius: 8px;

            height: 50px;
            padding: 0 1.5rem;

            transition: all 0.1s;

            &:hover {
                background: var(--green-500);
                color: var(--white);
                cursor: pointer;
            }
        }
    }
`