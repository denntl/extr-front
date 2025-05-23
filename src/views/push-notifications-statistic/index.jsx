import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import { useTranslation } from 'react-i18next'

const PushNotificationsStatistic = () => {
  const { PushNotificationsStatistic } = useApi()
  const { t } = useTranslation('push-notifications-statistic')

  return (
    <>
      <CCard>
        <CCardHeader>{t('header_title')}</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={PushNotificationsStatistic.getListingSettings}
            dataGetter={PushNotificationsStatistic.getListingData}
            listingEntity="pushNotificationsStatistic"
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default PushNotificationsStatistic
