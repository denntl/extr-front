import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText } from '@coreui/react-pro'
import SingleSelect from 'src/components/custom/SingleSelect'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_TYPE_AUTO, NOTIFICATION_TYPE_MANUAL } from 'src/enums/notification-types'
import AutoNotificationsForm from 'src/views/system-notifications/partials/AutoNotificationsForm'
import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import ManualNotificationForm from 'src/views/system-notifications/partials/ManualNotificationForm'
import {
  PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE,
  PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_SEND_MESSAGE,
} from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'

const SystemNotificationsCreate = () => {
  const { t } = useTranslation('system-notifications')
  const { SystemNotifications } = useApi()
  const navigate = useNavigate()
  const auth = useAuth()

  const [enums, setEnums] = useState()
  const [enumsManual, setEnumsManual] = useState()
  const [selectedType, setSelectedType] = useState(NOTIFICATION_TYPE_AUTO)
  const [errors, setErrors] = useState({})

  const notificationsTypes = [
    {
      label: t('notifications_type_auto'),
      value: NOTIFICATION_TYPE_AUTO,
    },
    {
      label: t('notifications_type_manual'),
      value: NOTIFICATION_TYPE_MANUAL,
    },
  ]

  useEffect(() => {
    if (!auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    SystemNotifications.create().then((response) => {
      setEnums(response.data)
    })
  }, [selectedType])
  const handleChangeType = (type) => {
    setSelectedType(type)
  }

  const onCancel = () => {
    navigate('/notifications')
  }

  const handleSave = (values) => {
    if (!auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    SystemNotifications.store(values).then(
      (result) => {
        navigate('/notifications')
      },
      (error) => {
        setErrors(error.getErrors())
      },
    )
  }

  const onSaveManual = (values) => {
    if (!auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_SEND_MESSAGE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    SystemNotifications.sendMessage(values).then(
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
        <CCardHeader>Создание уведомления</CCardHeader>
        <CCardBody>
          {errors.permissions && (
            <CCardText className="text-danger">{errors.permissions}</CCardText>
          )}
          <SingleSelect
            options={notificationsTypes}
            value={selectedType}
            onChange={handleChangeType}
            optionsStyle="text"
          />
          {selectedType === NOTIFICATION_TYPE_AUTO && (
            <AutoNotificationsForm
              errors={errors}
              enums={enums}
              onSave={handleSave}
              onCancel={onCancel}
            />
          )}
          {selectedType === NOTIFICATION_TYPE_MANUAL && (
            <ManualNotificationForm
              errors={errors}
              enums={enums}
              onSave={onSaveManual}
              onCancel={onCancel}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default SystemNotificationsCreate
