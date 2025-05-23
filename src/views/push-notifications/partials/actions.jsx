import { CButton, CButtonGroup, CPopover } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilColorBorder,
  cilCopy,
  cilEyedropper,
  cilPlus,
  cilTrash,
  cilWindowMaximize,
} from '@coreui/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider'
import PropTypes from 'prop-types'
import {
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_COPY,
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_DELETE,
  PERMISSION_MANAGE_PUSH_NOTIFICATION_READ,
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_UPDATE,
} from 'src/enums/permissions'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import useApi from 'src/hooks/useApi'
import {
  PUSH_NOTIFICATION_TYPE_REGULAR,
  PUSH_NOTIFICATION_TYPE_SINGLE,
} from 'src/enums/push-notification-types'
import {
  PUSH_NOTIFICATION_STATUS_DRAFT,
  PUSH_NOTIFICATION_STATUS_SENT,
} from 'src/enums/push-notification-statuses'
import PreviewModal from 'src/views/push-notifications/partials/previewModal'
import moment from 'moment-timezone'
import { pen, trashBin } from 'src/assets/icons/icons'

const ActionColumn = ({ row, onRefreshListingData }) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const ConfirmModal = useConfirmModal()
  const { PushNotifications } = useApi()

  const [preview, setPreview] = useState(false)
  const [viewValues, setViewValues] = useState()

  const handleNavigateToUpdate = () => {
    navigate(`/push-notifications/update/${row.id}`)
  }

  const handleDelete = () => {
    ConfirmModal.initAndOpen({
      message: 'Вы действительно хотите удалить?',
      confirmCallback: async () => {
        const response = await PushNotifications.delete(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
        }
      },
    })
  }

  const handleCopy = () => {
    PushNotifications.copy(row.id).then(() => {
      onRefreshListingData()
    })
  }

  const handleView = () => {
    setPreview(true)
    PushNotifications.edit(row.id).then((response) => {
      setViewValues(response.data)
    })
  }

  const handleCloseView = () => {
    setPreview(false)
  }

  const canEdit = () => {
    if (row.type === PUSH_NOTIFICATION_TYPE_REGULAR) {
      return true
    }
    if (row.status === PUSH_NOTIFICATION_STATUS_DRAFT) {
      return true
    }
    const dateTime = moment.tz(row.send_time, 'UTC')
    const current = moment().add(5, 'minute')
    return row.status !== PUSH_NOTIFICATION_STATUS_SENT && dateTime.diff(current) > 0
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        {auth.can(PERMISSION_ADMIN_PUSH_NOTIFICATIONS_UPDATE) && canEdit() && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            onClick={handleNavigateToUpdate}
          >
            <CIcon icon={pen} />
          </CButton>
        )}
        {auth.can(PERMISSION_ADMIN_PUSH_NOTIFICATIONS_COPY) && (
          <CButton color="info" className="btn-action" size="sm" onClick={handleCopy}>
            <CIcon icon={cilCopy} />
          </CButton>
        )}
        {auth.can(PERMISSION_MANAGE_PUSH_NOTIFICATION_READ) && (
          <>
            <CButton color="warning" className="btn-action" size="sm" onClick={handleView}>
              <CIcon icon={cilWindowMaximize} />
            </CButton>
            <PreviewModal visible={preview} previewData={viewValues} onClose={handleCloseView} />
          </>
        )}
        {auth.can(PERMISSION_ADMIN_PUSH_NOTIFICATIONS_DELETE) && canEdit() && (
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
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    send_time: PropTypes.string,
  }).isRequired,
  onRefreshListingData: PropTypes.func,
}
export default ActionColumn
