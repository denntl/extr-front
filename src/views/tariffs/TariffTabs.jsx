import { PERMISSION_ADMIN_TARIFF_UPDATE } from 'src/enums/permissions'
import { useTranslation } from 'react-i18next'

export const TAB_INSTALL = 'install'
export const TAB_SUBSCRIBE_TIERS = 'subscribe_tiers'

const TariffTabs = () => {
  const { t } = useTranslation('tariff')
  const tabs = [
    {
      label: t('tariffs_install_tabName'),
      value: TAB_INSTALL,
      link: '/tariffs',
      permission: PERMISSION_ADMIN_TARIFF_UPDATE,
    },
    {
      label: t('tariffs_subscription_tiers_tabName'),
      value: TAB_SUBSCRIBE_TIERS,
      link: '/tariffs/subscriptions',
      permission: PERMISSION_ADMIN_TARIFF_UPDATE,
    },
  ]

  return { tabs }
}

export default TariffTabs
