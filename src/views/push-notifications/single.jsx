import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import tabs, { TAB_SINGLE } from 'src/views/push-notifications/partials/tabs'
import React from 'react'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import ActionColumn from 'src/views/push-notifications/partials/actions'
import SingleTimeColumn from 'src/views/push-notifications/partials/SingleTimeColumn'

const PushNotificationsSingle = () => {
  const { PushNotifications } = useApi()

  return (
    <PageContainerWithTabs tabs={tabs} active={TAB_SINGLE}>
      <Listing
        settingsGetter={PushNotifications.getSingleListingSettings}
        dataGetter={PushNotifications.getSingleListingData}
        listingEntity="push-notifications-single"
        createLink="/push-notifications/create"
        overwriteColumns={{
          actions: { renderer: ActionColumn, props: {} },
          send_time: { renderer: SingleTimeColumn, props: {} },
        }}
      />
    </PageContainerWithTabs>
  )
}

export default PushNotificationsSingle
