import React, { useState } from 'react'
import { CCardBody, CContainer } from '@coreui/react-pro'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import CoverProvider from 'src/providers/CoverProvider'
import { useTranslation } from 'react-i18next'
import { PERMISSION_ADMIN_TARIFF_UPDATE } from 'src/enums/permissions'
import { TARIFF_TYPE_INSTALL } from 'src/enums/tariff-types'
import { useAuth } from 'src/providers/AuthProvider'
import InstallEdit from 'src/views/tariffs/InstallEdit'
import TariffTabs, { TAB_INSTALL, TAB_SUBSCRIBE_TIERS } from 'src/views/tariffs/TariffTabs'
import SubscriptionTiersEdit from 'src/views/tariffs/SubscriptionTiersEdit'

const TariffEdit = ({ tariffTypeId }) => {
  const auth = useAuth()
  const { t } = useTranslation('tariff')
  const [updateDenied, setUpdateDenied] = useState(!auth.can(PERMISSION_ADMIN_TARIFF_UPDATE))

  const activeTab = tariffTypeId === TARIFF_TYPE_INSTALL ? TAB_INSTALL : TAB_SUBSCRIBE_TIERS
  const [loading, setLoading] = useState(true)

  return (
    <PageContainerWithTabs active={activeTab} {...TariffTabs()}>
      <CoverProvider isLoading={loading}>
        <CCardBody>
          <CContainer>
            {activeTab === TAB_INSTALL && (
              <InstallEdit updateDenied={updateDenied} setLoading={setLoading} />
            )}
            {activeTab === TAB_SUBSCRIBE_TIERS && (
              <SubscriptionTiersEdit updateDenied={updateDenied} setLoading={setLoading} />
            )}
          </CContainer>
        </CCardBody>
      </CoverProvider>
    </PageContainerWithTabs>
  )
}

TariffEdit.propTypes = {
  tariffTypeId: Number,
}

export default TariffEdit
