import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import ActionColumn from 'src/views/system-notifications/partials/ActionColumn'
import { PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'

const SystemNotifications = () => {
  const { SystemNotifications } = useApi()
  const auth = useAuth()

  return (
    <>
      <CCard>
        <CCardHeader>Уведомления</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={SystemNotifications.getListingSettings}
            dataGetter={SystemNotifications.getListingData}
            listingEntity="systemNotifications"
            createLink={
              auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE)
                ? '/notifications/create'
                : ''
            }
            overwriteColumns={{
              actions: { renderer: ActionColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default SystemNotifications
