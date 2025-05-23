import useApi from 'src/hooks/useApi'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form, { DefaultApplication } from 'src/components/applicationForm/Index'
import {
  APPLICATION_FORM_STAGE_BASE,
  APPLICATION_FORM_STAGE_CONTENT,
  APPLICATION_FORM_STAGE_PLATFORM,
  APPLICATION_FORM_TRAFFIC,
} from 'src/components/listing/constants'
import { useNotificationPopup } from 'src/providers/NotificationPopupProvider'
import { useTranslation } from 'react-i18next'

const Create = () => {
  const { t } = useTranslation('application')
  const navigate = useNavigate()
  const { appId } = useParams()
  const { Application } = useApi()
  const popup = useNotificationPopup()

  const [application, setApplication] = useState(DefaultApplication)
  const [settings, setSettings] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [displayTabs, setDisplayTabs] = useState([
    APPLICATION_FORM_STAGE_BASE,
    APPLICATION_FORM_STAGE_CONTENT,
    APPLICATION_FORM_STAGE_PLATFORM,
    APPLICATION_FORM_TRAFFIC,
  ])

  useEffect(() => {
    Application.create(appId).then((response) => {
      const settings = response.data

      setSettings(settings)
      setApplication((prev) => ({
        ...prev,
        domain_id: settings.domains?.[0]?.value || '',
        platform_type: settings.platforms?.[0]?.value || '',
        language: settings.languages?.[0]?.value || '',
        white_type: settings.whiteTypes?.[0]?.value || '',
        category: settings.categories?.[0]?.value || '',
        status: settings.statuses?.[0]?.value || '',
      }))

      setTimeout(() => {
        setIsLoading(false)
      }, 100)
    })
  }, [])

  const handleSubmit = async (applicationForm, validationErrors) => {
    Application.store(applicationForm)
      .then((response) => {
        popup.pushPopup(t('applicationWasCreated'), 'success')
        navigate(`/applications/update/${response.application.public_id}`)
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
      displayTabs={displayTabs}
      isLoading={isLoading}
      backRoute="/applications"
    />
  )
}

export default Create
