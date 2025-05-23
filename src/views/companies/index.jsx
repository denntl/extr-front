import { CCard, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import ActionColumn from 'src/views/companies/partials/ActionColumn'

export default function Index() {
  const { Company } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Компании</CCardHeader>
        <Listing
          listingEntity={'companies'}
          settingsGetter={Company.getListingSettings}
          dataGetter={Company.getListingData}
          overwriteColumns={{
            actions: { renderer: ActionColumn, props: {} },
          }}
        />
      </CCard>
    </>
  )
}
