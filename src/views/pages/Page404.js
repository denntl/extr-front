import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react-pro'

const Page404 = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Страница не найдена</h4>
              <p className="text-body-secondary float-start">
                Если вы считаете что так не должно быть - обратитесь в службу поддержки
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
