import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import UserActionColumn from 'src/views/users/partials/UserActionColumn'

const UsersIndex = () => {
  const { User } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Пользователи</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={User.getListingSettings}
            dataGetter={User.getListingData}
            listingEntity="users"
            overwriteColumns={{
              actions: { renderer: UserActionColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default UsersIndex
