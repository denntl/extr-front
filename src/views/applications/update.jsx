import useApi from 'src/hooks/useApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'src/components/applicationForm/Index'
import {
  APPLICATION_FORM_STAGE_BASE,
  APPLICATION_FORM_STAGE_COMMENTS,
  APPLICATION_FORM_STAGE_CONTENT,
  APPLICATION_FORM_STAGE_PLATFORM,
  APPLICATION_FORM_TRAFFIC,
} from 'src/components/listing/constants'
import { useNotificationPopup } from 'src/providers/NotificationPopupProvider'
import { useTranslation } from 'react-i18next'

const Update = () => {
  const { t } = useTranslation('application')
  const { appId } = useParams()
  const { Application } = useApi()
  const popup = useNotificationPopup()

  const [application, setApplication] = useState({})
  const [settings, setSettings] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Application.edit(appId).then((response) => {
      const { application: model, ...settings } = response.data

      setApplication(model)
      setSettings(settings)

      setTimeout(() => {
        setIsLoading(false)
      }, 100)
    })
  }, [])

  const handleSubmit = async (applicationForm, validationErrors) => {
    Application.update(applicationForm)
      .then((response) => {
        setApplication((prev) => ({ ...prev, ...response.application }))
      })
      .catch(
        /** @param {Response} error */ (error) => {
          validationErrors(error.getErrors())
          popup.pushPopup(t('formIsInvalid'), 'danger')
        },
      )
  }

  return (
    <Form
      pageTitle={t('updateApplicationPageTitle')}
      settings={settings}
      application={application}
      onSubmit={handleSubmit}
      displayTabs={[
        APPLICATION_FORM_STAGE_BASE,
        APPLICATION_FORM_STAGE_COMMENTS,
        APPLICATION_FORM_STAGE_CONTENT,
        APPLICATION_FORM_STAGE_PLATFORM,
        APPLICATION_FORM_TRAFFIC,
      ]}
      isUpdating
      isLoading={isLoading}
      backRoute="/applications"
    />
  )
}

export default Update
