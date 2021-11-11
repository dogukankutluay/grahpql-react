import React from 'react';
import { Query } from 'react-apollo';
import { GET_ACTIVE_USER } from '../queries';
import { Redirect } from 'react-router-dom';
const authHOC = condition => Component => props => {
  return (
    <Query query={GET_ACTIVE_USER}>
      {({ data, loading }) => {
        if (loading) return null;
        return condition(data) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    </Query>
  );
};

export default authHOC;
