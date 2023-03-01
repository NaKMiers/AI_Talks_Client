import types from '../../constants/parameterAction'

const initState = JSON.parse(localStorage.getItem('parameters')) || {
   theme: 0,
   model: 'text-davinci-003',
   maxTokens: 100,
   temperature: 0.5,
   size: '256x256',
   amount: 1,
   mode: 1,
   modeChanged: false,
}

function reducer(state = initState, action) {
   let newState = null
   switch (action.type) {
      case types.CHANGE_PARAMETER:
         newState = { ...action.payload }
         localStorage.setItem('parameters', JSON.stringify(newState))

         return newState

      case types.CHANGE_MODE:
         newState = { ...state, mode: action.payload, modeChanged: true }
         localStorage.setItem('parameters', JSON.stringify(newState))
         return newState

      case types.RESET_MODE_CHANGED:
         newState = { ...state, modeChanged: false }
         localStorage.setItem('parameters', JSON.stringify(newState))
         return newState

      default:
         return state
   }
}

export default reducer
