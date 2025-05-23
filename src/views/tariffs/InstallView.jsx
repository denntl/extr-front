import React from 'react'
import { CContainer, CRow } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import TierColumn from 'src/views/tariffs/column/TierColumn'
import PropTypes from 'prop-types'

const InstallView = ({ data }) => {
  const { t } = useTranslation('tariff')

  return (
    <CContainer fluid>
      <h1 className="mt-2 fs-3">{t('tariffs_install_titleName')}</h1>
      <CRow className="mt-2" xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 4 }}>
        {Object.entries(data.tiers).map(([tierId, tierData]) => (
          <TierColumn key={tierId} tierData={tierData} tierId={tierId} />
        ))}
      </CRow>
    </CContainer>
  )
}

InstallView.propTypes = {
  data: PropTypes.object.isRequired,
}

export default InstallView
