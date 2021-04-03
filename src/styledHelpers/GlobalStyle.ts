import styled, { createGlobalStyle } from 'styled-components';
import { colorStack } from '../styledHelpers/colorStack';

export const GlobalStyle = createGlobalStyle`

    html {
        font-size: 16px;
        font-family: "Roboto";
        color: ${colorStack.white};
    }

    strong, b {
        font-weight: 700;
    }

    ::-webkit-scrollbar {
        background: transparent;
    }

    ::-webkit-scrollbar {
        width: 7px;
    }

    ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }
`;

export const SubmitWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        padding: 1rem 1.25rem;
        margin: 0px 0px 1.25rem;
        background: transparent;
        border: 2px solid ${colorStack.white};
        outline: none;
        appearance: none;
        font-size: 1rem;
        font-family: Inter;
        border-radius: 4px;
        width: 90%;
        max-width: 800px;
        color: ${colorStack.white};
    }
`;