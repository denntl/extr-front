import useApi from 'src/hooks/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import PushNotificationForm from 'src/views/push-notifications/partials/form'
import { PUSH_NOTIFICATION_TYPE_SINGLE } from 'src/enums/push-notification-types'

const PushNotificationUpdate = () => {
  const { PushNotifications } = useApi()
  const navigate = useNavigate()
  const { pushNotificationId } = useParams()

  const [enums, setEnums] = useState()
  const [errors, setErrors] = useState()
  const [values, setValues] = useState()

  useEffect(() => {
    PushNotifications.edit(pushNotificationId).then((response) => {
      setEnums(response.data)
      setValues(response.data.values)
    })
  }, [])
  const handleSave = (values) => {
    PushNotifications.update(pushNotificationId, values).then(
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
        values={values}
        enums={enums}
        errors={errors}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}

export default PushNotificationUpdate
