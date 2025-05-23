import useApi from 'src/hooks/useApi'
import { CCard, CCardHeader } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import React from 'react'
import ActionColumn from './partials/ActionColumn'
import { useTranslation } from 'react-i18next'

const ApplicationsIndex = () => {
  const { AllApplications } = useApi()
  const { t } = useTranslation('listing')

  return (
    <>
      <CCard>
        <CCardHeader>{t('apps')}</CCardHeader>
        <Listing
          listingEntity={'all-applications'}
          settingsGetter={AllApplications.getApplicationSettings}
          dataGetter={AllApplications.getApplications}
          overwriteColumns={{
            actions: { renderer: ActionColumn, props: {} },
          }}
        />
      </CCard>
    </>
  )
}

export default ApplicationsIndex
