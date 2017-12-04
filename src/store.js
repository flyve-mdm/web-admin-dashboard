import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Reducers from './reducers'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerReduxMiddleware = routerMiddleware(history)

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(routerReduxMiddleware, thunk)
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(routerReduxMiddleware, thunk, createLogger())
    }
};

export const store = createStore(
    Reducers, 
    composeWithDevTools(getMiddleware())
)