import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.type === 'error') {
    return (
      <div id='error' className="error">
        {notification.message}
      </div>
    )
  }

  return (
    <div id='success' className="message">
      {notification.message}
    </div>
  )
}
export default Notification