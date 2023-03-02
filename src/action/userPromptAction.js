import types from '../constants/userPromptAction'

const userAction = {
   loading: payload => ({ type: types.USER_LOADING, payload }),
   sendPromptMode1: payload => ({ type: types.USER_SEND_PROMPT_MODE1, payload }),
   sendPromptMode0: payload => ({ type: types.USER_SEND_PROMPT_MODE0, payload }),
   receiveCompletion: payload => ({ type: types.USER_RECEIVE_COMPLETION, payload }),
   receiveImage: payload => ({ type: types.USER_RECEIVE_IMAGE, payload }),

   setPromptsMode1: payload => ({ type: types.USER_SET_PROMPTS_MODE1, payload }),
   setPromptsMode0: payload => ({ type: types.USER_SET_PROMPTS_MODE0, payload }),

   clear: () => ({ type: types.USER_CLEAR }),
   clearMode1: () => ({ type: types.USER_CLEAR_MODE1 }),
   clearMode0: () => ({ type: types.USER_CLEAR_MODE0 }),
}

export default userAction
