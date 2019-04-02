import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

const AppRouter = () => (
  <Router>
    <>
      <Route
        exact
        path="/"
        component={({ history, match }) => (
          <App history={history} initialState={match.params} />
        )}
      />
    </>
  </Router>
);

export default AppRouter;
