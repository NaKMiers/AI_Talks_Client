import types from '../constants/actionType'

const userAction = {
   login: payload => ({ type: types.LOGIN, payload }),
   logout: () => ({ type: types.LOGOUT }),
   changeAvatar: payload => ({ type: types.CHANGE_AVATAR, payload }),
}

export default userAction
