import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from '../reducers'

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducers, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : func => func))

export default store
