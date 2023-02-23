import types from '../constants/userAction'

const userAction = {
   login: payload => ({ type: types.LOGIN, payload }),
   register: payload => ({ type: types.REGISTER, payload }),
   logout: () => ({ type: types.LOGOUT }),
   changeAvatar: payload => ({ type: types.CHANGE_AVATAR, payload }),
}

export default userAction
