import React, { useState } from 'react';
import { CREATE_USER } from '../../queries';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
function Join(props) {
  const [join, setJoin] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const onChange = e => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };
  const _onSubmit = async (e, createUser) => {
    e.preventDefault();
    createUser().then(async res => {
      const { data } = res;
      localStorage.setItem('token', data.createUser.token);
      props.history.push('/');
      await props.refetch();
    });
  };
  return (
    <>
      <div>
        <Mutation
          mutation={CREATE_USER}
          variables={join}
          onCompleted={() =>
            setJoin({ username: '', password: '', passwordConfirm: '' })
          }>
          {(createUser, { loading, error, data }) => (
            <form
              className="user-form"
              onSubmit={e => {
                _onSubmit(e, createUser);
              }}>
              <label>
                <input
                  value={join.username}
                  onChange={onChange}
                  name="username"
                  type="text"
                  placeholder="username"
                />
              </label>
              <label>
                <input
                  value={join.password}
                  onChange={onChange}
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </label>
              <label>
                <input
                  value={join.passwordConfirm}
                  onChange={onChange}
                  name="passwordConfirm"
                  type="password"
                  placeholder="confirm password"
                />
              </label>
              <label>
                <button type="submit">Join</button>
              </label>
              {loading && <div>Loading...</div>}
              {error && <div>Error</div>}
            </form>
          )}
        </Mutation>
      </div>
    </>
  );
}

export default withRouter(Join);
