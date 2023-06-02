import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.type === 'error') {
    return (
      <div id='error' className="error">
        <Alert variant="danger">
          {notification.message}
        </Alert>
      </div>
    )
  }

  return (
    <div id='success' className="message">
      <Alert variant="success">
        {notification.message}
      </Alert>
    </div>
  )
}
export default Notification