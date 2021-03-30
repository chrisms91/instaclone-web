import { gql } from '@apollo/client';

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    totalLikes
    totalComments
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      userName
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
