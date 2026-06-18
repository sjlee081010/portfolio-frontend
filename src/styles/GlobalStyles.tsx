import { Global, css } from '@emotion/react';

const globalStyles = css`
  :root {
    /* Colors */
    --color-bg: #fff;
    --color-dark: #333;
    --color-text: #333333;
    --color-text-light: #888888;
    --color-border: #dddddd;
    --color-white: #ffffff;

    /* Font Size */
    --font-xs: 0.75rem; /* 12px */
    --font-sm: 0.875rem; /* 14px */
    --font-md: 1rem; /* 16px */
    --font-lg: 1.25rem; /* 20px */
    --font-xl: 1.5rem; /* 24px */
    --font-2xl: 2rem; /* 32px */
    --font-3xl: 3rem; /* 48px */

    /* Font Weight */
    --weight-regular: 400;
    --weight-bold: 700;

    /* Spacing */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 48px;

    /* Layout */
    --header-height: 80px;
  }

  /* reset */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  input,
  textarea {
    font: inherit;
    border: none;
    outline: none;
  }

  /* layout (vanilla: body + main + #content) */
  #root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;

export default function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
