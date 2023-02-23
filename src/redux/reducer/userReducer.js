import types from '../../constants/userAction'

const initState = JSON.parse(localStorage.getItem('user')) || { user: null, token: '' }

function userReducer(state = initState, action) {
   switch (action.type) {
      case types.LOGIN:
         localStorage.setItem('user', JSON.stringify(action.payload))
         return action.payload

      case types.REGISTER:
         localStorage.setItem('user', JSON.stringify(action.payload))
         return action.payload

      case types.LOGOUT:
         localStorage.clear()
         return { user: null, token: '' }

      case types.CHANGE_THEME:
         return {
            ...state,
            user: { ...state.user, theme: action.payload },
         }

      case types.CHANGE_AVATAR:
         const newState = {
            ...state,
            user: { ...state.user, avatar: action.payload },
         }
         localStorage.setItem('user', JSON.stringify(newState))

         return newState

      default:
         return state
   }
}

export default userReducer
