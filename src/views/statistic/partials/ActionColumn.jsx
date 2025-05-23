import React from 'react'
import { CButton, CButtonGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { moreDetails } from 'src/assets/icons/icons'
import { useTranslation } from 'react-i18next'

const ActionColumn = ({ row }) => {
  const navigate = useNavigate()
  const { t } = useTranslation('application')

  const handleNavigateToDetail = () => {
    navigate(`/statistic/${row.id}`)
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        <CButton
          color="primary-pwa"
          className="btn-action"
          size="sm"
          title={t('more_details')}
          onClick={handleNavigateToDetail}
        >
          <CIcon icon={moreDetails} />
        </CButton>
      </CButtonGroup>
    </td>
  )
}

ActionColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onRefreshListingData: PropTypes.func.isRequired,
}

export default ActionColumn
