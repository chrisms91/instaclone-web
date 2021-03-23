import styled from 'styled-components';

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

const StyledNotification = styled.div`
  font-weight: 600;
  color: #2ecc71;
  margin-top: 10px;
`;

export const Notification = ({ message }) => {
  return message === '' || !message ? null : (
    <StyledNotification>{message}</StyledNotification>
  );
};
