import RoleForm from './partials/Form'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'
import { PERMISSION_ADMIN_ROLE_UPDATE } from 'src/enums/permissions'

const defaultData = {
  name: '',
  is_predefined: false,
  permissions: [],
  permissionIds: [],
}

export default function UpdateForm() {
  const navigate = useNavigate()
  const { Roles } = useApi()
  const { roleId } = useParams()
  const auth = useAuth()

  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState()

  useEffect(() => {
    Roles.edit(roleId).then((response) => {
      setData({
        name: response.data.role.name,
        is_predefined: response.data.role.is_predefined,
        permissions: response.data.permissions,
        permissionIds: response.data.permissionIds,
      })
    })
  }, [])

  const handleCancel = () => {
    return navigate('/roles')
  }

  const handleSave = async (newData) => {
    if (!auth.can(PERMISSION_ADMIN_ROLE_UPDATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    if (roleId) {
      const response = await Roles.update(roleId, {
        name: newData.name,
        permissionIds: newData.permissionIds,
      }).catch((error) => {
        setErrors((prev) => ({ ...prev, ...error.getErrors() }))
      })
      if (response.hasValidationErrors()) {
        setErrors(response.getValidationErrors())
      }
      return navigate('/roles')
    }
  }

  return (
    <>
      <RoleForm
        values={data}
        errors={errors}
        onSave={handleSave}
        onCancel={handleCancel}
        formHeader="Редактирование роли"
      />
    </>
  )
}
