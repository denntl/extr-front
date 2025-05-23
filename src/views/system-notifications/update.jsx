import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from 'src/hooks/useApi'
import { CCard, CCardBody, CCardHeader, CCardText } from '@coreui/react-pro'
import AutoNotificationsForm from 'src/views/system-notifications/partials/AutoNotificationsForm'
import { PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_UPDATE } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'

const SystemNotificationsUpdate = () => {
  const { t } = useTranslation('system-notifications')
  const navigate = useNavigate()
  const { SystemNotifications } = useApi()
  const { id } = useParams()
  const auth = useAuth()

  const [enums, setEnums] = useState()
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState()

  useEffect(() => {
    if (!auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_UPDATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    SystemNotifications.edit(id).then((response) => {
      setValues(response.notificationTemplate)
      setEnums({
        entities: response.entities,
        events: response.events,
        roles: response.roles,
      })
    })
  }, [])

  const onCancel = () => {
    navigate('/notifications')
  }

  const onSave = (values) => {
    if (!auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_UPDATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    SystemNotifications.update(id, values).then(
      (result) => {
        navigate('/notifications')
      },
      (error) => {
        setErrors(error)
      },
    )
  }

  return (
    <>
      <CCard>
        <CCardHeader>Редактирование уведомления</CCardHeader>
        <CCardBody>
          {errors.permissions && (
            <CCardText className="text-danger">{errors.permissions}</CCardText>
          )}
          <AutoNotificationsForm
            values={values}
            errors={errors}
            enums={enums}
            onSave={onSave}
            onCancel={onCancel}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default SystemNotificationsUpdate
