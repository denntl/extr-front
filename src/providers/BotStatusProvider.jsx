import * as React from 'react'
import { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const BotStatusContext = React.createContext()

export default function BotStatusProvider({ children }) {
  const [notificationBotStatus, setNotificationBotStatus] = useState(false)

  return (
    <BotStatusContext.Provider value={{ notificationBotStatus, setNotificationBotStatus }}>
      {children}
    </BotStatusContext.Provider>
  )
}

BotStatusProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useBotStatus() {
  return useContext(BotStatusContext)
}
