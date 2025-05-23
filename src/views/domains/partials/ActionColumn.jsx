import React, { useEffect, useState } from 'react'
import { CFormSwitch } from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  PERMISSION_CLIENT_DOMAINS_CREATE,
  PERMISSION_CLIENT_DOMAINS_UPDATE,
} from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import useApi from 'src/hooks/useApi'

const ActionColumn = ({ row }) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const { Domains } = useApi()

  const [active, setActive] = useState(row.status)
  const [error, setError] = useState('')

  useEffect(() => {
    setActive(row.status)
  }, [row])

  const handleOnActiveChange = () => {
    if (!auth.can(PERMISSION_CLIENT_DOMAINS_CREATE)) {
      return
    }
    Domains.changeStatus(row.id, { status: !active }).then(
      (response) => {
        setActive(!active)
      },
      (error) => {
        setError(error.getErrors.status[0])
      },
    )
  }

  return (
    <td>
      <CFormSwitch
        size="xl"
        className="form-switch-wide"
        name="is_active"
        disabled={!auth.can(PERMISSION_CLIENT_DOMAINS_UPDATE)}
        checked={active}
        invalid={!!error}
        onChange={handleOnActiveChange}
      ></CFormSwitch>
    </td>
  )
}

ActionColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ActionColumn
