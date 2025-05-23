import useApi from 'src/hooks/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import PushTemplatesForm from 'src/views/push-templates/partials/form'

const PushTemplateUpdate = () => {
  const { PushTemplates } = useApi()
  const navigate = useNavigate()
  const { pushTemplateId } = useParams()

  const [enums, setEnums] = useState()
  const [errors, setErrors] = useState()

  useEffect(() => {
    PushTemplates.edit(pushTemplateId).then((response) => {
      setEnums(response.data)
    })
  }, [])

  const handleSave = (values) => {
    PushTemplates.update(pushTemplateId, values).then(
      (response) => {
        navigate('/push-templates')
      },
      (error) => {
        setErrors((prev) => ({ ...prev, ...error.data.errors }))
      },
    )
  }

  const handleCancel = () => {
    navigate('/push-templates')
  }

  return (
    <>
      <PushTemplatesForm
        values={enums?.values}
        enums={enums}
        errors={errors}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}

export default PushTemplateUpdate
