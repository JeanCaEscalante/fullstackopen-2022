
const Notification = ({ notification }) => {

    switch (notification.name) {
      case 'error':
        return (
          <div className='error'>
            {notification.message}
          </div>
        )
      case 'sucess':
        return (
          <div className='sucess'>
            {notification.message}
          </div>
        )
      default:
        return null

    }
  }

export default Notification