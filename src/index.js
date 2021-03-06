import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Users from './Components/Users';
import Person from './Components/Person';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {reducer as formReducer} from 'redux-form'
import users from './Reducer/users'
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux'
import {Route} from "react-router";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'
import createHistory from "history/createBrowserHistory";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    users,
    form: formReducer,
    routing: routerReducer
});

const history = createHistory();

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(mySaga);


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/:userId*" component={App}/>
                <Route exact path="/" component={Users}/>
                <Route exact path="/user/:userId" component={Person}/>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
