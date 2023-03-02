import types from '../constants/promptAction'

const userAction = {
   loading: payload => ({ type: types.LOADING, payload }),
   sendPromptMode1: payload => ({ type: types.SEND_PROMPT_MODE1, payload }),
   sendPromptMode0: payload => ({ type: types.SEND_PROMPT_MODE0, payload }),
   receiveCompletion: payload => ({ type: types.RECEIVE_COMPLETION, payload }),
   receiveImage: payload => ({ type: types.RECEIVE_IMAGE, payload }),

   clearMode1: () => ({ type: types.CLEAR_MODE1 }),
   clearMode0: () => ({ type: types.CLEAR_MODE0 }),
}

export default userAction
