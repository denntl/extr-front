import { CButton, CButtonGroup } from '@coreui/react-pro'
import React from 'react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useApi from 'src/hooks/useApi'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import {
  PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_DELETE,
  PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_UPDATE,
} from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import { pen, trashBin } from 'src/assets/icons/icons'

const ActionColumn = ({ row, onRefreshListingData }) => {
  const navigate = useNavigate()
  const { SystemNotifications } = useApi()
  const ConfirmModal = useConfirmModal()
  const auth = useAuth()

  const handleNavigateToUpdate = () => {
    navigate(`/notifications/update/${row.id}`)
  }

  const handleDelete = () => {
    ConfirmModal.initAndOpen({
      message: 'Вы уверены?',
      confirmCallback: () => {
        if (!auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_DELETE)) {
          console.log('У вас нет доступа к этой операции')
          return
        }
        SystemNotifications.delete(row.id).then(() => {
          onRefreshListingData()
        })
      },
    })
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        {auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_UPDATE) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            onClick={handleNavigateToUpdate}
          >
            <CIcon icon={pen} />
          </CButton>
        )}
        {auth.can(PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_DELETE) && (
          <CButton color="danger" className="btn-action" size="sm" onClick={handleDelete}>
            <CIcon icon={trashBin} />
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
  onRefreshListingData: PropTypes.func.isRequired,
}

export default ActionColumn
