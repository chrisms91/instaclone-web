import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FatText } from '../shared';
import Avatar from '../Avatar';
import { gql, useMutation } from '@apollo/client';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const UserName = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Comments = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 10px;
  font-weight: 600;
  margin: 10px 0px;
  display: block;
`;

const Photo = ({
  id,
  user,
  file,
  isLiked,
  totalLikes,
  caption,
  totalComments,
  comments,
}) => {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment UpdateLikeCache on Photo {
          isLiked
          totalLikes
        }
      `;

      // read data from the cache
      const photoCache = cache.readFragment({
        id: fragmentId,
        fragment,
      });

      if ('isLiked' in photoCache && 'totalLikes' in photoCache) {
        const {
          isLiked: cacheIsLiked,
          totalLikes: cacheTotalLikes,
        } = photoCache;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cacheIsLiked,
            totalLikes: cacheIsLiked
              ? cacheTotalLikes - 1
              : cacheTotalLikes + 1,
          },
        });
      }
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <UserName>{user.userName}</UserName>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{totalLikes === 1 ? '1 like' : `${totalLikes} likes`}</Likes>
        <Comments>
          <Comment>
            <FatText>{user.userName}</FatText>
            <CommentCaption>{caption}</CommentCaption>
          </Comment>
          <CommentCount>
            {totalComments === 1 ? '1 comment' : `${totalComments} comments`}
          </CommentCount>
        </Comments>
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  totalLikes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  totalComments: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Photo;
