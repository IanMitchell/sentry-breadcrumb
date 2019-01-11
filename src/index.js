import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as Sentry from '@sentry/minimal';
import counter from './reducers';
import App from './App';

const createSentryMiddleware = (
  options = {
    category: 'redux.action',
  }
) => store => next => action => {
  Sentry.addBreadcrumb({
    category: options.category,
    message: action.type,
  });

  return next(action);
};

const store = createStore(
  counter,
  { count: 0 },
  applyMiddleware(createSentryMiddleware())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
