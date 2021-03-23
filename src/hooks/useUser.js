import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

const ME_QUERY = gql`
  query me {
    me {
      userName
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken, // skip this query if the user doesn't have token
  });
  useEffect(() => {
    // if there is a token on the lcoal storage but token is not valid, log out the user.
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return;
};

export default useUser;
