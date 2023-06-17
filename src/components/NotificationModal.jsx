import React from 'react'

function NotificationModal({notificationQueue, setNotificationQueue}) {
   const notification = notificationQueue[0];
  
  return (
    <div>{JSON.stringify(notification)}</div>
  )
}

export default NotificationModal