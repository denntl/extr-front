import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import ActionColumn from 'src/views/roles/partials/ActionColumn'

const RolesIndex = () => {
  const { Roles } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Роли</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={Roles.getListingSettings}
            dataGetter={Roles.getListingData}
            listingEntity={'role'}
            createLink="/roles/create"
            overwriteColumns={{
              actions: { renderer: ActionColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default RolesIndex
