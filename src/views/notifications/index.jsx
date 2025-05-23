import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import ActionColumn from 'src/views/notifications/partials/ActionColumn'

const Notifications = () => {
  const { Notifications } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Мои уведомления</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={Notifications.getListingSettings}
            dataGetter={Notifications.getListingData}
            listingEntity="clientSystemNotifications"
            overwriteColumns={{
              actions: { renderer: ActionColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Notifications
