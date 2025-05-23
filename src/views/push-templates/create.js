import React, { useEffect, useState } from 'react'
import PushTemplatesForm from 'src/views/push-templates/partials/form'
import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'

const PushTemplatesCreate = () => {
  const { PushTemplates } = useApi()
  const navigate = useNavigate()

  const [enums, setEnums] = useState()
  const [errors, setErrors] = useState()

  useEffect(() => {
    PushTemplates.create().then((response) => {
      setEnums(response.data)
    })
  }, [])
  const handleSave = (values) => {
    PushTemplates.store(values).then(
      (response) => {
        navigate('/push-templates')
      },
      (error) => {
        setErrors((prev) => ({ ...prev, ...error.getErrors() }))
      },
    )
  }

  const handleCancel = () => {
    navigate('/push-templates')
  }

  return (
    <>
      <PushTemplatesForm
        enums={enums}
        errors={errors}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}

export default PushTemplatesCreate
