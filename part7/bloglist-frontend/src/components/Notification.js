import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';

const Notification = () => {
  const message = useSelector((state) => state.notifications)
  switch (message.type) {
    case 'notifications/showNotification':
      return <Alert key={'success'} severity="success">{message.text}</Alert>
    case 'notifications/error':
      return <Alert key={'warning'} severity="error"> {message.text}</Alert>
  }

  return null
}

export default Notification