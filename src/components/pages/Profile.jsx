import React from 'react';
import Moment from 'react-moment';
import authHOC from '../authHOC';
function Profile({ activeUser }) {
  return (
    <div>
      <h3>Profile</h3>
      <div>
        <Moment date={activeUser.activeUser.createdAt} format={'YYYY/MM/DD'} />
      </div>
      <strong>{activeUser.activeUser.username}</strong>
    </div>
  );
}

export default authHOC(activeUser => activeUser && activeUser.activeUser)(
  Profile
);
