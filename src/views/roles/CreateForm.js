import RoleForm from './partials/Form'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { PERMISSION_ADMIN_ROLE_CREATE } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import { useTranslation } from 'react-i18next'

const defaultData = {
  name: '',
  permissions: [],
}

export default function CreateForm() {
  const navigate = useNavigate()
  const { Roles } = useApi()
  const auth = useAuth()
  const { t } = useTranslation('roles')

  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState()

  useEffect(() => {
    Roles.create().then((response) => {
      setData(response.data)
    })
  }, [])

  const handleCancel = () => {
    return navigate('/roles')
  }

  const handleSave = async (newData) => {
    if (!auth.can(PERMISSION_ADMIN_ROLE_CREATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    const response = await Roles.store({
      name: newData.name,
      permissionIds: newData.permissionIds,
    }).catch((error) => {
      setErrors((prev) => ({ ...prev, ...error.getErrors() }))
    })
    if (response.hasValidationErrors()) {
      setErrors(response.getErrors())
    }
    return navigate('/roles')
  }

  return (
    <>
      <RoleForm
        values={data}
        errors={errors}
        onSave={handleSave}
        onCancel={handleCancel}
        formHeader={t('create')}
      />
    </>
  )
}
