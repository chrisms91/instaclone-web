import styled from 'styled-components';

const StyledSeparator = styled.div`
  width: 100%;
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }

  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

const Separator = () => {
  return (
    <StyledSeparator>
      <div></div>
      <span>Or</span>
      <div></div>
    </StyledSeparator>
  );
};

export default Separator;
