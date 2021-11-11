import Header from './Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Profile from './pages/Profile';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import sessionWrapperHOC from './sessionWrapperHOC';
import React from 'react';
const Root = ({ refetch, activeUser }) => {
  return (
    <Router>
      <Header activeUser={activeUser} refetch={refetch} />
      <Switch>
        <Route path="/" exact render={() => <Home activeUser={activeUser} />} />
        <Route path="/login" render={() => <Login refetch={refetch} />} />
        <Route path="/join" render={() => <Join refetch={refetch} />} />
        <Route
          path="/profile"
          render={() => <Profile activeUser={activeUser} />}
        />
      </Switch>
    </Router>
  );
};
const RootWithSessionWrapper = sessionWrapperHOC(Root);
function App() {
  return (
    <div id="app">
      <div className="container">
        <RootWithSessionWrapper />
      </div>
    </div>
  );
}

export default App;
