import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
function Logout(props, { activeUser }) {
  const _onClick = client => {
    localStorage.setItem('token', '');
    props.history.push('/');
    // props.refetch();
    client.resetStore();
  };
  return (
    <ApolloConsumer>
      {client => {
        return <button onClick={() => _onClick(client)}>logout</button>;
      }}
    </ApolloConsumer>
  );
}

export default withRouter(Logout);
