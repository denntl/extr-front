import React from 'react'
import { CButton, CCard, CCardHeader, CImage } from '@coreui/react-pro'
import Listing from 'src/components/listing/Listing'
import useApi from 'src/hooks/useApi'
import ActionColumn from 'src/views/applications/partials/ActionColumn'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/providers/AuthProvider'
import pwaImage from 'src/assets/images/pwa-default.png'

const Index = () => {
  const { Application } = useApi()
  const { t } = useTranslation('listing')
  const auth = useAuth()
  const navigate = useNavigate()

  if (auth.params?.hasApplications === false) {
    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-black dark:text-white">{t('create_first_pwa')}</h1>
        <CImage className="max-width-800 w-100 h-auto my-3" src={pwaImage} />
        <CButton
          color="primary-pwa"
          className="rounded-pill px-4-5"
          type="submit"
          onClick={() => {
            navigate('/applications/create')
          }}
        >
          {t('create_button')}
        </CButton>
      </div>
    )
  }
  return (
    <>
      <CCard>
        <CCardHeader>{t('apps')}</CCardHeader>
        <Listing
          listingEntity={'applications'}
          settingsGetter={Application.getApplicationSettings}
          dataGetter={Application.getApplications}
          createLink="/applications/create"
          overwriteColumns={{
            actions: { renderer: ActionColumn, props: {} },
          }}
        />
      </CCard>
    </>
  )
}

export default Index
