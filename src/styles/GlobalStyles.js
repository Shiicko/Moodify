import { createGlobalStyle, keyframes } from "styled-components";

const twinkle = keyframes`
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
`;

const moveBackground = keyframes`
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 200%; }
`;

const nebulaFlow = keyframes`
    0% { transform: translate(0, 0); opacity: 0.1; }
    50% { transform: translate(10%, 5%); opacity: 0.15; }
    100% { transform: translate(0, 0); opacity: 0.1; }
`;

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
        background: radial-gradient(circle at center, #0f172a 0%, #17203b 50%, #10162a 100%);
        color: #e2e8f0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
        overflow-x: hidden;
        position: relative;
    }

    body::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
            radial-gradient(2px 2px at 20px 30px, #fff, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 40px 70px, #fff, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 120px 10px, #fff, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 150px 80px, #fff, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 180px 20px, #fff, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 200px 50px, #fff, rgba(255, 255, 255, 0));
        background-size: 200px 200px;
        animation: ${moveBackground} 120s linear infinite;
        opacity: 0.8;
        pointer-events: none;
        z-index: -2;
    }

    body::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 10% 20%, rgba(130, 170, 255, 0.05) 0%, transparent 60%),
                    radial-gradient(circle at 90% 80%, rgba(180, 200, 255, 0.07) 0%, transparent 70%),
                    radial-gradient(circle at 50% 50%, rgba(200, 150, 255, 0.03) 0%, transparent 50%);
        animation: ${nebulaFlow} 80s ease-in-out infinite alternate;
        pointer-events: none;
        z-index: -1;
    }

    .star {
        animation: ${twinkle} 2s infinite alternate;
    }

    a {
        text-decoration: none;
        color: #a7d9f7;
        transition: color 0.3s ease;
        &:hover {
            color: #d1efff;
            text-decoration: underline;
        }
    }

    ul, ol {
        list-style: none;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    input, button, textarea, select {
        font-family: 'Poppins', sans-serif;
        font-size: inherit;
    }
`;

export default GlobalStyles;
