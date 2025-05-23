import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import useApi from 'src/hooks/useApi'
import PropTypes from 'prop-types'
import SubmitDelete from './SubmitDelete'
import { PERMISSION_ADMIN_ROLE_DESTROY } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import { pen, trashBin } from 'src/assets/icons/icons'

const defaultData = [
  {
    roleIds: [],
    userId: null,
  },
]

const ActionColumn = ({ row, onRefreshListingData }) => {
  const navigate = useNavigate()
  const ConfirmModal = useConfirmModal()
  const auth = useAuth()
  const { Roles } = useApi()

  const [data, setData] = useState({})
  const [toDestroy, setToDestroy] = useState(defaultData)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    ConfirmModal.setConfirmCallback(async () => {
      return await onConfirmDelete()
    })
  }, [toDestroy])
  useEffect(() => {
    ConfirmModal.setErrorCallback(errors)
    ConfirmModal.setMessageCallback(message(data))
  }, [errors])

  const handleRolesSelect = (roleIds, userId) => {
    setToDestroy((prev) => {
      const updatedUsers = prev.map((user) => {
        if (user.userId === userId) {
          return { ...user, roleIds: roleIds }
        }
        return user
      })
      const userExists = prev.some((user) => user.userId === userId)
      if (!userExists) {
        updatedUsers.push({ userId, roleIds: roleIds })
      }
      return updatedUsers
    })
  }
  const message = (role) => {
    if (role.canBeDeleted) {
      return role.message
    }
    return (
      <>
        <p>{role.message}</p>
        <SubmitDelete values={role} errors={errors} onChange={handleRolesSelect} />
      </>
    )
  }
  const handleDeleteApplication = async () => {
    if (!auth.can(PERMISSION_ADMIN_ROLE_DESTROY)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }

    const role = await Roles.delete(row.id).catch((error) => {
      setErrors(error.getErrors())
    })

    setData(role.data)
    ConfirmModal.initAndOpen({
      message: message(role.data),
      size: 'lg',
      backdrop: 'static',
      errors: {},
      confirmCallback: async () => {
        return await onConfirmDelete()
      },
      rejectCallback: () => {
        setErrors({})
      },
    })
  }

  const onConfirmDelete = async () => {
    if (!auth.can(PERMISSION_ADMIN_ROLE_DESTROY)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }

    const response = await Roles.destroy(row.id, {
      users: toDestroy.filter((user) => user.userId !== null),
    }).catch((error) => {
      setErrors(error.getErrors())
      return error
    })
    if (response.isSuccess()) {
      onRefreshListingData()
    }
    return response
  }

  const handleNavigateToUpdate = () => {
    navigate(`/roles/update/${row.id}`)
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
        {auth.can(PERMISSION_ADMIN_ROLE_DESTROY) && (
          <CButton
            color="danger"
            disabled={row.is_predefined}
            className="btn-action"
            size="sm"
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
    is_predefined: PropTypes.bool.isRequired,
  }).isRequired,
  onRefreshListingData: PropTypes.func.isRequired,
}

export default ActionColumn
