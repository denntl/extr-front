import React from 'react'
import useApi from 'src/hooks/useApi'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import ActionColumn from 'src/views/telegram-bot/partials/ActionColumn'

const TelegramBotsList = () => {
  const { Telegram } = useApi()

  return (
    <>
      <CCard>
        <CCardHeader>Пользователи</CCardHeader>
        <CCardBody>
          <Listing
            settingsGetter={Telegram.getListingSettings}
            dataGetter={Telegram.getListingData}
            listingEntity="telegramBots"
            overwriteColumns={{
              actions: { renderer: ActionColumn, props: {} },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default TelegramBotsList
