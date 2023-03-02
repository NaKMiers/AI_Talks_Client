import types from '../../constants/promptAction'

const initState = JSON.parse(localStorage.getItem('prompts')) || {
   loading: false,
   promptsMode1: [],
   promptsMode0: [],
}

function promptReducer(state = initState, action) {
   let newState = null
   switch (action.type) {
      case types.LOADING:
         newState = { ...state, loading: action.payload }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      case types.SEND_PROMPT_MODE1:
         newState = { ...state, promptsMode1: [...state.promptsMode1, action.payload] }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      case types.RECEIVE_COMPLETION:
         newState = { ...state, promptsMode1: [...state.promptsMode1, action.payload] }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      case types.SEND_PROMPT_MODE0:
         newState = { ...state, promptsMode0: [...state.promptsMode0, action.payload] }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      case types.RECEIVE_IMAGE:
         newState = { ...state, promptsMode0: [...state.promptsMode0, action.payload] }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      case types.CLEAR_MODE1:
         newState = { ...state, promptsMode1: [] }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      case types.CLEAR_MODE0:
         newState = { ...state, promptsMode0: [] }
         localStorage.setItem('prompts', JSON.stringify(newState))
         return newState

      default:
         return state
   }
}

export default promptReducer
