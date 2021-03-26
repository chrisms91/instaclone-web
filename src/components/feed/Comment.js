import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FatText } from '../shared';

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const Comment = ({ author, payload }) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: payload.replace(/#[\w]+/g, '<mark>$&</mark>'),
        }}
      />
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
