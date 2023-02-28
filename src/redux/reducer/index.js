import { combineReducers } from 'redux'
import userReducer from './userReducer'
import parameterReducer from './parameterReducer'
import promptReducer from './promptReducer'

const reducers = combineReducers({
   userReducer,
   parameterReducer,
   promptReducer,
})

export default reducers
