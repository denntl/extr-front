import React, { useMemo } from 'react'
import 'simplebar-react/dist/simplebar.min.css'
import { CLink } from '@coreui/react-pro'
import { useAuth } from 'src/providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import { TARIFF_TYPE_INSTALL, TARIFF_TYPE_SUBSCRIPTION_TIERS } from 'src/enums/tariff-types'

export const AppHeaderCurrentTariff = () => {
  const auth = useAuth()
  const { t } = useTranslation('tariff')
  const tariffTypeId = auth.params?.tariff_type_id
  const { name } = useMemo(() => {
    switch (tariffTypeId) {
      case TARIFF_TYPE_INSTALL:
        return {
          name: 'tariffs_install_headerName',
        }
      case TARIFF_TYPE_SUBSCRIPTION_TIERS:
        return {
          name: 'tariffs_subscription_tiers_tabName',
        }
      case undefined:
        return {
          name: '',
        }
      default:
        throw new Error(`Unknown tariff type ID: ${tariffTypeId}`)
    }
  }, [tariffTypeId])

  return (
    <>
      {t('current_tariff')}:
      <CLink className="ml-2 text-sky-blue-pwa text-decoration-none">{t(name)}</CLink>
    </>
  )
}

AppHeaderCurrentTariff.propTypes = {}
