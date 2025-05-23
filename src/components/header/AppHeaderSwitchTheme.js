import React from 'react'
import PropTypes from 'prop-types'
import 'simplebar-react/dist/simplebar.min.css'
import { CButton, CForm, CFormSwitch, useColorModes } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMoon, cilSun } from '@coreui/icons'

export const AppHeaderSwitchTheme = ({ _classNames = '', withLabels = false }) => {
  const { colorMode, setColorMode } = useColorModes('coreui-pro-react-admin-template-theme-modern')

  const onThemeChange = () => {
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light')
  }

  const Labels = () => {
    return (
      <>
        <CButton color="no-background-pwa" onClick={() => setColorMode('light')}>
          <CIcon icon={cilSun} /> Light{' '}
        </CButton>{' '}
        |{' '}
        <CButton color="no-background-pwa" onClick={() => setColorMode('dark')}>
          <CIcon icon={cilMoon} /> Dark
        </CButton>
      </>
    )
  }

  return (
    <CForm className={'d-flex align-items-center ' + _classNames} variant="nav-item">
      {withLabels && <Labels />}
      <CFormSwitch
        className="theme-switch me-2 align-content-center form-switch-wide"
        size="xl"
        checked={colorMode === 'light'}
        onChange={onThemeChange}
      />
    </CForm>
  )
}

AppHeaderSwitchTheme.propTypes = {
  _classNames: PropTypes.string,
  withLabels: PropTypes.bool,
}
