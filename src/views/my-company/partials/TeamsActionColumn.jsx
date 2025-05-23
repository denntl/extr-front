import { useNavigate } from 'react-router-dom'
import { CButton, CButtonGroup, CPopover } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'
import {
  PERMISSION_CLIENT_TEAM_INVITE,
  PERMISSION_CLIENT_TEAM_UPDATE,
  PERMISSION_CLIENT_TEAM_DELETE,
} from 'src/enums/permissions'
import { useTranslation } from 'react-i18next'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import { pen, trashBin } from 'src/assets/icons/icons'

const ActionColumn = ({ row, onRefreshListingData }) => {
  const { Company, Team } = useApi()
  const navigate = useNavigate()
  const auth = useAuth()
  const { t } = useTranslation('client')
  const ConfirmModal = useConfirmModal()

  const handleNavigateToUpdate = () => {
    navigate(`/my-company/teams/update/${row.id}`)
  }

  const handleInvite = () => {
    if (!auth.can(PERMISSION_CLIENT_TEAM_INVITE)) {
      console.log('У вас нет доступа к этой операции')
      return
    }
    Company.inviteTeam(row.id).then(async (response) => {
      await navigator.clipboard.writeText(
        `${window.location.origin}/admin/invite/${response.data.key}`,
      )
    })
  }

  const handleDelete = () => {
    if (!auth.can(PERMISSION_CLIENT_TEAM_DELETE)) {
      console.log('У вас нет доступа к этой операции')
      return
    }

    ConfirmModal.initAndOpen({
      message: t('delete_team_confirmation') + ` ${row.name}?`,
      size: 'lg',
      backdrop: 'static',
      errors: {},
      confirmCallback: async () => {
        const response = await Team.destroy(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
        }
        return response
      },
    })
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        {auth.can(PERMISSION_CLIENT_TEAM_UPDATE) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            onClick={handleNavigateToUpdate}
          >
            <CIcon icon={pen} />
          </CButton>
        )}
        {auth.can(PERMISSION_CLIENT_TEAM_INVITE) && (
          <CPopover
            content={t('company_invite_copy_message')}
            placement="top"
            trigger="focus"
            key={row.id}
          >
            <CButton color="primary-pwa" className="btn-action" size="sm" onClick={handleInvite}>
              <CIcon icon={cilPlus} />
            </CButton>
          </CPopover>
        )}
        {auth.can(PERMISSION_CLIENT_TEAM_DELETE) && (
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
    name: PropTypes.string.isRequired,
  }).isRequired,
  onRefreshListingData: PropTypes.func.isRequired,
}

export default ActionColumn
