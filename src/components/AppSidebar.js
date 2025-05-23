import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeaderNav,
  CHeaderText,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
} from '@coreui/react-pro'
import navigation from '../_nav'
import { ACTION_CHANGE_STATE } from 'src/reducers/ChangeState'
import { AppSidebarNav } from './AppSidebarNav'
import CIcon from '@coreui/icons-react'
import { logo } from 'src/assets/brand/logo'
import { cilMenu } from '@coreui/icons'
import { AppHeaderDropdown } from 'src/components/header'
import { AppHeaderDropdownBalance } from 'src/components/header/AppHeaderDropdownBalance'
import { AppHeaderDropdownTelegram } from 'src/components/header/AppHeaderDropdownTelegram'
import { AppHeaderCurrentTariff } from 'src/components/header/AppHeaderCurrentTariff'
import { AppHeaderSwitchTheme } from 'src/components/header/AppHeaderSwitchTheme'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector(({ GlobalSettings }) => GlobalSettings.sidebarUnfoldable)
  const sidebarShow = useSelector(({ GlobalSettings }) => GlobalSettings.sidebarShow)

  const SidebarHeader = () => {
    return (
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="ml-2 d-lg-none" as="div">
          <CIcon
            icon={cilMenu}
            size="lg"
            onClick={() => dispatch({ type: ACTION_CHANGE_STATE, sidebarShow: false })}
          />
        </CSidebarBrand>
        <CSidebarBrand
          className="ml-2"
          as={NavLink}
          to="/"
          onClick={() => dispatch({ type: ACTION_CHANGE_STATE, sidebarShow: false })}
        >
          <CIcon icon={logo} className="icon-custom-size logo" />
        </CSidebarBrand>
        <CHeaderNav className="d-lg-none d-md-flex ms-auto justify-content-between min-width-50prc">
          <AppHeaderDropdownBalance visible={sidebarShow} />
          <AppHeaderDropdown className="px-4" />
        </CHeaderNav>
      </CSidebarHeader>
    )
  }

  return (
    <CSidebar
      className="border-end"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: ACTION_CHANGE_STATE, sidebarShow: visible })
      }}
    >
      <SidebarHeader />
      <CContainer fluid className="d-lg-none">
        <CContainer fluid className="d-flex justify-content-between py-3 divider-bottom-1">
          <div className="header-nav">
            <AppHeaderDropdownTelegram />
          </div>
          <div>
            <AppHeaderSwitchTheme withLabels={true} />
          </div>
        </CContainer>
        <CContainer fluid className="d-flex justify-content-between py-3 divider-bottom-1">
          <CHeaderText>
            <AppHeaderCurrentTariff />
          </CHeaderText>
        </CContainer>
      </CContainer>

      <AppSidebarNav items={navigation()} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
