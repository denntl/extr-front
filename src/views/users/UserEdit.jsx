import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import UserForm from 'src/views/users/partials/UserForm'

const UserEdit = () => {
  const { User } = useApi()
  const navigate = useNavigate()
  const { userId } = useParams()

  const [errors, setErrors] = useState()
  const [enums, setEnums] = useState()

  useEffect(() => {
    User.edit(userId).then((response) => {
      if (response.data) {
        setEnums(response.data)
      }
    })
  }, [userId])
  const handleCancel = () => {
    navigate('/users')
  }
  const handleSave = (values) => {
    const response = User.update(userId, values)
    response.then(
      (result) => {
        navigate('/users')
      },
      (error) => {
        setErrors((prev) => ({ ...prev, ...error.data.errors }))
      },
    )
  }

  return (
    <>
      <UserForm
        errors={errors}
        values={enums?.user}
        companyName={enums?.user?.companyName}
        enums={enums}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}
export default UserEdit
