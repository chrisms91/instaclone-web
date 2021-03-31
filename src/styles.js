import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme = {
  accent: '#0095f6',
  bgColor: '#FAFAFA',
  borderColor: 'rgb(219, 219, 219)',
  fontColor: 'rgb(38, 38, 38)',
  boxColor: '#FAFAFA',
};

export const darkTheme = {
  // accent: '#0095f6',
  accent: 'rgb(0, 121, 211)',
  bgColor: 'rgb(0, 0, 0)',
  borderColor: 'rgb(52, 53, 54)',
  //fontColor: 'rgb(129, 131, 132)',
  fontColor: 'rgb(215, 218, 220)',
  boxColor: 'rgb(26, 26, 27)',
};

// Global Styles Here
export const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  input {
    all: unset;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => props.theme.fontColor}
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
