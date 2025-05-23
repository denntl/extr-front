import React from 'react'
import { CButton, CButtonGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { pen } from 'src/assets/icons/icons'

const ActionColumn = ({ row }) => {
  const navigate = useNavigate()

  const handleNavigateToUpdate = () => {
    navigate(`/companies/update/${row.id}`)
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        <CButton
          color="primary-pwa"
          className="btn-action"
          size="sm"
          onClick={handleNavigateToUpdate}
        >
          <CIcon icon={pen} />
        </CButton>
      </CButtonGroup>
    </td>
  )
}

ActionColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
}

export default ActionColumn
