import React from 'react'
import { CButton, CCard, CCardBody } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import CompaniesNameColumn from 'src/views/tariffs/column/CompaniesNameColumn'
import ActionsColumn from 'src/views/tariffs/column/ActionsColumn'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import TariffTabs, { TAB_SUBSCRIBE_TIERS } from 'src/views/tariffs/TariffTabs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const SubscriptionTiersIndex = () => {
  const { Tariffs } = useApi()
  const { t } = useTranslation('tariff')
  const navigate = useNavigate()
  const handleNavigateToCreate = () => {
    navigate('/tariffs/subscriptions/create')
  }

  return (
    <PageContainerWithTabs active={TAB_SUBSCRIBE_TIERS} {...TariffTabs()}>
      <CCard>
        <CCardBody>
          <CButton
            color="confirm"
            className="px-4-5 float-end ml-10 mt-3"
            onClick={handleNavigateToCreate}
          >
            {t('tariffs_subscription_formCreateButton')}
          </CButton>
          <Listing
            settingsGetter={Tariffs.getSubscriptionTiersListingSettings}
            dataGetter={Tariffs.getSubscriptionTiersListingData}
            listingEntity="tariffs"
            overwriteColumns={{
              companies: { renderer: CompaniesNameColumn, props: {} },
              actions: { renderer: ActionsColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </PageContainerWithTabs>
  )
}

export default SubscriptionTiersIndex
