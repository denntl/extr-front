import TelegramBotForm from 'src/views/telegram-bot/partials/TelegramBotForm'
import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useBotStatus } from 'src/providers/BotStatusProvider'

const TelegramBotEdit = () => {
  const { Telegram } = useApi()
  const navigate = useNavigate()
  const botStatus = useBotStatus()

  const [errors, setErrors] = useState()
  const [values, setValues] = useState()

  useEffect(() => {
    Telegram.edit().then(
      (response) => {
        setValues(response.telegramBot)
      },
      (error) => {},
    )
  }, [])

  const handleActive = (isActive) => {
    Telegram.changeStatus(isActive).then(
      (response) => {
        setValues(response.telegramBot)
        botStatus.setNotificationBotStatus(response.telegramBot.is_active)
      },
      (error) => {
        setErrors(error.getErrors())
        setValues((prev) => ({ ...prev, is_active: !isActive }))
      },
    )
  }

  const handleCancel = () => {
    navigate('/applications')
  }

  const handleSave = (values) => {
    const response = Telegram.update(values)
    response.then(
      (response) => {
        setValues(response.telegramBot)
      },
      (error) => {
        setErrors((prev) => ({ ...prev, ...error.data.errors }))
      },
    )
  }

  return (
    <>
      <TelegramBotForm
        values={values}
        errors={errors}
        onActive={handleActive}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  )
}

export default TelegramBotEdit
