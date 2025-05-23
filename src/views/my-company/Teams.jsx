import React from 'react'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import tabs, { TAB_TEAMS } from 'src/views/my-company/partials/tabs'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import TeamsActionColumn from 'src/views/my-company/partials/TeamsActionColumn'
import { PERMISSION_CLIENT_TEAM_CREATE } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'

export default function Index() {
  const { Team } = useApi()
  const auth = useAuth()

  return (
    <PageContainerWithTabs active={TAB_TEAMS} tabs={tabs}>
      <Listing
        settingsGetter={Team.getListingSettings}
        dataGetter={Team.getListingData}
        listingEntity="teams"
        createLink={auth.can(PERMISSION_CLIENT_TEAM_CREATE) ? '/my-company/teams/create' : ''}
        overwriteColumns={{
          actions: { renderer: TeamsActionColumn, props: {} },
        }}
      />
    </PageContainerWithTabs>
  )
}
