import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  CContainer,
  CForm,
  CFormInput,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
  CInputGroupText,
  useColorModes,
  CHeaderText,
  CFormSwitch,
  CButton,
  CLink,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilContrast,
  cilApplicationsSettings,
  cilMenu,
  cilMoon,
  cilSearch,
  cilSun,
  cilLanguage,
  cifGb,
  cifEs,
  cifPl,
  cifRu,
  cilBell,
} from '@coreui/icons'

import {
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/index'
import { ACTION_CHANGE_STATE } from 'src/reducers/ChangeState'
import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useBotStatus } from 'src/providers/BotStatusProvider'
import { useAuth } from 'src/providers/AuthProvider'
import { logo } from 'src/assets/brand/logo'
import { telegram, wallet, doubleCircle } from 'src/assets/icons/icons'
import { AppHeaderDropdownBalance } from 'src/components/header/AppHeaderDropdownBalance'
import { AppHeaderSwitchTheme } from 'src/components/header/AppHeaderSwitchTheme'
import { AppHeaderCurrentTariff } from 'src/components/header/AppHeaderCurrentTariff'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-pro-react-admin-template-theme-modern')
  const { i18n, t } = useTranslation()
  const { Telegram } = useApi()
  const botStatus = useBotStatus()
  const auth = useAuth()

  const dispatch = useDispatch()
  const asideShow = useSelector(({ GlobalSettings }) => GlobalSettings.asideShow)
  const sidebarShow = useSelector(({ GlobalSettings }) => GlobalSettings.sidebarShow)
  const allState = useSelector((state) => state)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  useEffect(() => {
    Telegram.getActiveBot().then((response) => {
      botStatus.setNotificationBotStatus(response.data.isActive)
    })
  }, [auth.user])

  const handleInviteClick = () => {
    Telegram.getInviteLink().then((response) => {
      window.open(response.data.link, '_blank')
    })
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="px-4" fluid>
        <CHeaderToggler
          className={classNames('d-lg-none', {
            'prevent-hide': !sidebarShow,
          })}
          onClick={() => dispatch({ type: ACTION_CHANGE_STATE, sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderText
          className={classNames('d-lg-none mr-4', {
            'prevent-hide': !sidebarShow,
          })}
        >
          <CIcon icon={logo} className="icon-custom-size logo" />
        </CHeaderText>

        <CHeaderText className="d-none d-lg-block">
          <AppHeaderCurrentTariff />
        </CHeaderText>

        <CHeaderNav className="d-md-flex ms-auto" placement="bottom-end">
          {/*<CDropdown variant="nav-item" placement="bottom-end">*/}
          {/*  <CDropdownToggle caret={false}>*/}
          {/*    <CIcon icon={cilLanguage} size="lg" />*/}
          {/*  </CDropdownToggle>*/}
          {/*  <CDropdownMenu>*/}
          {/*    <CDropdownItem*/}
          {/*      active={i18n.language === 'en'}*/}
          {/*      className="d-flex align-items-center"*/}
          {/*      as="button"*/}
          {/*      onClick={() => i18n.changeLanguage('en')}*/}
          {/*    >*/}
          {/*      <CIcon className="me-2" icon={cifGb} size="lg" /> English*/}
          {/*    </CDropdownItem>*/}
          {/*    <CDropdownItem*/}
          {/*      active={i18n.language === 'ru'}*/}
          {/*      className="d-flex align-items-center"*/}
          {/*      as="button"*/}
          {/*      onClick={() => i18n.changeLanguage('ru')}*/}
          {/*    >*/}
          {/*      <CIcon className="me-2" icon={cifRu} size="lg" /> Русский*/}
          {/*    </CDropdownItem>*/}
          {/*  </CDropdownMenu>*/}
          {/*</CDropdown>*/}
          <AppHeaderDropdownBalance />
          <AppHeaderSwitchTheme _classNames="px-5 d-none d-sm-block" />
          {botStatus.notificationBotStatus && (
            <>
              <CDropdown className="d-none d-sm-block" variant="nav-item" placement="bottom-end">
                <CDropdownToggle caret={false}>
                  <CIcon icon={telegram} size="lg" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={handleInviteClick}
                  >
                    <CIcon className="icon-sm nav-icon mr-1" icon={telegram} />
                    Telegram
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </>
          )}
          <AppHeaderDropdown />
        </CHeaderNav>
        {/*<CHeaderToggler*/}
        {/*  onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}*/}
        {/*  style={{ marginInlineEnd: '-12px' }}*/}
        {/*>*/}
        {/*  <CIcon icon={cilApplicationsSettings} size="lg" />*/}
        {/*</CHeaderToggler>*/}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
