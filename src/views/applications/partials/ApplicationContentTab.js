import React, { useContext } from 'react'
import { ApplicationCreateContext } from 'src/views/applications/ApplicationForm'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSwitch,
  CFormTextarea,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import useApi from 'src/hooks/useApi'
import ApplicationPreview from 'src/views/applications/partials/ApplicationPreview'
import { APPLICATION_FORM_STAGE_CONTENT } from 'src/components/listing/constants'
import useUploadFile from 'src/hooks/useUploadFile'
import { rulesForContentTab } from 'src/views/applications/partials/ApplicationValidationRules'
import TopApplications from 'src/views/applications/partials/TopApplications'

const ApplicationContentTab = () => {
  const { File } = useApi()

  const {
    changeTab,
    saveApplication,
    validationErrors,
    setValidationErrors,
    applicationValues,
    setApplicationValues,
    validate,
    updatePreview,
    applications,
  } = useContext(ApplicationCreateContext)

  const { upload, fileLoading } = useUploadFile()

  const onInputChange = ({ target }) => {
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      setApplicationValues((prev) => ({ ...prev, [target.name]: +target.checked }))
      return
    }
    setApplicationValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const cleanupFiles = () => {
    document.getElementsByName('icon')[0].value = ''
    document.getElementsByName('images')[0].value = ''
  }

  const navigate = useNavigate()
  const redirectToApplications = () => {
    return navigate('/applications')
  }

  const onSaveNext = async () => {
    if (validate(rulesForContentTab()) && (await saveApplication(APPLICATION_FORM_STAGE_CONTENT))) {
      changeTab('commentsTab')
    }
  }

  const onSave = async () => {
    if (validate(rulesForContentTab()) && (await saveApplication(APPLICATION_FORM_STAGE_CONTENT))) {
      return navigate('/applications')
    }
  }

  const handleIconChange = (e) => {
    if (e.target.files.length > 0) {
      upload(e.target.files)
        .then((files) => {
          if (files.length > 0) {
            setApplicationValues((prev) => ({ ...prev, icon: files[0].path }))
          }
        })
        .catch((response) => {
          setValidationErrors(response.getErrors())
        })
    }
  }

  const handleImagesChange = (e) => {
    if (e.target.files.length > 0) {
      upload(e.target.files)
        .then((files) => {
          if (files.length > 0) {
            setApplicationValues((prev) => ({ ...prev, images: files.map((file) => file.id) }))
          }
        })
        .catch((response) => {
          setValidationErrors(response.getErrors())
        })
    }
  }

  const handleTopApplicationsChange = (topApplications) => {
    setApplicationValues((prev) => ({ ...prev, topApplications: topApplications }))
  }

  return (
    <>
      <CRow>
        <CCol xxl={12}>
          <CForm
            className="max-width-800 needs-validation"
            id="baseForm"
            noValidate
            validated={false}
          >
            <CFormInput
              className="mb-2"
              type="text"
              name="app_name"
              label="Название"
              aria-describedby="validationApplicationName"
              feedbackInvalid={validationErrors.app_name}
              invalid={!!validationErrors.app_name}
              value={applicationValues.app_name}
              onChange={onInputChange}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="text"
              name="developer_name"
              label="Имя разработчика"
              aria-describedby="validationDeveloperName"
              feedbackInvalid={validationErrors.developer_name}
              invalid={!!validationErrors.developer_name}
              value={applicationValues.developer_name}
              onChange={onInputChange}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="file"
              accept="image/*"
              name="icon"
              label="Иконка"
              aria-describedby="validationIcon"
              feedbackInvalid={validationErrors.icon}
              invalid={!!validationErrors.icon}
              onChange={handleIconChange}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="file"
              accept="image/*"
              name="images"
              label="Картинки"
              multiple
              aria-describedby="validationImages"
              feedbackInvalid={validationErrors.images}
              invalid={!!validationErrors.images}
              onChange={handleImagesChange}
            ></CFormInput>
            <CFormTextarea
              className="mb-2"
              name="description"
              label="Описание"
              aria-describedby="validationDescription"
              feedbackInvalid={validationErrors.description}
              invalid={!!validationErrors.description}
              value={applicationValues.description}
              onChange={onInputChange}
            ></CFormTextarea>
            <CInputGroup className="mb-2">
              <CFormSwitch
                size="xl"
                className="mt-1"
                style={{ width: '50px' }}
                name="display_top_bar"
                checked={!!applicationValues.display_top_bar}
                onChange={onInputChange}
              ></CFormSwitch>
              <span className="ml-2 mt-2">Топ-разработчик</span>
            </CInputGroup>
            <CFormInput
              className="mb-2"
              type="text"
              name="downloads_count"
              label="Количество скачиваний"
              aria-describedby="validationDownloadsCount"
              feedbackInvalid={validationErrors.downloads_count}
              invalid={!!validationErrors.downloads_count}
              value={applicationValues.downloads_count}
              onChange={onInputChange}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="number"
              name="rating"
              label="Рейтинг"
              aria-describedby="validationRating"
              feedbackInvalid={validationErrors.rating}
              invalid={!!validationErrors.rating}
              value={applicationValues.rating}
              onChange={onInputChange}
            ></CFormInput>
            <CInputGroup className="mb-2">
              <CFormSwitch
                size="xl"
                className="mt-1"
                style={{ width: '50px' }}
                name="display_app_bar"
                checked={!!applicationValues.display_app_bar}
                onChange={onInputChange}
              ></CFormSwitch>
              <span className="ml-2 mt-2">Топ приложения</span>
            </CInputGroup>
            {!!applicationValues.display_app_bar && (
              <TopApplications
                applications={applications}
                items={applicationValues.topApplications}
                onChange={handleTopApplicationsChange}
              ></TopApplications>
            )}
          </CForm>
          <div className="mt-3">
            <CButton
              color="cancel"
              className="px-4-5 rounded-pill"
              as="a"
              onClick={redirectToApplications}
            >
              Отмена
            </CButton>
            <div className="float-end">
              <CButton
                color="confirm"
                className="px-4-5 float-end rounded-pill ml-2"
                onClick={onSaveNext}
                disabled={fileLoading}
              >
                Сохранить и далее
              </CButton>
              <CButton
                color="confirm"
                className="px-4-5 float-end rounded-pill ml-2"
                onClick={onSave}
                disabled={fileLoading}
              >
                Сохранить
              </CButton>
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default ApplicationContentTab
