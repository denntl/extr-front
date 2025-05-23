import React, { createContext, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import ApplicationBaseTab from './ApplicationBaseTab'
import ApplicationTrafficTab from './ApplicationTrafficTab'
import ApplicationPlatformTab from './ApplicationPlatformTab'
import ApplicationContentTab from './ApplicationContentTab'
import ApplicationOnesignalTab from './ApplicationOnesignalTab'
import ApplicationComments from './ApplicationComments'
import ApplicationPreview from './ApplicationPreview'
import { useTranslation } from 'react-i18next'
import {
  APPLICATION_FORM_STAGE_BASE,
  APPLICATION_FORM_STAGE_COMMENTS,
  APPLICATION_FORM_STAGE_CONTENT,
  APPLICATION_FORM_STAGE_ONESIGNAL,
  APPLICATION_FORM_STAGE_PLATFORM,
  APPLICATION_FORM_TRAFFIC,
} from 'src/components/listing/constants'
import { useNavigate } from 'react-router-dom'
import { Validation } from 'src/services/validation/Validation'
import { getValidationRules } from './ApplicationValidationRules'
import { useNotificationPopup } from 'src/providers/NotificationPopupProvider'
import CoverProvider from 'src/providers/CoverProvider'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import _ from 'lodash'
import PropTypes from 'prop-types'

const previewAllowedTabs = [
  APPLICATION_FORM_STAGE_COMMENTS,
  APPLICATION_FORM_STAGE_CONTENT,
  APPLICATION_FORM_STAGE_PLATFORM,
]

const defaultErrors = {
  public_id: null,
  uuid: null,
  name: null,
  status: null,
  domain_id: null,
  subdomain: null,
  pixel_id: null,
  pixel_key: null,
  link: null,
  platform_type: null,
  landing_type: null,
  geo: null,
  language: null,
  category: null,
  white_type: null,
  app_name: null,
  developer_name: null,
  icon: null,
  description: null,
  downloads_count: null,
  rating: null,
  onesignal_id: null,
  onesignal_name: null,
  onesignal_auth_key: null,
  owner: null,
  display_top_bar: null,
}

export const ApplicationCreateContext = createContext()
export const DefaultApplication = {
  public_id: '',
  uuid: '',
  name: '',
  status: null,
  domain_id: '',
  subdomain: '',
  pixel_id: '',
  pixel_key: '',
  link: '',
  platform_type: '',
  landing_type: 0,
  geo: [],
  language: '',
  category: '',
  white_type: '',
  app_name: '',
  developer_name: '',
  icon: '',
  description: '',
  downloads_count: '0',
  rating: 0,
  onesignal_id: '',
  onesignal_name: '',
  onesignal_auth_key: '',
  display_top_bar: false,

  // owner: user,
  files: [],
}

const Form = ({
  pageTitle,
  settings,
  application = {},
  onSubmit,
  displayTabs = [],
  isUpdating = false,
  isLoading = true,
  backRoute = '/applications',
}) => {
  const { t } = useTranslation('application')
  const navigate = useNavigate()
  const popup = useNotificationPopup()
  const ConfirmModal = useConfirmModal()

  const [currentTab, setCurrentTab] = useState()
  const [reloadPreview, setReloadPreview] = useState(null)
  const [applicationForm, setApplicationForm] = useState(DefaultApplication)
  const [validationErrors, setValidationErrors] = useState(defaultErrors)

  useEffect(() => {
    if (application) {
      setApplicationForm({ ...applicationForm, ...application })
    }
  }, [application])

  const redirectToApplications = () => {
    if (isUpdating && !_.isEqual(application, applicationForm)) {
      ConfirmModal.initAndOpen({
        message: t('unsavedChangesMessage'),
        confirmCallback: () => {
          navigate(backRoute)
        },
        rejectCallback: () => {},
      })
    } else {
      navigate(backRoute)
    }
  }

  const handleTabChange = (value) => setCurrentTab(value)

  const handleChangeApplication = (value, field, needUpdatePreview = true) => {
    setApplicationForm((prev) => ({ ...prev, [field]: value }))
    if (needUpdatePreview) {
      updatePreview()
    }
  }
  const handleSave = () => {
    if (isValid()) {
      onSubmit(applicationForm, setValidationErrors)
    } else {
      popup.pushPopup(t('formIsInvalid'), 'danger')
    }
  }

  const isValid = () => {
    setValidationErrors(defaultErrors)
    const validation = new Validation(getValidationRules())
    const result = validation.validate(applicationForm)
    if (!result) {
      console.log(validation.errors, applicationForm)
      setValidationErrors(validation.errors)
    }
    return result
  }

  const updatePreview = () => {
    setReloadPreview(performance.now() * 1000)
  }

  return (
    <CCard>
      <CCardHeader>{pageTitle}</CCardHeader>
      <CoverProvider isLoading={isLoading} hideWhileLoading={true}>
        <CCardBody>
          <CRow>
            <CCol xxl={8}>
              <CTabs activeItemKey="base" onChange={handleTabChange}>
                <CTabList variant="underline">
                  {displayTabs.includes(APPLICATION_FORM_STAGE_BASE) && (
                    <CTab itemKey={APPLICATION_FORM_STAGE_BASE}>{t('baseTabName')}</CTab>
                  )}
                  {displayTabs.includes(APPLICATION_FORM_TRAFFIC) && (
                    <CTab itemKey={APPLICATION_FORM_TRAFFIC}>{t('trafficTabName')}</CTab>
                  )}
                  {displayTabs.includes(APPLICATION_FORM_STAGE_PLATFORM) && (
                    <CTab itemKey={APPLICATION_FORM_STAGE_PLATFORM}>{t('platformTabName')}</CTab>
                  )}
                  {displayTabs.includes(APPLICATION_FORM_STAGE_CONTENT) && (
                    <CTab itemKey={APPLICATION_FORM_STAGE_CONTENT}>{t('contentTabName')}</CTab>
                  )}
                  {displayTabs.includes(APPLICATION_FORM_STAGE_ONESIGNAL) && (
                    <CTab itemKey={APPLICATION_FORM_STAGE_ONESIGNAL}>{t('onesignalTabName')}</CTab>
                  )}
                  {displayTabs.includes(APPLICATION_FORM_STAGE_COMMENTS) && (
                    <CTab itemKey={APPLICATION_FORM_STAGE_COMMENTS}>{t('commentsTabName')}</CTab>
                  )}
                </CTabList>
                <CTabContent>
                  <ApplicationCreateContext.Provider
                    value={{
                      onChange: handleChangeApplication,
                      application: applicationForm,
                      validationErrors,
                      setValidationErrors,
                      settings,
                      updatePreview,
                      isUpdating,
                    }}
                  >
                    {displayTabs.includes(APPLICATION_FORM_STAGE_BASE) && (
                      <CTabPanel itemKey={APPLICATION_FORM_STAGE_BASE} className="p-3">
                        <ApplicationBaseTab />
                      </CTabPanel>
                    )}
                    {displayTabs.includes(APPLICATION_FORM_TRAFFIC) && (
                      <CTabPanel itemKey={APPLICATION_FORM_TRAFFIC} className="p-3">
                        <ApplicationTrafficTab />
                      </CTabPanel>
                    )}
                    {displayTabs.includes(APPLICATION_FORM_STAGE_PLATFORM) && (
                      <CTabPanel itemKey={APPLICATION_FORM_STAGE_PLATFORM} className="p-3">
                        <ApplicationPlatformTab />
                      </CTabPanel>
                    )}
                    {displayTabs.includes(APPLICATION_FORM_STAGE_CONTENT) && (
                      <CTabPanel itemKey={APPLICATION_FORM_STAGE_CONTENT} className="p-3">
                        <ApplicationContentTab />
                      </CTabPanel>
                    )}
                    {displayTabs.includes(APPLICATION_FORM_STAGE_ONESIGNAL) && (
                      <CTabPanel itemKey={APPLICATION_FORM_STAGE_ONESIGNAL} className="p-3">
                        <ApplicationOnesignalTab />
                      </CTabPanel>
                    )}
                    {displayTabs.includes(APPLICATION_FORM_STAGE_COMMENTS) && (
                      <CTabPanel itemKey={APPLICATION_FORM_STAGE_COMMENTS} className="p-3">
                        <ApplicationComments />
                      </CTabPanel>
                    )}
                  </ApplicationCreateContext.Provider>
                  <div className="mt-3">
                    <CButton
                      color="cancel"
                      className="px-4-5 rounded-pill"
                      as="a"
                      onClick={redirectToApplications}
                    >
                      {t('updateFormCancelButton')}
                    </CButton>
                    <div className="float-end">
                      <CButton
                        color="confirm"
                        className="px-4-5 rounded-pill float-end ml-2"
                        onClick={handleSave}
                      >
                        {isUpdating ? t('updateFormSaveButton') : t('createFormSaveButton')}
                      </CButton>
                    </div>
                  </div>
                </CTabContent>
              </CTabs>
            </CCol>
            <CCol xxl={4}>
              <div
                className={
                  currentTab && previewAllowedTabs.includes(currentTab) ? 'd-block' : 'd-none'
                }
              >
                <ApplicationPreview
                  appUuid={application.uuid}
                  data={applicationForm}
                  reload={reloadPreview}
                />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CoverProvider>
    </CCard>
  )
}

Form.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  application: PropTypes.shape({
    public_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    uuid: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    domain_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subdomain: PropTypes.string,
    pixel_id: PropTypes.string,
    pixel_key: PropTypes.string,
    link: PropTypes.string,
    platform_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    landing_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    geo: PropTypes.array,
    language: PropTypes.string,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    white_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    app_name: PropTypes.string,
    developer_name: PropTypes.string,
    icon: PropTypes.string,
    description: PropTypes.string,
    downloads_count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onesignal_id: PropTypes.string,
    onesignal_name: PropTypes.string,
    onesignal_auth_key: PropTypes.string,
    display_top_bar: PropTypes.bool,
    files: PropTypes.arrayOf(PropTypes.object),
  }),
  onSubmit: PropTypes.func.isRequired,
  displayTabs: PropTypes.arrayOf(PropTypes.string),
  isUpdating: PropTypes.bool,
  isLoading: PropTypes.bool,
  backRoute: PropTypes.string,
}

export default Form
