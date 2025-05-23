import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react-pro'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const TierColumn = ({ tierData, tierId }) => {
  const { t } = useTranslation('tariff')
  const { t: tCountries } = useTranslation('countries')

  return (
    <CCol xs>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center flex-wrap p-3">
          <CCardTitle className="text-black dark:text-white m-0 flex-grow-1">
            {tierData.name}
          </CCardTitle>
          <CInputGroup className="input-label flex-grow-0">
            <CInputGroupText className="input-label--sign__left">&#36;</CInputGroupText>
            <CFormInput
              key={tierId}
              className="input-label--input"
              placeholder={`${t('placeholder_tier_name')} ${tierData.name}`}
              value={Number.parseFloat(tierData.price).toFixed(2)}
              disabled={true} // Поле отключено, чтобы оно было только для чтения
            />
          </CInputGroup>
        </CCardHeader>
        <CCardBody>
          {Array.isArray(tierData.countries) &&
            tierData.countries.map((item) => (
              <div key={item} className="mb-1 text-grey-pwa font-weight-500">
                {tCountries(item)}
              </div>
            ))}
        </CCardBody>
      </CCard>
    </CCol>
  )
}

TierColumn.propTypes = {
  tierData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tierId: PropTypes.string.isRequired,
}

export default TierColumn
