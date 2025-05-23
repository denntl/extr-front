import React, { useContext, useEffect, useState } from 'react'

import { CCard, CCardBody, CCol, CRow, CWidgetStatsC } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilBasket, cilChartPie, cilPeople, cilUserPlus } from '@coreui/icons'

import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import ActionColumn from 'src/views/statistic/partials/ActionColumn'

const Index = () => {
  const { Statistic } = useApi()
  const [statistic, setStatistic] = useState({
    uniqueClicks: 0,
    installs: 0,
    registrations: 0,
    deposits: 0,
  })

  useEffect(() => {
    Statistic.getDailyStatistic().then((response) => {
      setStatistic(response.data)
    })
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol xs={3}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilPeople} height={36} />}
                text="УНИКАЛЬНЫЕ КЛИКИ"
                title="УНИКАЛЬНЫЕ КЛИКИ"
                value={statistic.uniqueClicks ? statistic.uniqueClicks : '0'}
              />
            </CCol>
            <CCol xs={3}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilChartPie} height={36} />}
                text="ИНСТАЛЛЫ"
                title="ИНСТАЛЛЫ"
                value={statistic.installs ? statistic.installs : '0'}
              />
            </CCol>
            <CCol xs={3}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilUserPlus} height={36} />}
                text="РЕГИСТРАЦИИ"
                title="РЕГИСТРАЦИИ"
                value={statistic.registrations ? statistic.registrations : '0'}
              />
            </CCol>
            <CCol xs={3}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilBasket} height={36} />}
                text="ДЕПОЗИТЫ"
                title="ДЕПОЗИТЫ"
                value={statistic.deposits ? statistic.deposits : '0'}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <Listing
                settingsGetter={Statistic.getListingSettings}
                dataGetter={Statistic.getListingData}
                aggregationsGetter={Statistic.getListingAggregations}
                listingEntity="statistic"
                overwriteColumns={{
                  actions: { renderer: ActionColumn, props: {} },
                }}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Index
