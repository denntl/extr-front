import { useNavigate } from 'react-router-dom'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'
import {
  PERMISSION_MANAGE_APPLICATION_CLONE,
  PERMISSION_MANAGE_APPLICATION_DELETE,
} from 'src/enums/permissions'
import { CButton, CButtonGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import React from 'react'
import { histogram, pen, clone, openPreview, trashBin, restore } from 'src/assets/icons/icons'
import { useTranslation } from 'react-i18next'

const ActionColumn = ({ row, onRefreshListingData }) => {
  const navigate = useNavigate()
  const ConfirmModal = useConfirmModal()
  const { AllApplications } = useApi()
  const auth = useAuth()
  const { t } = useTranslation('application')

  const handleCloneApplication = async () => {
    ConfirmModal.initAndOpen({
      message: t('clone_pwa_confirmation'),
      confirmCallback: async () => {
        if (!auth.can(PERMISSION_MANAGE_APPLICATION_CLONE)) {
          // fixme: DISPLAY PERMISSION ERROR
          console.log('У вас нет доступа к этой операции')
          return
        }
        const response = await AllApplications.clone(row.id)
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
    if (!auth.can(PERMISSION_MANAGE_APPLICATION_DELETE)) {
      console.log('У вас нет доступа к этой операции')
      return
    }
    ConfirmModal.initAndOpen({
      message: t('remove_pwa_confirmation', { app_name: row.name }),
      confirmCallback: async () => {
        const response = await AllApplications.delete(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
        } else {
          // TODO: DISPLAY ERROR. Discuss it with MAX
          console.log(response)
        }
      },
    })
  }

  const handleRestoreApplication = () => {
    if (!auth.can(PERMISSION_MANAGE_APPLICATION_DELETE)) {
      console.log('У вас нет доступа к этой операции')
      return
    }
    ConfirmModal.initAndOpen({
      message: t('restore_pwa_confirmation', { app_name: row.name }),
      confirmCallback: async () => {
        const response = await AllApplications.restore(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
        } else {
          // TODO: DISPLAY ERROR. Discuss it with MAX
          console.log(response)
        }
      },
    })
  }

  const handleNavigateToUpdate = () => {
    navigate(`/all-applications/update/${row.id}`)
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        <CButton
          color="primary-pwa"
          className="btn-action"
          size="sm"
          title={t('edit')}
          onClick={handleNavigateToUpdate}
        >
          <CIcon icon={pen} />
        </CButton>
        <CButton color="primary-pwa" title={t('statistics')} className="btn-action" size="sm">
          <CIcon icon={histogram} />
        </CButton>
        {auth.can(PERMISSION_MANAGE_APPLICATION_CLONE) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            title={t('clone')}
            onClick={handleCloneApplication}
          >
            <CIcon icon={clone} />
          </CButton>
        )}
        <CButton
          color="primary-pwa"
          className="btn-action"
          size="sm"
          as="a"
          href={`${import.meta.env.VITE_API_SERVER_URL}/preview/${row.app_uuid}`}
          target="_blank"
          title={t('preview')}
        >
          <CIcon icon={openPreview} />
        </CButton>
        {!!row.status && !row?.deleted && auth.can(PERMISSION_MANAGE_APPLICATION_DELETE) && (
          <CButton
            color="danger"
            className="btn-action"
            size="sm"
            title={t('remove')}
            onClick={handleDeleteApplication}
          >
            <CIcon icon={trashBin} />
          </CButton>
        )}
        {!!row.status && row?.deleted && auth.can(PERMISSION_MANAGE_APPLICATION_DELETE) && (
          <CButton
            color="primary-pwa"
            size="sm"
            title={t('restore_pwa')}
            onClick={handleRestoreApplication}
          >
            <CIcon icon={restore} />
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
    deleted: PropTypes.string,
  }).isRequired,
  onRefreshListingData: PropTypes.func.isRequired,
}

export default ActionColumn
