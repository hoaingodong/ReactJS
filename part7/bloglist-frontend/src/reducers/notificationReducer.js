const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.payload
  case 'HIDE_NOTIFICATION':
    return action.payload
  default:
    return state
  }
}

export const createNotification = (notification, notiType, displayedTime) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      payload: {
        message: notification,
        type: notiType },
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        payload: null,
      })
    }, displayedTime * 1000)
  }
}

export default notificationReducer