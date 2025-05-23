import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import tabs, { TAB_REGULAR } from 'src/views/push-notifications/partials/tabs'
import React from 'react'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import ActionColumn from 'src/views/push-notifications/partials/actions'
import RegularTimeColumn from 'src/views/push-notifications/partials/RegularTimeColumn'

const PushNotificationsRegular = () => {
  const { PushNotifications } = useApi()

  return (
    <PageContainerWithTabs tabs={tabs} active={TAB_REGULAR}>
      <Listing
        settingsGetter={PushNotifications.getRegularListingSettings}
        dataGetter={PushNotifications.getRegularListingData}
        listingEntity="push-notifications-regular"
        createLink="/push-notifications/create"
        overwriteColumns={{
          actions: { renderer: ActionColumn, props: {} },
          send_time: { renderer: RegularTimeColumn, props: {} },
        }}
      />
    </PageContainerWithTabs>
  )
}

export default PushNotificationsRegular
