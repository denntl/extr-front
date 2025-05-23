import React from 'react'
import { CButton, CButtonGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import useApi from 'src/hooks/useApi'
import PropTypes from 'prop-types'
import {
  PERMISSION_CLIENT_APPLICATION_CLONE,
  PERMISSION_CLIENT_APPLICATION_DELETE,
} from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import { histogram, pen, clone, openPreview, trashBin } from 'src/assets/icons/icons'
import { useTranslation } from 'react-i18next'

const ActionColumn = ({ row, onRefreshListingData }) => {
  const navigate = useNavigate()
  const ConfirmModal = useConfirmModal()
  const { Application } = useApi()
  const auth = useAuth()
  const { t } = useTranslation('application')

  const handleCloneApplication = async () => {
    ConfirmModal.initAndOpen({
      message: t('clone_pwa_confirmation'),
      confirmCallback: async () => {
        if (!auth.can(PERMISSION_CLIENT_APPLICATION_CLONE)) {
          // fixme: DISPLAY PERMISSION ERROR
          console.log('У вас нет доступа к этой операции')
          return
        }
        const response = await Application.clone(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
        } else {
          // TODO: DISPLAY ERROR. Discuss it with MAX
          console.log(response)
        }
      },
      rejectCallback: () => {
        console.log('Action Column Reject')
      },
    })
  }

  const handleDeleteApplication = async () => {
    if (!auth.can(PERMISSION_CLIENT_APPLICATION_DELETE)) {
      console.log('У вас нет доступа к этой операции')
      return
    }
    ConfirmModal.initAndOpen({
      message: t('remove_pwa_confirmation', { app_name: row.name }),
      confirmCallback: async () => {
        const response = await Application.delete(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
          auth.refresh()
        } else {
          // TODO: DISPLAY ERROR. Discuss it with MAX
          console.log(response)
        }
      },
    })
  }

  const handleNavigateToUpdate = () => {
    navigate(`/applications/update/${row.id}`)
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        <CButton
          color="primary-pwa"
          className="btn-action"
          title={t('edit')}
          size="sm"
          onClick={handleNavigateToUpdate}
        >
          <CIcon icon={pen} />
        </CButton>
        <CButton color="primary-pwa" title={t('statistics')} className="btn-action" size="sm">
          <CIcon icon={histogram} />
        </CButton>
        {auth.can(PERMISSION_CLIENT_APPLICATION_CLONE) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            title={t('clone')}
            size="sm"
            onClick={handleCloneApplication}
          >
            <CIcon icon={clone} />
          </CButton>
        )}
        <CButton
          color="primary-pwa"
          className="btn-action"
          size="sm"
          title={t('preview')}
          as="a"
          href={`${import.meta.env.VITE_API_SERVER_URL}/preview/${row.app_uuid}`}
          target="_blank"
        >
          <CIcon icon={openPreview} />
        </CButton>
        {!!row.status && auth.can(PERMISSION_CLIENT_APPLICATION_DELETE) && (
          <CButton
            color="cancel"
            className="btn-action"
            size="sm"
            title={t('remove')}
            onClick={handleDeleteApplication}
          >
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
    status: PropTypes.number.isRequired,
    app_uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onRefreshListingData: PropTypes.func.isRequired,
}

export default ActionColumn
