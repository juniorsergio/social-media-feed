import styled from "styled-components";

export const Container = styled.div`
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
`

export const CommentBox = styled.div`
    flex: 1;

    footer {
        margin-top: 1rem;

        button {
            background: transparent;
            border: 0;
            border-radius: 2px;
            color: var(--grey-400);
            cursor: pointer;

            display: flex;
            align-items: center;
            gap: 0.5rem;

            &:hover {
                color: var(--green-300);
            }
        }
    }
`

export const CommentContent = styled.div`
    background: var(--gray-700);
    border-radius: 8px;
    padding: 1rem;

    header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .authorAndTime {
            display: flex;
            flex-direction: column;

            strong {
                font-size: 0.875rem;
                line-height: 1.6;
            }

            time {
                font-size: 0.75rem;
                line-height: 1.6;
                color: var(--gray-400);
            }
        }

        button {
            background: transparent;
            border: 0;
            color: var(--gray-400);
            cursor: pointer;

            line-height: 0;
            border-radius: 2px;

            &:hover {
                color: var(--red-500);
            }
        }
    }

    p {
        margin-top: 1rem;
        color: var(--grey-300);
    }
`