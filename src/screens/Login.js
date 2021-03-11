import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
    </Container>
  );
};

export default Login;
