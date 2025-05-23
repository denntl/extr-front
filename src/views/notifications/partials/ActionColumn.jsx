import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CFormFeedback, CFormSwitch } from '@coreui/react-pro'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'
import { PERMISSION_CLIENT_NOTIFICATION_ACTIVATE } from 'src/enums/permissions'
const ActionColumn = ({ row }) => {
  const { Notifications } = useApi()
  const auth = useAuth()

  const [active, setActive] = useState(row.is_enabled)
  const [error, setError] = useState()

  const handleOnActiveChange = () => {
    if (!auth.can(PERMISSION_CLIENT_NOTIFICATION_ACTIVATE)) {
      setError('У вас нет доступа к этой операции')
      return
    }
    Notifications.setActive(row.id, !active).then(
      (response) => {
        setActive(!active)
      },
      (error) => {
        setError(error.data[0])
      },
    )
  }

  return (
    <td>
      <CFormSwitch
        size="xl"
        className="form-switch-wide"
        name="isActive"
        disabled={!auth.can(PERMISSION_CLIENT_NOTIFICATION_ACTIVATE)}
        checked={active}
        invalid={!!error}
        onChange={handleOnActiveChange}
      ></CFormSwitch>
      <CFormFeedback invalid={!!error} id="isActiveValidation">
        {error}
      </CFormFeedback>
    </td>
  )
}

ActionColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    is_enabled: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ActionColumn
