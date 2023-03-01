import types from '../constants/userAction'

const userAction = {
   setUserData: payload => ({ type: types.SET_USER_DATA, payload }),
   login: payload => ({ type: types.LOGIN, payload }),
   register: payload => ({ type: types.REGISTER, payload }),
   logout: () => ({ type: types.LOGOUT }),
   changeAvatar: payload => ({ type: types.CHANGE_AVATAR, payload }),

   changeParameter: payload => ({ type: types.USER_CHANGE_PARAMETER, payload }),

   changeMode: payload => ({ type: types.USER_CHANGE_MODE, payload }),
   resetModeChanged: () => ({ type: types.USER_RESET_MODE_CHANGED }),
}

export default userAction
