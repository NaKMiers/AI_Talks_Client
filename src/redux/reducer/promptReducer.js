import types from '../../constants/promptAction'

const initState = JSON.parse(localStorage.getItem('prompts')) || {
   loading: false,
   promptsMode1: [
      // {
      //    userId: 12313,
      //    type: 'user',
      //    text: 'Hi',
      // },
      // {
      //    userId: 12313,
      //    type: 'ai',
      //    text: 'Ok!',
      // },
   ],
   promptsMode0: [
      // {
      //    userId: 12313,
      //    type: 'user',
      //    text: 'Hi Ai.',
      // },
      // {
      //    userId: 12313,
      //    type: 'ai-image',
      //    images: ['', ''],
      // },
   ],
}

function promptReducer(state = initState, action) {
   let newState = null
   switch (action.type) {
      case types.LOADING:
         return { ...state, loading: action.payload }

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

      default:
         return state
   }
}

export default promptReducer
