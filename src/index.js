import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import thunk from 'redux-thunk';

import './index.module.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import customerReducer from './store/reducers/customer';
import itemReducer from './store/reducers/item';
import multipleReducer from './store/reducers/multiple';

const composeEnhancers = ( process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null )|| compose;

const rootReducer = combineReducers({
    customer: customerReducer,
    item:itemReducer,
    multiple: multipleReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = ( 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
serviceWorker.unregister();
