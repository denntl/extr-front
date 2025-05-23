import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { TARIFF_TYPE_SUBSCRIPTION_TIERS } from 'src/enums/tariff-types'
import { useNotificationPopup } from 'src/providers/NotificationPopupProvider'
import SubscriptionTiersForm, { defaultValues } from 'src/views/tariffs/SubscriptionTiersForm'
import CoverProvider from 'src/providers/CoverProvider'

const SubscriptionTiersCreate = () => {
  const { t } = useTranslation('tariff')
  const { Tariffs } = useApi()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(defaultValues)
  const navigate = useNavigate()
  const popup = useNotificationPopup()

  useEffect(() => {
    setLoading(true)
    Tariffs.create(TARIFF_TYPE_SUBSCRIPTION_TIERS)
      .then(({ data }) => {
        setValues({ ...data, tariff: { status: 1 } })
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [])

  const tariffTypeList = [
    {
      value: TARIFF_TYPE_SUBSCRIPTION_TIERS,
      label: t('tariffs_subscription_tiers_tabName'),
    },
  ]

  const handleSave = async (newData) => {
    setLoading(true)
    Tariffs.store(TARIFF_TYPE_SUBSCRIPTION_TIERS, newData)
      .then((response) => {
        popup.pushPopup(t('tariff_create_success'))
        navigate('/tariffs/subscriptions')
      })
      .catch(
        /** @param {Response} error */ (error) => {
          console.log(error.getErrors())
          popup.pushPopup(t('tariff_create_error'))
        },
      )
      .finally(() => setLoading(false))
  }

  const handleCancel = () => {
    navigate('/tariffs/subscriptions')
  }

  return (
    <CoverProvider isLoading={loading}>
      <SubscriptionTiersForm
        updateDenied={false}
        handleSave={handleSave}
        handleCancel={handleCancel}
        values={values}
        tariffTypeList={tariffTypeList}
      />
    </CoverProvider>
  )
}

export default SubscriptionTiersCreate
