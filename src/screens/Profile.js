import styled from 'styled-components';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { PHOTO_FRAGMENT } from '../fragments';
import { FatText } from '../components/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../components/auth/Button';
import PageTitle from '../components/PageTitle';
import useUser from '../hooks/useUser';

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const Column = styled.div``;

const UserName = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 18px;
`;

const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileButton = styled(Button).attrs({
  as: 'span',
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      firstName
      lastName
      userName
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowings
      totalFollowers
      isFollowing
      isMe
    }
  }
  ${PHOTO_FRAGMENT}
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
    }
  }
`;

const Profile = () => {
  const { userName } = useParams();
  const { data: loggedInUserData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });

  // 2 ways to update cache using update and onCompleted
  // onCompleted doesn't provide cache argument

  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok, error },
      },
    } = result;
    if (!ok) {
      console.log(error);
      return;
    }

    // reduce number of target user's followers
    cache.modify({
      id: `User:${userName}`,
      fields: {
        isFollowing(cachedIsFollowing) {
          return false;
        },
        totalFollowers(cachedTotalFollowers) {
          return cachedTotalFollowers - 1;
        },
      },
    });

    // reduce number of current logged in user's followings
    const {
      me: { userName: loggedInUserName },
    } = loggedInUserData;
    cache.modify({
      id: `User:${loggedInUserName}`,
      fields: {
        totalFollowings(cachedTotalFollowings) {
          return cachedTotalFollowings - 1;
        },
      },
    });
  };

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    update: unfollowUserUpdate,
  });

  const followUserCompleted = (data) => {
    const {
      followUser: { ok, error },
    } = data;
    if (!ok) {
      console.log(error);
      return;
    }

    // increase number of target user's followers
    const { cache } = client;
    cache.modify({
      id: `User:${userName}`,
      fields: {
        isFollowing(cachedIsFollowing) {
          return true;
        },
        totalFollowers(cachedTotalFollowers) {
          return cachedTotalFollowers + 1;
        },
      },
    });

    // increase number of current logged in user's followings
    const {
      me: { userName: loggedInUserName },
    } = loggedInUserData;
    cache.modify({
      id: `User:${loggedInUserName}`,
      fields: {
        totalFollowings(cachedTotalFollowings) {
          return cachedTotalFollowings + 1;
        },
      },
    });
  };

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    onCompleted: followUserCompleted,
  });

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileButton>Edit Profile</ProfileButton>;
    }
    if (isFollowing) {
      return <ProfileButton onClick={unfollowUser}>Unfollow</ProfileButton>;
    } else {
      return <ProfileButton onClick={followUser}>Follow</ProfileButton>;
    }
  };

  return (
    <div>
      <PageTitle
        title={
          loading ? 'Loading...' : `${data?.seeProfile?.userName}'s profile`
        }
      />

      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <UserName>{data?.seeProfile?.userName}</UserName>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowings}</Value> followings
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {'  '}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo) => (
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.totalLikes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.totalComments}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
