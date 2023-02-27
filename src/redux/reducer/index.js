import { combineReducers } from 'redux'
import userReducer from './userReducer'
import parameterReducer from './parameterReducer'
import messageReducer from './messageReducer'

const reducers = combineReducers({
   userReducer,
   parameterReducer,
   messageReducer,
})

export default reducers
