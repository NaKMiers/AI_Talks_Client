import { combineReducers } from 'redux'
import userReducer from './userReducer'
import parameterReducer from './parameterReducer'

const reducers = combineReducers({
   userReducer,
   parameterReducer,
})

export default reducers
