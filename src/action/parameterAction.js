import types from '../constants/parameterAction'

const parameterAction = {
   changeTheme: payload => ({ type: types.CHANGE_THEME, payload }),
   changeModel: payload => ({ type: types.CHANGE_MODEL, payload }),
   changeMaxTokens: payload => ({ type: types.CHANGE_MAX_TOKENS, payload }),
   changeTemperature: payload => ({ type: types.CHANGE_TEMPERATURE, payload }),
   changeSize: payload => ({ type: types.CHANGE_SIZE, payload }),
   changeAmount: payload => ({ type: types.CHANGE_AMOUNT, payload }),
   changeMode: payload => ({ type: types.CHANGE_MODE, payload }),
   reserModeChanged: () => ({ type: types.RESET_MODE_CHANGED }),
   reset: () => ({ type: types.RESET }),
}

export default parameterAction
