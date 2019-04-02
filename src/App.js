import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Root from './components/Root';

import store from './model/store';

import './App.scss';

const propTypes = {
  history: PropTypes.oneOfType([ReactRouterPropTypes.history]),
  initialState: PropTypes.object,
};

const defaultProps = {
  history: null,
  initialState: {},
};

const App = ({ history, initialState }) => (
  <Provider store={store}>
    <div className="app">
      <Root history={history} initialState={initialState} />
    </div>
  </Provider>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
