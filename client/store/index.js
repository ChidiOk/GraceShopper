import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import masks from './mask'
import cart from './cart'
import mask from './singleMask'

const reducer = combineReducers({
  user,
  masks,
  cart, 
  mask
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './mask'
export * from './cart'
export * from './singleMask'

