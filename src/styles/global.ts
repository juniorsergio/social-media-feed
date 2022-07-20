import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --white: #fff;
        --gray-100: #e1e1e6;
        --gray-300: #c4c4cc;
        --gray-400: #8d8d99;
        --gray-600: #323238;
        --gray-700: #29292e;
        --gray-800: #202024;
        --gray-900: #121214;
    
        --green-300: #00B37E;
        --green-500: #00875f;

        --red-500: #F75A68;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    @keyframes fadein-scale {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    body {
        background: black;//var(--gray-900);
        color: var(--gray-300);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    .react-modal-overlay {
        background: #2020249F;

        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .react-modal-content {
        margin: 0 auto;
        width: auto;
    }
`