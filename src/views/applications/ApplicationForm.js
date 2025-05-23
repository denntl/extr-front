import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CTab,
  CTabContent,
  CTableFoot,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import { redirect, useLoaderData, useParams } from 'react-router-dom'
import ApplicationBaseTab from 'src/views/applications/partials/ApplicationBaseTab'
import ApplicationPlatformTab from 'src/views/applications/partials/ApplicationPlatformTab'
import ApplicationContentTab from 'src/views/applications/partials/ApplicationContentTab'
import { sleep } from 'src/tools/tools'
import 'src/views/applications/scss/appPreview.scss'
import { Validation } from 'src/services/validation/Validation'
import { getValidationRules } from 'src/views/applications/partials/ApplicationValidationRules'
import useApi from 'src/hooks/useApi'
import ApplicationComments from 'src/views/applications/partials/ApplicationComments'
import { useAuth } from 'src/providers/AuthProvider'
import ApplicationTrafficTab from 'src/views/applications/partials/ApplicationTrafficTab'
import { useTranslation } from 'react-i18next'
import ApplicationPreview from 'src/views/applications/partials/ApplicationPreview'

export const defaultErrors = {
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

const previewAllowedTabs = ['platform', 'content', 'comments']

export const ApplicationCreateContext = createContext()
const ApplicationForm = () => {
  const { t } = useTranslation('application')

  const { appId } = useParams()
  const { Application } = useApi()

  const { user, refresh: refreshUser } = useAuth()

  const [enums, setEnums] = useState({
    domains: [],
    categories: [],
    platforms: [],
    whiteTypes: [],
    geos: [],
    languages: [],
    owners: [],
    statuses: [],
    postbacks: {
      registration: '',
      deposit: '',
    },
  })

  const [applications, setApplications] = useState([])

  const [application, setApplication] = useState({
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
    downloads_count: 0,
    rating: 0,
    onesignal_id: '',
    onesignal_name: '',
    onesignal_auth_key: '',
    display_top_bar: false,
    display_app_bar: false,

    owner: user,
    images: [],
    topApplications: [],
  })

  const [validationErrors, setValidationErrors] = useState(defaultErrors)

  const [disabledTabs, setDisabledTabs] = useState({
    trafficTab: true,
    platformTab: true,
    contentTab: true,
    commentsTab: true,
  })

  const [reloadPreview, setReloadPreview] = useState(true)
  const [currentTab, setCurrentTab] = useState()

  const loadPage = (loader) =>
    loader().then((response) => {
      const { domains, platforms, languages, whiteTypes, categories, application, applications } =
        response.data

      if (application) {
        setApplication({ ...application, topApplications: response.data.topApplications })
        setDisabledTabs(() => ({
          trafficTab: false,
          platformTab: false,
          commentsTab: false,
          contentTab: false,
        }))
      } else {
        setApplication((prev) => ({
          ...prev,
          domain_id: domains?.[0]?.value || '',
          platform_type: platforms?.[0]?.value || '',
          language: languages?.[0]?.value || '',
          white_type: whiteTypes?.[0]?.value || '',
          category: categories?.[0]?.value || '',
        }))
      }
      setApplications(applications)
      setEnums(response.data)
    })

  useEffect(() => {
    loadPage(() => (appId ? Application.edit(appId) : Application.create()))
  }, [])

  const updatePreview = () => {
    setReloadPreview(!reloadPreview)
  }

  const saveApplication = async (stage) => {
    /** @type {Response} */
    const response =
      appId || application.public_id
        ? Application.update(stage, application)
        : Application.store(stage, application)

    return await response
      .then((rs) => {
        if (rs.isSuccess()) {
          setApplication({ ...rs.application, topApplications: rs.topApplications })
          refreshUser()
          updatePreview()
          return true
        }
        return false
      })
      .catch((rs) => {
        setValidationErrors(rs.getErrors())
        return false
      })
  }

  const changeTab = async (nextTab) => {
    console.log(nextTab)
    setDisabledTabs((prev) => ({ ...prev, [nextTab]: false }))
    await sleep(100)
    const event = new Event('click', { bubbles: true })
    document.getElementById(nextTab)?.dispatchEvent(event)
  }

  const handleTabChange = (value) => {
    setCurrentTab(value)
  }

  const validate = (rules) => {
    setValidationErrors(defaultErrors)
    const validation = new Validation(rules || getValidationRules())
    const result = validation.validate(application)
    if (!result) {
      setValidationErrors(validation.errors)
    }
    return result
  }

  return (
    <>
      <CCard>
        <CCardHeader>{appId ? 'Редактирование приложения' : 'Создание приложения'}</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xxl={8}>
              <CTabs activeItemKey="base" onChange={handleTabChange}>
                <CTabList variant="underline">
                  <CTab itemKey="base">Основные настройки</CTab>
                  <CTab disabled={disabledTabs.trafficTab} itemKey="traffic" id="trafficTab">
                    {t('trafficTabName')}
                  </CTab>
                  <CTab disabled={disabledTabs.platformTab} itemKey="platform" id="platformTab">
                    Настройки платформы и GEO
                  </CTab>
                  <CTab disabled={disabledTabs.contentTab} itemKey="content" id="contentTab">
                    Контент (визуал)
                  </CTab>
                  <CTab disabled={disabledTabs.commentsTab} itemKey="comments" id="commentsTab">
                    Комментарии
                  </CTab>
                </CTabList>
                <CTabContent>
                  <ApplicationCreateContext.Provider
                    value={{
                      changeTab,
                      saveApplication,
                      validationErrors,
                      setValidationErrors,
                      applicationValues: application,
                      setApplicationValues: setApplication,
                      validate,
                      enums,
                      updatePreview,
                      isUpdating: !!appId,
                      applications,
                    }}
                  >
                    <CTabPanel itemKey="base" className="p-3">
                      <ApplicationBaseTab />
                    </CTabPanel>
                    <CTabPanel itemKey="traffic" className="p-3">
                      <ApplicationTrafficTab />
                    </CTabPanel>
                    <CTabPanel itemKey="platform" className="p-3">
                      <ApplicationPlatformTab />
                    </CTabPanel>
                    <CTabPanel itemKey="content" className="p-3">
                      <ApplicationContentTab />
                    </CTabPanel>
                    <CTabPanel itemKey="comments" className="p-3">
                      <ApplicationComments />
                    </CTabPanel>
                  </ApplicationCreateContext.Provider>
                </CTabContent>
              </CTabs>
            </CCol>
            <CCol xxl={4}>
              {application.uuid && currentTab && previewAllowedTabs.includes(currentTab) && (
                <ApplicationPreview
                  appUuid={application.uuid}
                  data={application}
                  reload={reloadPreview}
                />
              )}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ApplicationForm
