import types from '../constants/parameterAction'

const parameterAction = {
   changeParameter: payload => ({ type: types.CHANGE_PARAMETER, payload }),

   changeMode: payload => ({ type: types.CHANGE_MODE, payload }),
   resetModeChanged: () => ({ type: types.RESET_MODE_CHANGED }),
}

export default parameterAction
