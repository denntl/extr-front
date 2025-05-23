import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import useApi from 'src/hooks/useApi'
import { PERMISSION_CLIENT_DOMAINS_CREATE } from 'src/enums/permissions'
import { useAuth } from 'src/providers/AuthProvider'
import DomainForm from './partials/Form'

export default function CreateForm() {
  const navigate = useNavigate()
  const { Domains } = useApi()
  const auth = useAuth()

  const [errors, setErrors] = useState()

  const handleCancel = () => {
    return navigate('/domains')
  }

  const handleSave = async (newData) => {
    if (!auth.can(PERMISSION_CLIENT_DOMAINS_CREATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    const response = await Domains.store({
      domain: newData.domain,
      status: newData.status,
    }).catch((error) => {
      setErrors((prev) => ({ ...prev, ...error.getErrors() }))
    })
    if (response.hasValidationErrors()) {
      setErrors(response.getErrors())
    }
    return navigate('/domains')
  }

  return (
    <>
      <DomainForm errors={errors} onSave={handleSave} onCancel={handleCancel} />
    </>
  )
}
