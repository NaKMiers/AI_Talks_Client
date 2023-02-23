import types from '../../constants/parameterAction'

const initState = JSON.parse(localStorage.getItem('parameters')) || {
   theme: 0,
   model: 'text-davinci-003',
   maxTokens: 100,
   temperature: 0.5,
   size: '256x256',
   amount: 1,
   mode: 1,
}

function reducer(state = initState, action) {
   let newState = null
   switch (action.type) {
      case types.CHANGE_THEME:
         newState = { ...state, theme: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_MODEL:
         newState = { ...state, model: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_MAX_TOKENS:
         newState = { ...state, maxTokens: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_TEMPERATURE:
         newState = { ...state, temperature: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_SIZE:
         newState = { ...state, size: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_AMOUNT:
         newState = { ...state, amount: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_MODE:
         newState = { ...state, mode: action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))
         return newState

      case types.RESET:
         const mode = state.mode
         mode === 1
            ? (newState = {
                 ...state,
                 theme: 0,
                 model: 'text-davinci-003',
                 maxTokens: 100,
                 temperature: 0.5,
              })
            : (newState = {
                 ...state,
                 size: '256x256',
                 amount: 1,
              })

         localStorage.setItem('parameters', JSON.stringify(newState))
         return newState

      default:
         return state
   }
}

export default reducer
