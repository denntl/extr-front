import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLink,
} from '@coreui/react-pro'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { persona, company, mail, saveCircle } from 'src/assets/icons/icons'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider'

const AppHeaderDropdown = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signout(() => {
      navigate('/login', { replace: true })
    })
  }

  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle className="" caret={false} placement="bottom-end">
        <CIcon icon={persona} className="" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 box-shadow">
        {/*<CDropdownHeader className="bg-body-secondary text-body-secondary fw-semibold rounded-top mb-2">*/}
        {/*  {t('account')}*/}
        {/*</CDropdownHeader>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilBell} className="me-2" />*/}
        {/*  {t('updates')}*/}
        {/*  <CBadge color="info-gradient" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilEnvelopeOpen} className="me-2" />*/}
        {/*  {t('messages')}*/}
        {/*  <CBadge color="success-gradient" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilTask} className="me-2" />*/}
        {/*  {t('tasks')}*/}
        {/*  <CBadge color="danger-gradient" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilCommentSquare} className="me-2" />*/}
        {/*  {t('comments')}*/}
        {/*  <CBadge color="warning-gradient" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownHeader className="bg-body-secondary text-body-secondary fw-semibold my-2">*/}
        {/*  {t('settings')}*/}
        {/*</CDropdownHeader>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilUser} className="me-2" />*/}
        {/*  {t('profile')}*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilSettings} className="me-2" />*/}
        {/*  {t('settings')}*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilCreditCard} className="me-2" />*/}
        {/*  {t('payments')}*/}
        {/*  <CBadge color="secondary-gradient" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilFile} className="me-2" />*/}
        {/*  {t('projects')}*/}
        {/*  <CBadge color="primary-gradient" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownDivider />*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilLockLocked} className="me-2" />*/}
        {/*  {t('lockAccount')}*/}
        {/*</CDropdownItem>*/}
        <CDropdownHeader className="bg-skyblue-gradient border-top-radius fw-semibold mb-2 user">
          {auth.user?.username}
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={company} className="mr-1" />
          {auth.params?.companyName ?? 'Company Name'}
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={mail} className="mr-1" />
          {auth.user?.email ?? 'example@gmail.com'}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={saveCircle} className="mr-1" />
          <span className="text-high-emphasis text-decoration-none" href="#support">
            {t('support')}
          </span>
        </CDropdownItem>
        <CDropdownItem href="#" onClick={onLogout} className="text-center">
          <span className="text-high-emphasis text-decoration-underline">{t('logout')}</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
