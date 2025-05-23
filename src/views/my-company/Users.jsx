import React from 'react'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import tabs, { TAB_USERS } from 'src/views/my-company/partials/tabs'
import { CCardBody } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import SwitchStatus from 'src/views/my-company/partials/SwitchStatus'

export default function Index() {
  const { MyUser } = useApi()
  return (
    <PageContainerWithTabs active={TAB_USERS} tabs={tabs}>
      <CCardBody>
        <Listing
          listingEntity="my-users"
          settingsGetter={MyUser.getListingSettings}
          dataGetter={MyUser.getListingData}
          overwriteColumns={{
            status: { renderer: SwitchStatus, props: {} },
          }}
        />
      </CCardBody>
    </PageContainerWithTabs>
  )
}
