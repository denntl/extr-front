import { CButton, CButtonGroup, CPopover } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider'
import PropTypes from 'prop-types'
import { PERMISSION_ADMIN_PUSH_TEMPLATES_UPDATE } from 'src/enums/permissions'
import { pen } from 'src/assets/icons/icons'

const ActionColumn = ({ row }) => {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleNavigateToUpdate = () => {
    navigate(`/push-templates/update/${row.id}`)
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        {auth.can(PERMISSION_ADMIN_PUSH_TEMPLATES_UPDATE) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            onClick={handleNavigateToUpdate}
          >
            <CIcon icon={pen} />
          </CButton>
        )}
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
