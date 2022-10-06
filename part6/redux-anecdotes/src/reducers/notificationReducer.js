const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
         return action.mesage;
      case 'REM_NOTIFICATION':
        return ''
      default: return state
    }
}

let time = null;
export const NotificationChange = (mesage, timeout) => async (dispatch) => {
  if(time !== null){
    clearTimeout(time)
  }
  time = setTimeout(() => {
    dispatch(NotificationRemove())
  }, timeout * 1000)

  return dispatch({
      type: 'SET_NOTIFICATION',
      mesage,
    })
};

export const NotificationRemove = () => {
    return {
        type: 'REM_NOTIFICATION',
    }
}
export default notificationReducer;
  