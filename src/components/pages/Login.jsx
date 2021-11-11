import React, { useState } from 'react';
import { SIGN_IN } from '../../queries';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
function Login(props) {
  const [login, setLogin] = useState({ username: '', password: '' });
  const onChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const _onSubmit = async (e, signIn) => {
    e.preventDefault();
    signIn().then(async res => {
      const { data } = res;
      localStorage.setItem('token', data.signIn.token);
      props.history.push('/');
      await props.refetch();
    });
  };
  return (
    <>
      <div>
        <Mutation
          mutation={SIGN_IN}
          onCompleted={() => {
            setLogin({ username: '', password: '' });
          }}
          variables={login}>
          {(signIn, { loading, data, error }) => (
            <form
              className="user-form"
              onSubmit={e => {
                _onSubmit(e, signIn);
              }}>
              <label>
                <input
                  onChange={onChange}
                  value={login.username}
                  name="username"
                  type="text"
                  placeholder="username"
                />
              </label>
              <label>
                <input
                  onChange={onChange}
                  value={login.password}
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </label>
              <label>
                <button type="submit">Login</button>
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

export default withRouter(Login);
