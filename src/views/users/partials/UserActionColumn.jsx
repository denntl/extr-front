import { useNavigate } from 'react-router-dom'
import { CButton, CButtonGroup, CToast, CToastBody, CToastHeader } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'
import { useAuthBadge } from 'src/providers/AuthBadgeProvider'
import { get } from 'src/tools/localStorage'
import {
  PERMISSION_ADMIN_LOGIN_AS_USER,
  PERMISSION_ADMIN_USERS_UPDATE,
} from 'src/enums/permissions'
import { pen } from 'src/assets/icons/icons'

const UserActionColumn = ({ row }) => {
  const navigate = useNavigate()
  const { User } = useApi()
  const auth = useAuth()
  const badge = useAuthBadge()

  const handleNavigateToUpdate = () => {
    navigate(`/users/update/${row.id}`)
  }

  const loginUser = (id) => {
    User.loginAsUser(id).then((response) => {
      const prev = get('token')
      auth.signin(response.token, response.access, () => {
        navigate('/applications')
        badge.showBadge(`Вы вошли как ${response.user.username}`, prev)
      })
    })
  }
  const handleLoginAsUser = () => {
    loginUser(row.id)
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        {auth.can(PERMISSION_ADMIN_USERS_UPDATE) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            onClick={handleNavigateToUpdate}
          >
            <CIcon icon={pen} />
          </CButton>
        )}
        {auth.can(PERMISSION_ADMIN_LOGIN_AS_USER) && (
          <CButton
            color="primary-pwa"
            className="btn-action"
            size="sm"
            title="Переключить пользователя"
            onClick={handleLoginAsUser}
          >
            <CIcon icon={cilPeople} />
          </CButton>
        )}
      </CButtonGroup>
    </td>
  )
}

UserActionColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
}

export default UserActionColumn
