import types from '../../constants/userAction'

const initState = JSON.parse(localStorage.getItem('user')) || { user: null, token: '' }

function userReducer(state = initState, action) {
   let newState = null
   switch (action.type) {
      case types.SET_USER_DATA:
         newState = { ...state, user: action.payload }
         localStorage.setItem('user', JSON.stringify(newState))
         return newState

      case types.LOGIN:
         localStorage.setItem('user', JSON.stringify(action.payload))
         return action.payload

      case types.REGISTER:
         localStorage.setItem('user', JSON.stringify(action.payload))
         return action.payload

      case types.LOGOUT:
         localStorage.removeItem('user')
         return { user: null, token: '' }

      case types.CHANGE_AVATAR:
         newState = {
            ...state,
            user: { ...state.user, avatar: action.payload },
         }
         localStorage.setItem('user', JSON.stringify(newState))

         return newState

      // user parameters
      case types.USER_CHANGE_PARAMETER:
         newState = { ...state, user: action.payload }
         localStorage.setItem('user', JSON.stringify(newState))

         return newState

      case types.USER_CHANGE_MODE:
         newState = { ...state, user: { ...action.payload, modeChanged: true } }
         localStorage.setItem('user', JSON.stringify(newState))
         return newState

      case types.USER_RESET_MODE_CHANGED:
         newState = { ...state, user: { ...state.user, modeChanged: false } }
         localStorage.setItem('user', JSON.stringify(newState))
         return newState

      default:
         return state
   }
}

export default userReducer
