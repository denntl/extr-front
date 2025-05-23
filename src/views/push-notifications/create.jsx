import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import PushNotificationForm from 'src/views/push-notifications/partials/form'
import { PUSH_NOTIFICATION_TYPE_SINGLE } from 'src/enums/push-notification-types'

const PushNotificationCreate = () => {
  const { PushNotifications } = useApi()
  const navigate = useNavigate()

  const [enums, setEnums] = useState()
  const [errors, setErrors] = useState()

  useEffect(() => {
    PushNotifications.create().then((response) => {
      setEnums(response.data)
    })
  }, [])
  const handleSave = (values) => {
    PushNotifications.store(values).then(
      (response) => {
        navigate(
          values.type === PUSH_NOTIFICATION_TYPE_SINGLE
            ? '/push-notifications/single'
            : '/push-notifications/regular',
        )
      },
      (error) => {
        setErrors((prev) => ({ ...prev, ...error.data.errors }))
      },
    )
  }

  const handleCancel = () => {
    navigate('/push-notifications/single')
  }

  return (
    <>
      <PushNotificationForm
        enums={enums}
        errors={errors}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}

export default PushNotificationCreate
