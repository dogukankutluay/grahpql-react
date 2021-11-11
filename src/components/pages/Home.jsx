import React, { useState, useEffect } from 'react';
import { GET_SNAPS, CREATE_SNAP } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import TimeAgo from 'react-timeago';
const Snap = ({ snap }) => {
  return (
    <li className={snap._id < 0 ? 'optimistic' : ''}>
      <div className="title">{snap.text}</div>
      <div className="date">
        <span className="username">@{snap.user.username}</span>
        <span>{snap._id < 0 ? '0' : <TimeAgo date={snap.createdAt} />}</span>
      </div>
    </li>
  );
};
function Home({ activeUser }) {
  const [snapLength, setSnapLength] = useState(0);
  const [addSnap, setCreateSnap] = useState({
    text: '',
    user_id: '',
  });
  const onChange = e =>
    setCreateSnap({ ...addSnap, [e.target.name]: e.target.value });
  const _onSubmit = (e, createSnape) => {
    e.preventDefault();
    if (addSnap.text.length) {
      setCreateSnap({ ...addSnap, text: '' });
      createSnape().then(data => {});
    }
  };
  useEffect(() => {
    if (activeUser && activeUser.activeUser) {
      setCreateSnap({ ...addSnap, user_id: activeUser.activeUser._id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateCache = (cache, { data: { createSnap } }) => {
    const { snaps } = cache.readQuery({
      query: GET_SNAPS,
    });
    cache.writeQuery({
      query: GET_SNAPS,
      data: {
        snaps: [createSnap, ...snaps],
      },
    });
  };
  return (
    <>
      <div className="description">
        <p className="sub_header__desc">
          simple snap app with <span>react</span>.
        </p>
      </div>

      <div>
        <Mutation
          mutation={CREATE_SNAP}
          variables={{
            ...addSnap,
          }}
          // refetchQueries={[{ query: GET_SNAPS }]}
          update={updateCache}
          optimisticResponse={{
            __typename: 'Mutation',
            createSnap: {
              __typename: 'Snap',
              text: addSnap.text,
              _id: Math.round(Math.random() * -20000),
              createdAt: new Date(),
              user: {
                __typename: 'User',
                _id: activeUser?.activeUser?._id,
                username: activeUser?.activeUser?.username,
                createdAt: new Date(),
              },
            },
          }}>
          {(createSnap, { loading, data }) => {
            return (
              <form
                onSubmit={e => {
                  _onSubmit(e, createSnap);
                }}>
                <input
                  autoFocus={true}
                  onChange={onChange}
                  value={addSnap.text}
                  name="text"
                  className="add-snap__input"
                  type="text"
                  placeholder={
                    activeUser && activeUser.activeUser
                      ? 'add snap'
                      : 'please login add a new snap'
                  }
                  disabled={!(activeUser && activeUser.activeUser)}
                />
              </form>
            );
          }}
        </Mutation>
      </div>
      <div>
        <ul className="snaps">
          <Query
            query={GET_SNAPS}
            onCompleted={data => {
              setSnapLength(data.snaps.length);
            }}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error</div>;
              return data.snaps.map(snap => {
                return <Snap key={snap._id} snap={snap} />;
              });
            }}
          </Query>
        </ul>
      </div>
      <div className="counter">{snapLength} snap(s)</div>
    </>
  );
}

export default Home;
