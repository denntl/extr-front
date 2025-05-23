import { CCard, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import CompanyTabs, { TAB_TRANSACTIONS } from 'src/views/companies/partials/CompanyTabs'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import { useParams } from 'react-router-dom'
import ActionViewColumn from 'src/views/companies/partials/ActionViewColumn'
import ActionAmountColumn from 'src/views/companies/partials/ActionAmountColumn'
import { useTranslation } from 'react-i18next'
import TransactionTypeColumn from 'src/views/companies/partials/TransactionTypeColumn'

export default function Index() {
  const { Company } = useApi()
  const { companyId } = useParams()
  const { t } = useTranslation('companies')

  return (
    <PageContainerWithTabs active={TAB_TRANSACTIONS} {...CompanyTabs({ companyId })}>
      <CCard>
        <CCardHeader>{t('label_transactions')}</CCardHeader>
        <Listing
          listingEntity={'company-balance-transactions'}
          settingsGetter={Company.getListingCompanyBalanceTransactionsSettings}
          dataGetter={Company.getListingCompanyBalanceTransactionsData}
          overwriteColumns={{
            type: { renderer: TransactionTypeColumn, props: {} },
            amount: { renderer: ActionAmountColumn, props: {} },
            actions: { renderer: ActionViewColumn, props: {} },
          }}
        />
      </CCard>
    </PageContainerWithTabs>
  )
}
