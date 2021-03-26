import PropTypes from 'prop-types';
import styled from 'styled-components';
import Comment from './Comment';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 10px;
  font-weight: 600;
  margin: 10px 0px;
  display: block;
`;

const Comments = ({ author, caption, totalComments, comments }) => {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {totalComments === 1 ? '1 comment' : `${totalComments} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.userName}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
};

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  totalComments: PropTypes.number.isRequired,
};

export default Comments;
