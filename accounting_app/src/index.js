import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from './reducer/configure'
let { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} > 
    <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
