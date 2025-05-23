import React, { useEffect, useState } from 'react'
import { CFormSwitch } from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { PERMISSION_CLIENT_USER_DEACTIVATE } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import useApi from 'src/hooks/useApi'
import CoverProvider from 'src/providers/CoverProvider'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import ChangeStatusDialog from 'src/views/my-company/partials/ChangeStatusDialog'

const toUpdateDefault = [
  {
    applicationId: null,
    userId: null,
  },
]
const defaultData = {
  canUpdate: false,
  domain: '',
  users: [
    {
      value: null,
      label: '',
    },
  ],
  applications: [],
}
const SwitchStatus = ({ row }) => {
  const auth = useAuth()
  const { MyUser } = useApi()
  const ConfirmModal = useConfirmModal()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(defaultData)
  const [active, setActive] = useState(row.status)
  const [errors, setErrors] = useState({})
  const [toUpdate, setToUpdate] = useState(toUpdateDefault)

  useEffect(() => {
    setActive(row.status)
    setLoading(false)
  }, [row])
  useEffect(() => {
    ConfirmModal.setConfirmCallback(async () => {
      return await onConfirmChangeStatus()
    })

    data.applications.length === toUpdate.length
      ? ConfirmModal.setConfirmDisabled(false)
      : ConfirmModal.setConfirmDisabled(true)
  }, [toUpdate])
  useEffect(() => {
    ConfirmModal.setErrorCallback(errors)
    ConfirmModal.setMessageCallback(message(data))
  }, [errors])

  const handleUserSelect = (userId, applicationId) => {
    setToUpdate((prev) => {
      const updatedPwaOwners = prev.map((pwa) => {
        if (pwa.applicationId === applicationId) {
          return { ...pwa, userId: userId }
        }
        return pwa
      })
      const pwaExists = prev.some((pwa) => pwa.applicationId === applicationId)
      if (!pwaExists) {
        updatedPwaOwners.push({ userId, applicationId: applicationId })
      }
      return updatedPwaOwners.filter((user) => user.userId !== null)
    })
  }

  const message = (user) => {
    if (user.canUpdate || user.isOwner) {
      return user.message
    }
    return (
      <>
        <p>{user.message}</p>
        <ChangeStatusDialog values={user} errors={errors} onChange={handleUserSelect} />
      </>
    )
  }
  const onConfirmChangeStatus = async () => {
    if (!auth.can(PERMISSION_CLIENT_USER_DEACTIVATE)) {
      return
    }
    const response = await MyUser.changeStatus(row.user_id, {
      status: !active,
      companyId: row.company_pid,
      newApplicationsOwners: toUpdate.filter((user) => user.userId !== null),
    }).catch((errors) => {
      setErrors(errors.getErrors())
      setLoading(false)
      return errors
    })
    if (response?.data.isUpdated) {
      setActive(!active)
    }
    setLoading(false)
    return response
  }
  const handleOnActiveChange = async () => {
    if (!auth.can(PERMISSION_CLIENT_USER_DEACTIVATE)) {
      return
    }
    setLoading(true)
    const response = await MyUser.canChangeStatus(row.user_id, {
      status: !active,
      companyId: row.company_pid,
    }).catch((errors) => {
      setErrors(errors.getErrors())
      setLoading(false)
    })

    setLoading(false)
    setData(response.data)
    ConfirmModal.initAndOpen({
      message: message(response.data),
      size: 'lg',
      backdrop: 'static',
      errors: {},
      confirmDisabled: !response.data.canUpdate,
      confirmCallback: async () => {
        return await onConfirmChangeStatus()
      },
      rejectCallback: () => {
        setErrors({})
      },
    })
  }

  return (
    <td>
      <CoverProvider isLoading={loading}>
        <CFormSwitch
          size="xl"
          className="form-switch-wide"
          name="is_active"
          disabled={!auth.can(PERMISSION_CLIENT_USER_DEACTIVATE)}
          checked={active}
          onChange={handleOnActiveChange}
        ></CFormSwitch>
      </CoverProvider>
    </td>
  )
}

SwitchStatus.propTypes = {
  row: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    company_pid: PropTypes.string.isRequired,
  }).isRequired,
}

export default SwitchStatus
