import React from 'react'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import ActionColumn from 'src/views/push-templates/partials/actions'
import { useAuth } from 'src/providers/AuthProvider'
import { PERMISSION_ADMIN_PUSH_TEMPLATES_STORE } from 'src/enums/permissions'

const PushTemplatesIndex = () => {
  const { PushTemplates } = useApi()
  const auth = useAuth()

  return (
    <>
      <CCard>
        <CCardHeader>Шаблоны</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={PushTemplates.getListingSettings}
            dataGetter={PushTemplates.getListingData}
            listingEntity="push-templates"
            createLink={
              auth.can(PERMISSION_ADMIN_PUSH_TEMPLATES_STORE) ? '/push-templates/create' : ''
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

export default PushTemplatesIndex
