const initState = JSON.parse(localStorage.getItem('messages')) || {
   messagesMode1: [
      {
         userId: 12313,
         type: 'user',
         text: 'Hi',
      },
      {
         userId: 12313,
         type: 'ai',
         text: 'Ok!',
      },
   ],
   messagesMode0: [
      {
         userId: 12313,
         type: 'user',
         text: 'Hi Ai.',
      },
      {
         userId: 12313,
         type: 'ai-image',
         images: ['', ''],
      },
   ],
}

function reducer(state = initState, action) {
   switch (action.type) {
      case '':
         return state

      default:
         return state
   }
}

export default reducer
