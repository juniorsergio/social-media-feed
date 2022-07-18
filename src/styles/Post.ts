import styled from "styled-components";

export const Container = styled.article`
    background: var(--gray-900);
    border-radius: 8px;
    padding: 2.5rem;
    margin-top: 2rem;

    & > p {
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--gray-600);
    }

    header {
        display: flex;
        align-items: center;

        .author {
            flex: 3;
        }

        time {
            text-align: right;
            font-size: 0.875rem;
            color: var(--gray-400);
            flex: 3;
        }

        button {
            background: transparent;
            border: 0;
            color: var(--gray-400);
            cursor: pointer;
            flex: 1;

            line-height: 0;
            border-radius: 2px;

            &:hover {
                color: var(--red-500);
            }
        }
    }

    .author {
        display: flex;
        align-items: center;
        gap: 1rem;

        .authorInfo {
            display: flex;
            flex-direction: column;

            strong {
                color: var(--gray-100);
                line-height: 1.6;
            }

            span {
                color: var(--gray-400);
                font-size: 0.875rem;
                line-height: 1.6;
            }
        }
    }

    .commentList {
        margin-top: 2rem;
    }
`

