import React, { useEffect, useState, useCallback } from 'react'
import useApi from 'src/hooks/useApi'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { TARIFF_TYPE_SUBSCRIPTION_TIERS } from 'src/enums/tariff-types'
import { useNotificationPopup } from 'src/providers/NotificationPopupProvider'
import SubscriptionTiersForm from 'src/views/tariffs/SubscriptionTiersForm'

const SubscriptionTiersEdit = ({ updateDenied, setLoading }) => {
  const { t } = useTranslation('tariff')
  const { Tariffs } = useApi()
  const { tariffId } = useParams()
  const [values, setValues] = useState({})
  const navigate = useNavigate()
  const popup = useNotificationPopup()

  const tariffTypeList = [
    {
      value: TARIFF_TYPE_SUBSCRIPTION_TIERS,
      label: t('tariffs_subscription_tiers_tabName'),
    },
  ]

  useEffect(() => {
    setLoading(true)
    Tariffs.edit(tariffId)
      .then(({ data }) => {
        setValues(data)
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (newData) => {
    setLoading(true)
    Tariffs.update(tariffId, newData)
      .then((response) => {
        popup.pushPopup(t('tariff_update_success'))
        navigate('/tariffs/subscriptions')
      })
      .catch(
        /** @param {Response} error */ (error) => {
          console.log(error.getErrors())
          popup.pushPopup(t('tariff_update_error'))
        },
      )
      .finally(() => setLoading(false))
  }

  const handleCancel = () => {
    navigate('/tariffs/subscriptions')
  }

  return (
    <>
      <SubscriptionTiersForm
        updateDenied={updateDenied}
        handleSave={handleSave}
        handleCancel={handleCancel}
        values={values}
        tariffTypeList={tariffTypeList}
      />
    </>
  )
}

SubscriptionTiersEdit.propTypes = {
  updateDenied: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default SubscriptionTiersEdit
