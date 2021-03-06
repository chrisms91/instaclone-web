import { useReactiveVar } from '@apollo/client';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { disableDarkMode, enableDarkMode, isDarkModeVar } from '../../apollo';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
  svg {
    color: ${(props) => (props.darkMode ? '#e3b624' : '#3b3a36')};
  }
`;

const AuthLayout = ({ children }) => {
  const darkMode = useReactiveVar(isDarkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn
          onClick={darkMode ? disableDarkMode : enableDarkMode}
          darkMode={darkMode}
        >
          {darkMode ? 'Light Mode ' : 'Dark Mode '}
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
};

export default AuthLayout;
