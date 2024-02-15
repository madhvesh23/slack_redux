import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import { Provider  } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
     <App />
    </Provider>
);

