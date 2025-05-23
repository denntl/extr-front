import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import TeamForm from 'src/views/my-company/partials/TeamForm'
import { useAuth } from 'src/providers/AuthProvider'
import { PERMISSION_CLIENT_TEAM_UPDATE } from 'src/enums/permissions'

const TeamsEdit = () => {
  const { Team } = useApi()
  const navigate = useNavigate()
  const { teamId } = useParams()
  const auth = useAuth()

  const [errors, setErrors] = useState({})
  const [values, setValues] = useState()
  const [teamLeads, setTeamLeads] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    if (!auth.can(PERMISSION_CLIENT_TEAM_UPDATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    Team.edit(teamId).then((response) => {
      setTeamLeads(response.data.teamLeaders)
      setMembers(response.data.members)
      if (response.data.team) {
        setValues(response.data.team)
      }
    })
  }, [])

  const handleCancel = () => {
    navigate('/my-company/teams')
  }

  const handleSave = (values) => {
    if (!auth.can(PERMISSION_CLIENT_TEAM_UPDATE)) {
      setErrors((prev) => ({ ...prev, permissions: 'У вас нет доступа к этой операции' }))
      return
    }
    const response = Team.update(teamId, values)
    response.then(
      (result) => {
        navigate('/my-company/teams')
      },
      (error) => {
        setErrors((prev) => ({ ...prev, ...error.data.errors }))
      },
    )
  }

  return (
    <>
      <TeamForm
        errors={errors}
        values={values}
        teamLeads={teamLeads}
        members={members}
        onSave={handleSave}
        onCancel={handleCancel}
      ></TeamForm>
    </>
  )
}

export default TeamsEdit
