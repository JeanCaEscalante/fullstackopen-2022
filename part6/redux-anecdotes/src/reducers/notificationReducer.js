const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
         return action.mesage;
      case 'REM_NOTIFICATION':
        return ''
      default: return state
    }
}

export const NotificationChange = (mesage, timeout) => async (dispatch) => {

  setTimeout(() => {
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
  