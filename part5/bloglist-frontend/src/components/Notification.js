const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  if (error) {
    return (
      <div id='error' className="error">
        {message}
      </div>
    )
  }

  return (
    <div id='success' className="message">
      {message}
    </div>
  )
}
export default Notification