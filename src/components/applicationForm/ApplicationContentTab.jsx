import React, { useContext, useMemo } from 'react'
import { ApplicationCreateContext } from './Index'
import {
  CAlert,
  CBadge,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CInputGroup,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import FileInputWithPreview from 'src/components/custom/FileInputWithPreview'
import TopApplications from 'src/views/applications/partials/TopApplications'
import ImagesPreview from 'src/components/applicationForm/ImagesPreview'
import FileInputButton from 'src/components/custom/FileInputButton'
import FileInputButtonWithUpload from 'src/components/custom/FileInputButtonWithUpload'
import CIcon from '@coreui/icons-react'
import { cilInfo, cilWarning } from '@coreui/icons'

const ApplicationContentTab = () => {
  const { t } = useTranslation('application')
  const { application, onChange, validationErrors, setValidationErrors, settings } =
    useContext(ApplicationCreateContext)

  const topApplicationIds = useMemo(() => application.topApplicationIds || [], [application])

  const handleInputChanged = ({ target: { value, name } }) => onChange(value, name)

  const handleSwitchChanged = ({ target: { checked, name } }) => onChange(checked, name)

  const handleIconChanged = (values, name, errors) => {
    if (values) {
      onChange(Array.isArray(values) ? values[0].path : values.path, name)
    }
    if (errors) {
      setValidationErrors(errors)
    }
  }

  const handleImagesChange = (values, name, errors) => {
    if (values) {
      const images = [...(application.files ?? []), ...values]
      onChange(images, name)
    }
    if (errors) {
      setValidationErrors(errors)
    }
  }

  const handleIconChangePreview = (items) => {
    if (items.length) {
      onChange(items[0]?.path, 'icon')
    } else {
      onChange(null, 'icon')
    }
  }

  const handleImagesChangePreview = (items) => {
    onChange(items, 'files')
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
              label={t('applicationNameLabel')}
              aria-describedby="validationApplicationName"
              feedbackInvalid={validationErrors.app_name}
              invalid={!!validationErrors.app_name}
              value={application.app_name}
              onChange={handleInputChanged}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="text"
              name="developer_name"
              label={t('applicationDevLabel')}
              aria-describedby="validationDeveloperName"
              feedbackInvalid={validationErrors.developer_name}
              invalid={!!validationErrors.developer_name}
              value={application.developer_name}
              onChange={handleInputChanged}
            ></CFormInput>
            <CFormLabel className="mt-2 mb-3">{t('iconLabel')}</CFormLabel>
            <div className="d-flex">
              <FileInputButtonWithUpload
                className="mb-2 w-25"
                type="file"
                accept="image/*"
                name="icon"
                aria-describedby="validationIcon"
                feedbackInvalid={validationErrors.icon}
                invalid={!!validationErrors.icon}
                onChange={handleIconChanged}
                buttonText={t('upload_file')}
              />
              <CTooltip content={t('iconInfoMessage')}>
                <CBadge color="secondary" className="ml-2 mb-2 align-content-center">
                  <CIcon icon={cilInfo} />
                </CBadge>
              </CTooltip>
            </div>
            <ImagesPreview
              onChange={handleIconChangePreview}
              items={application.icon ? [{ path: application.icon }] : []}
            />
            <CFormLabel className="mt-2 mb-3">{t('imagesLabel')}</CFormLabel>
            <div className="d-flex">
              <FileInputButtonWithUpload
                className="mb-2 w-25"
                type="file"
                accept="image/*"
                name="files"
                multiple
                aria-describedby="validationImages"
                feedbackInvalid={validationErrors.files}
                invalid={!!validationErrors.files}
                onChange={handleImagesChange}
                buttonText={t('upload_file')}
              />
              <CTooltip content={t('imagesInfoMessage')}>
                <CBadge color="secondary" className="ml-2 mb-2 align-content-center">
                  <CIcon icon={cilInfo} />
                </CBadge>
              </CTooltip>
            </div>
            <ImagesPreview
              className="mb-2"
              onChange={handleImagesChangePreview}
              items={application.files}
            />
            {application.files.length > 8 && (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>{t('files_count_warning')}</div>
              </CAlert>
            )}

            <CFormTextarea
              className="mb-2"
              name="description"
              label={t('descriptionLabel')}
              aria-describedby="validationDescription"
              feedbackInvalid={validationErrors.description}
              invalid={!!validationErrors.description}
              value={application.description}
              onChange={handleInputChanged}
            ></CFormTextarea>
            <CInputGroup className="mb-2">
              <CFormSwitch
                size="xl"
                className="mt-1"
                style={{ width: '50px' }}
                name="display_top_bar"
                checked={!!application.display_top_bar}
                onChange={handleSwitchChanged}
              ></CFormSwitch>
              <span className="ml-2 mt-2">{t('topDeveloper')}</span>
            </CInputGroup>
            <CFormInput
              className="mb-2"
              type="text"
              name="downloads_count"
              label={t('downloadsCountLabel')}
              aria-describedby="validationDownloadsCount"
              feedbackInvalid={validationErrors.downloads_count}
              invalid={!!validationErrors.downloads_count}
              value={application.downloads_count}
              onChange={handleInputChanged}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="number"
              name="rating"
              max={5}
              min={0}
              step={0.1}
              label={t('ratingLabel')}
              aria-describedby="validationRating"
              feedbackInvalid={validationErrors.rating}
              invalid={!!validationErrors.rating}
              value={application.rating}
              onChange={handleInputChanged}
            ></CFormInput>
            <CInputGroup className="mb-2">
              <CFormSwitch
                size="xl"
                className="mt-1"
                style={{ width: '50px' }}
                name="display_app_bar"
                checked={!!application.display_app_bar}
                onChange={handleSwitchChanged}
              ></CFormSwitch>
              <span className="ml-2 mt-2">{t('displayAppBarLabel')}</span>
            </CInputGroup>
            {!!application.display_app_bar && (
              <TopApplications
                applications={settings.applications || []}
                items={topApplicationIds}
                onChange={onChange}
              ></TopApplications>
            )}
          </CForm>
        </CCol>
      </CRow>
    </>
  )
}

export default ApplicationContentTab
