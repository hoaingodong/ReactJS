const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  if (error) {
    console.log('hihi')
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}
export default Notification