import PropTypes from 'prop-types'
import {
  PERMISSION_ADMIN_COMPANY_BALANCE_TRANSACTIONS_READ,
  PERMISSION_ADMIN_COMPANY_MANUAL_BALANCE_DEPOSIT,
  PERMISSION_ADMIN_COMPANY_UPDATE,
} from 'src/enums/permissions'
import { useTranslation } from 'react-i18next'

export const TAB_EDIT = 'tab_edit'
export const TAB_MANUAL_BALANCE_DEPOSIT = 'tab_manual_balance_deposit'
export const TAB_TRANSACTIONS = 'transactions'

const CompanyTabs = ({ companyId }) => {
  const { t } = useTranslation('companies')
  const tabs = [
    {
      label: t('label_company_edit'),
      value: TAB_EDIT,
      link: `/companies/update/${companyId}`,
      permission: PERMISSION_ADMIN_COMPANY_UPDATE,
    },
    {
      label: t('label_manual_balance_deposit'),
      value: TAB_MANUAL_BALANCE_DEPOSIT,
      link: `/companies/manual-balance-deposit/${companyId}`,
      permission: PERMISSION_ADMIN_COMPANY_MANUAL_BALANCE_DEPOSIT,
    },
    {
      label: t('label_transactions'),
      value: TAB_TRANSACTIONS,
      link: `/companies/transactions/${companyId}`,
      permission: PERMISSION_ADMIN_COMPANY_BALANCE_TRANSACTIONS_READ,
    },
  ]

  return { tabs }
}

CompanyTabs.propTypes = {
  companyId: PropTypes.string.isRequired,
}

export default CompanyTabs
