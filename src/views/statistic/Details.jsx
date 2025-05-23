import React from 'react'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react-pro'

import useApi from 'src/hooks/useApi'
import Listing from 'src/components/listing/Listing'
import ActionColumn from 'src/views/statistic/partials/ActionColumn'
import { useParams } from 'react-router-dom'

const Index = () => {
  const { Statistic } = useApi()
  const { id } = useParams()

  const wrappedDataGetter = (params) =>
    Statistic.getDetailedStatisticData({
      params: { id: +id },
      ...params,
    })

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol>
              <Listing
                settingsGetter={Statistic.getDetailedStatisticSettings}
                dataGetter={wrappedDataGetter}
                listingEntity="detailedStatistic"
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
