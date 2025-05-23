import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilDescription,
  cilMobile,
  cilShortText,
  cilUser,
  cilBriefcase,
  cibAdguard,
  cilFork,
  cilSitemap,
  cilGlobeAlt,
} from '@coreui/icons'
import { CDropdown, CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import {
  PERMISSION_ADMIN_COMPANY_LIST,
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_STATISTIC,
  PERMISSION_ADMIN_PUSH_TEMPLATES_LIST,
  PERMISSION_ADMIN_ROLES_LIST,
  PERMISSION_ADMIN_SINGLE_PUSH_NOTIFICATIONS_LIST,
  PERMISSION_ADMIN_SYSTEM_NOTIFICATIONS,
  PERMISSION_ADMIN_TG_BOT_LIST,
  PERMISSION_ADMIN_USERS_LIST,
  PERMISSION_CLIENT_APPLICATION_LIST,
  PERMISSION_CLIENT_DOMAINS_LIST,
  PERMISSION_CLIENT_STATISTIC_LIST,
  PERMISSION_CLIENT_SYSTEM_NOTIFICATIONS,
  PERMISSION_CLIENT_TELEGRAM_BOT_EDIT,
  PERMISSION_MANAGE_PERMISSION_READ,
  PERMISSION_MANAGE_APPLICATION_READ,
  PERMISSION_MY_COMPANY,
  PERMISSION_ADMIN_TARIFF_UPDATE,
  PERMISSION_CLIENT_TARIFF_READ,
} from 'src/enums/permissions'
import { tgIcon } from 'src/assets/brand/tgIcon'
import { useTranslation } from 'react-i18next'

const Navigation = () => {
  const { t } = useTranslation('navigation')

  return [
    //todo: uncomment when agree permissions and know what to display on dashboard
    // {
    //   component: CNavItem,
    //   name: 'Dashboard',
    //   to: '/dashboard',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // },

    {
      component: CDropdown,
      name: t('accounts'),
      // icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
      access: [
        PERMISSION_ADMIN_USERS_LIST,
        PERMISSION_ADMIN_ROLES_LIST,
        PERMISSION_MANAGE_PERMISSION_READ,
      ],
      items: [
        {
          component: CNavItem,
          name: t('users'),
          to: '/users',
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_USERS_LIST,
        },
        {
          component: CNavItem,
          name: t('roles'),
          to: '/roles',
          icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_ROLES_LIST,
        },
        {
          component: CNavItem,
          name: t('permissions'),
          to: '/permissions',
          icon: <CIcon icon={cibAdguard} customClassName="nav-icon" />,
          access: PERMISSION_MANAGE_PERMISSION_READ,
        },
      ],
    },
    {
      component: CNavItem,
      name: t('companies'),
      to: '/companies',
      icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      access: PERMISSION_ADMIN_COMPANY_LIST,
    },
    {
      component: CNavItem,
      name: t('my_company'),
      to: '/my-company',
      icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      access: PERMISSION_MY_COMPANY,
    },
    {
      component: CDropdown,
      name: t('pwa'),
      access: [PERMISSION_CLIENT_APPLICATION_LIST],
      items: [
        {
          component: CNavItem,
          name: t('applications'),
          to: '/applications',
          icon: <CIcon icon={cilMobile} customClassName="nav-icon" />,
          access: PERMISSION_CLIENT_APPLICATION_LIST,
        },
        {
          component: CNavItem,
          name: t('all_applications'),
          to: '/all-applications',
          icon: <CIcon icon={cilMobile} customClassName="nav-icon" />,
          access: PERMISSION_MANAGE_APPLICATION_READ,
        },
        {
          component: CNavItem,
          name: t('statistics'),
          to: '/statistic',
          icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
          access: PERMISSION_CLIENT_STATISTIC_LIST,
        },
        {
          component: CNavItem,
          name: t('domains'),
          to: '/domains',
          icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
          access: PERMISSION_CLIENT_DOMAINS_LIST,
        },
      ],
    },
    {
      component: CDropdown,
      name: t('push'),
      access: PERMISSION_ADMIN_SYSTEM_NOTIFICATIONS,
      items: [
        {
          component: CNavItem,
          name: t('push_templates'),
          to: '/push-templates',
          icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_PUSH_TEMPLATES_LIST,
        },
        {
          component: CNavItem,
          name: t('push_notifications'),
          to: '/push-notifications/single',
          icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_SINGLE_PUSH_NOTIFICATIONS_LIST,
        },
        {
          component: CNavItem,
          name: t('push_statistics'),
          to: '/push-notifications-statistic',
          icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_PUSH_NOTIFICATIONS_STATISTIC,
        },
      ],
    },
    {
      component: CDropdown,
      name: t('notifications'),
      access: [PERMISSION_CLIENT_TELEGRAM_BOT_EDIT, PERMISSION_ADMIN_TG_BOT_LIST],
      items: [
        {
          component: CNavItem,
          name: t('telegram_bot'),
          to: '/telegram-bot',
          icon: tgIcon,
          access: PERMISSION_CLIENT_TELEGRAM_BOT_EDIT,
        },
        {
          component: CNavItem,
          name: t('notification_templates'),
          to: '/notifications',
          icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_SYSTEM_NOTIFICATIONS,
        },
        {
          component: CNavItem,
          name: t('my_notifications'),
          to: '/my-notifications',
          icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
          access: PERMISSION_CLIENT_SYSTEM_NOTIFICATIONS,
        },
        {
          component: CNavItem,
          name: t('telegram-bots'),
          to: '/telegram-bots',
          icon: tgIcon,
          access: PERMISSION_ADMIN_TG_BOT_LIST,
        },
      ],
    },
    {
      component: CDropdown,
      name: t('finance'),
      // icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      access: [PERMISSION_ADMIN_TARIFF_UPDATE, PERMISSION_CLIENT_TARIFF_READ],
      items: [
        {
          component: CNavItem,
          name: t('tariffs'),
          to: '/tariffs',
          icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
          access: PERMISSION_ADMIN_TARIFF_UPDATE,
        },
        {
          component: CNavItem,
          name: t('tariff'),
          to: '/tariff',
          icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
          access: PERMISSION_CLIENT_TARIFF_READ,
        },
      ],
    },
  ]
}

export default Navigation
