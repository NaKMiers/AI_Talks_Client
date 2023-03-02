import types from '../../constants/userPromptAction'

const initState = JSON.parse(localStorage.getItem('user-prompts')) || {
   loading: false,
   promptsMode1: [],
   promptsMode0: [],
}

function userPromptReducer(state = initState, action) {
   let newState = null
   switch (action.type) {
      case types.USER_LOADING:
         newState = { ...state, loading: action.payload }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_SEND_PROMPT_MODE1:
         newState = { ...state, promptsMode1: [...state.promptsMode1, action.payload] }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_RECEIVE_COMPLETION:
         newState = { ...state, promptsMode1: [...state.promptsMode1, action.payload] }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_SEND_PROMPT_MODE0:
         newState = { ...state, promptsMode0: [...state.promptsMode0, action.payload] }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_RECEIVE_IMAGE:
         console.log('types.USER_RECEIVE_IMAGE')
         console.log('action.payload: ', action.payload)
         newState = { ...state, promptsMode0: [...state.promptsMode0, action.payload] }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_SET_PROMPTS_MODE1:
         newState = { ...state, promptsMode1: action.payload }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_SET_PROMPTS_MODE0:
         newState = { ...state, promptsMode0: action.payload }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_CLEAR:
         localStorage.removeItem('user-prompts')
         return {
            loading: false,
            promptsMode1: [],
            promptsMode0: [],
         }

      case types.USER_CLEAR_MODE1:
         newState = { ...state, promptsMode1: [] }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      case types.USER_CLEAR_MODE0:
         newState = { ...state, promptsMode0: [] }
         localStorage.setItem('user-prompts', JSON.stringify(newState))
         return newState

      default:
         return state
   }
}

export default userPromptReducer
