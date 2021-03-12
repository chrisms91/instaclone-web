import styled from 'styled-components';

const StyledButton = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 6px 0px;
  font-weight: 600;
  width: 100%;
  border-radius: 3px;
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
