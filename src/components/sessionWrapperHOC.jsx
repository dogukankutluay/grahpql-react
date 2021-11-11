import React from 'react';
import { Query } from 'react-apollo';
import { GET_ACTIVE_USER } from '../queries';

const sessionWrapperHOC = Component => props =>
  (
    <Query query={GET_ACTIVE_USER}>
      {({ data, loading, refetch }) => {
        if (loading) return <div>Loading</div>;
        return <Component refetch={refetch} activeUser={data} {...props} />;
      }}
    </Query>
  );
export default sessionWrapperHOC;
