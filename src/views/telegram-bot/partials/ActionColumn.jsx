import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CFormFeedback, CFormSwitch } from '@coreui/react-pro'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'
import { PERMISSION_ADMIN_TG_BOT_ACTIVE } from 'src/enums/permissions'
const ActionColumn = ({ row }) => {
  const { Telegram } = useApi()
  const auth = useAuth()

  const [active, setActive] = useState(row.is_active)
  const [error, setError] = useState()

  const handleOnActiveChange = () => {
    if (!auth.can(PERMISSION_ADMIN_TG_BOT_ACTIVE)) {
      return
    }
    Telegram.changeStatusByAdmin(row.id, { isActive: !active }).then(
      (response) => {
        setActive(!active)
      },
      (error) => {
        setError(error.getErrors.is_active[0])
      },
    )
  }

  return (
    <td>
      <CFormSwitch
        size="xl"
        className="form-switch-wide"
        name="is_active"
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
    is_active: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ActionColumn
