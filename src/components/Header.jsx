import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
function Header({ activeUser, refetch }) {
  return (
    <>
      <div className="header">
        <div className="logo">
          <h2 className="logo__title">easysnap</h2>
        </div>

        <div className="header_menu">
          <NavLink exact to="/">
            snaps
          </NavLink>
          {activeUser?.activeUser ? (
            <LinksWithLogin activeUser={activeUser} refetch={refetch} />
          ) : (
            <LinksWithUnLogin />
          )}
        </div>
      </div>
    </>
  );
}
const LinksWithLogin = ({ activeUser, refetch }) => {
  return (
    <>
      <NavLink to="profile">@{activeUser.activeUser.username}</NavLink>
      <Logout activeUser={activeUser} refetch={refetch} />
    </>
  );
};
const LinksWithUnLogin = () => {
  return (
    <>
      <NavLink to="/login">login</NavLink>
      <NavLink to="/join">join</NavLink>
    </>
  );
};

export default Header;
