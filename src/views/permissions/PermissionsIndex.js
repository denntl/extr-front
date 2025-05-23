import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'

const PermissionsIndex = () => {
  const { Permissions } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Пермишены</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={Permissions.getPermissionSettings}
            dataGetter={Permissions.getPermissions}
            listingEntity={'permissions'}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default PermissionsIndex
