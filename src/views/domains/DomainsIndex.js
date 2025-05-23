import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import ActionColumn from './partials/ActionColumn'

const PermissionsIndex = () => {
  const { Domains } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Домены</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={Domains.getDomainsSettings}
            dataGetter={Domains.getDomains}
            listingEntity={'domains'}
            createLink="/domains/create"
            overwriteColumns={{
              actions: { renderer: ActionColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default PermissionsIndex
