import { combineReducers } from 'redux'
import userReducer from './userReducer'
import parameterReducer from './parameterReducer'
import promptReducer from './promptReducer'
import userPromptReducer from './userPromptReducer'

const reducers = combineReducers({
   userReducer,
   parameterReducer,
   promptReducer,
   userPromptReducer,
})

export default reducers
