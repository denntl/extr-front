import {
  CButton,
  CCol,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  PUSH_NOTIFICATION_TYPE_REGULAR,
  PUSH_NOTIFICATION_TYPE_SINGLE,
} from 'src/enums/push-notification-types'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import ImagePreview from 'src/components/custom/ImagePreview'

const PreviewModal = ({ visible, onClose, previewData, ...rest }) => {
  const { t } = useTranslation('client-push-notifications')
  const types = [
    { value: PUSH_NOTIFICATION_TYPE_SINGLE, label: 'push_notifications_tab_single' },
    { value: PUSH_NOTIFICATION_TYPE_REGULAR, label: 'push_notifications_tab_regular' },
  ]
  const [values, setValues] = useState()

  useEffect(() => {
    if (previewData?.values) {
      previewData.values = convertFromUTC(previewData?.values)
      setValues(previewData.values)
    }
  }, [previewData])

  const convertFromUTC = (values) => {
    let date = values.date
    if (!date) {
      date = moment().format('YYYY-MM-DD')
    }
    let dateTime = moment.tz(date + ' ' + values.time, 'UTC')
    dateTime.tz(moment.tz.guess())
    values.date = dateTime.format('YYYY-MM-DD')
    values.time = dateTime.format('HH:mm')
    return values
  }

  return (
    <>
      <CModal size="xl" visible={visible} onClose={onClose} alignment="center" {...rest}>
        <CModalHeader></CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormLabel className="mt-2">{t('push_notification_form_type')}</CFormLabel>
              <p>
                {t(
                  types.find((item) => {
                    return item.value === values?.type
                  })?.label,
                )}
              </p>
              <CFormLabel className="mt-2">{t('push_notification_form_name')}</CFormLabel>
              <p>{values?.name}</p>
              <CFormLabel className="mt-2">{t('push_notification_form_template')}</CFormLabel>
              <p>
                {
                  previewData?.templates.find((item) => {
                    return item.value === values?.push_template_id
                  })?.label
                }
              </p>
              {previewData?.values.type === PUSH_NOTIFICATION_TYPE_SINGLE && (
                <>
                  <CFormLabel className="mt-2">{t('push_notification_form_date')}</CFormLabel>
                  <p>{values?.date}</p>
                </>
              )}
              <CFormLabel className="mt-2">{t('push_notification_form_time')}</CFormLabel>
              <p>{values?.time}</p>
              <CFormLabel className="mt-2">{t('push_notification_form_title')}</CFormLabel>
              <p>{values?.title}</p>
              <CFormLabel className="mt-2">{t('push_notification_form_content')}</CFormLabel>
              <p>{values?.content}</p>
              <CFormLabel className="mt-2">{t('push_notification_form_link')}</CFormLabel>
              <p>{values?.link}</p>
            </CCol>
            <CCol>
              <CFormLabel className="mt-2">{t('push_notification_form_application')}</CFormLabel>
              <p>
                {
                  previewData?.applications.find((item) => {
                    return item.value === values?.application_id
                  })?.label
                }
              </p>
              <CFormLabel className="mt-2">{t('push_notification_form_events')}</CFormLabel>
              <p>
                {previewData?.events
                  .filter((item) => {
                    return values?.events.includes(item.value)
                  })
                  .map((item) => item.label)
                  .join(', ')}
              </p>
              <CFormLabel className="mt-2">{t('push_notification_form_geo')}</CFormLabel>
              <p>
                {previewData?.geos
                  .filter((item) => {
                    return values?.geo.includes(item.value)
                  })
                  .map((item) => item.label)
                  .join(', ')}
              </p>
              <CFormLabel className="mt-2">{t('push_notification_form_icon')}</CFormLabel>
              {values?.icon && <ImagePreview className="mb-2" url={values?.icon} />}
              <CFormLabel className="mt-2">{t('push_notification_form_image')}</CFormLabel>
              {values?.icon && <ImagePreview className="mb-2" url={values?.image} />}
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  )
}

export default PreviewModal

PreviewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  previewData: PropTypes.object,
}
