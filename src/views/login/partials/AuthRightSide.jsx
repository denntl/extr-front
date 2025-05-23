import React from 'react'
import { CCol, CContainer, CLink, CRow } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { AppHeaderSwitchTheme } from 'src/components/header/AppHeaderSwitchTheme'
import { logo } from 'src/assets/brand/logo'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { leftArrow } from 'src/assets/icons/icons'

export const AuthRightSide = ({ children, page = 'auth' }) => {
  const { t } = useTranslation('auth')

  return (
    <CContainer className="auth-layout__right d-flex flex-column justify-content-between align-items-center py-3 min-vh-100 border-radius-0">
      <div className="d-flex flex-column justify-content-between flex-grow-2 w-100 align-items-center text-black dark:text-white z-3">
        <AppHeaderSwitchTheme
          withLabels={true}
          _classNames="align-self-end blurred-200 border-radius-2 "
        />

        <div className="w-75">
          <CRow className="align-items-center">
            <CCol xs={3}>
              {page === 'register' && (
                <Link
                  to="/login"
                  className="text-primary text-decoration-none font-weight-600 text-body-pwa text-black dark:text-white"
                >
                  <CIcon
                    icon={leftArrow}
                    className="bg-white p-1 border-radius-0275 dark:text-black"
                  />{' '}
                  <span className="d-none d-lg-inline">{t('back')}</span>
                </Link>
              )}
            </CCol>
            <CCol xs={6}>
              <CLink href="https://onetraff.com/" target="_blank" className="w-30prc">
                <CIcon
                  icon={logo}
                  className="icon-custom-size logo w-100 text-black dark:text-white"
                />
              </CLink>
            </CCol>
            <CCol xs={3}></CCol>
          </CRow>
        </div>
      </div>
      <div className="w-75 flex-grow-5 d-flex flex-column justify-content-center z-3">
        {children}
      </div>
      <CContainer className="text-center align-content-center flex-grow-5 text-secondary text-body-pwa font-weight-500">
        {page === 'auth' && (
          <>
            {t('dont_have_account')}
            <br />
            <Link to="/registration" className="text-primary text-decoration-none font-weight-600">
              {t('create_account')}
            </Link>
          </>
        )}
      </CContainer>
    </CContainer>
  )
}

AuthRightSide.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string || PropTypes.oneOf(['auth', 'register']),
}
