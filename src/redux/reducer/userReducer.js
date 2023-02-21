const initState = {
   user: JSON.parse(localStorage.getItem('user')) || { user: null, token: '' },
}

function userReducer(state = initState, action) {
   switch (action.type) {
      case '':
         return state
      default:
         return state
   }
}

export default userReducer
