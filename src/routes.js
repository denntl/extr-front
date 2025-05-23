import React from 'react'
import {
  PERMISSION_ADMIN_COMPANY_LIST,
  PERMISSION_ADMIN_COMPANY_UPDATE,
  PERMISSION_ADMIN_SYSTEM_NOTIFICATIONS,
  PERMISSION_ADMIN_TG_BOT_LIST,
  PERMISSION_ADMIN_PUSH_TEMPLATES_LIST,
  PERMISSION_ADMIN_USERS_LIST,
  PERMISSION_ADMIN_USERS_UPDATE,
  PERMISSION_CLIENT_APPLICATION_EDIT,
  PERMISSION_CLIENT_APPLICATION_LIST,
  PERMISSION_CLIENT_STATISTIC_LIST,
  PERMISSION_CLIENT_SYSTEM_NOTIFICATIONS,
  PERMISSION_CLIENT_TEAMS_LIST,
  PERMISSION_CLIENT_TELEGRAM_BOT_EDIT,
  PERMISSION_CLIENT_USERS_LIST,
  PERMISSION_CLIENT_TARIFF_READ,
  PERMISSION_MY_COMPANY,
  PERMISSION_ADMIN_PUSH_TEMPLATES_STORE,
  PERMISSION_ADMIN_PUSH_TEMPLATES_UPDATE,
  PERMISSION_ADMIN_SINGLE_PUSH_NOTIFICATIONS_LIST,
  PERMISSION_ADMIN_REGULAR_PUSH_NOTIFICATIONS_LIST,
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_STORE,
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_UPDATE,
  PERMISSION_ADMIN_ROLES_LIST,
  PERMISSION_ADMIN_ROLE_UPDATE,
  PERMISSION_ADMIN_ROLE_CREATE,
  PERMISSION_CLIENT_DOMAINS_LIST,
  PERMISSION_CLIENT_DOMAINS_CREATE,
  PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE,
  PERMISSION_MANAGE_PERMISSION_READ,
  PERMISSION_ADMIN_PUSH_NOTIFICATIONS_STATISTIC,
  PERMISSION_MANAGE_APPLICATION_READ,
  PERMISSION_MANAGE_APPLICATION_SAVE,
  PERMISSION_ADMIN_TARIFF_UPDATE,
  PERMISSION_ADMIN_COMPANY_MANUAL_BALANCE_DEPOSIT,
  PERMISSION_ADMIN_COMPANY_BALANCE_TRANSACTIONS_READ,
} from 'src/enums/permissions'
import { TARIFF_TYPE_INSTALL, TARIFF_TYPE_SUBSCRIPTION_TIERS } from 'src/enums/tariff-types'
import SubscriptionTiersIndex from 'src/views/tariffs/SubscriptionTiersIndex'
import SubscriptionTiersCreate from 'src/views/tariffs/SubscriptionTiersCreate'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ApplicationsIndex = React.lazy(() => import('./views/applications'))
const ApplicationCreate = React.lazy(() => import('./views/applications/create'))
const ApplicationUpdate = React.lazy(() => import('./views/applications/update'))
const AdminUsersIndex = React.lazy(() => import('./views/users/Index'))
const AdminUsersUpdate = React.lazy(() => import('./views/users/UserEdit'))

const AdminPermissionsIndex = React.lazy(() => import('./views/permissions/PermissionsIndex'))
const AdminRoleFormUpdate = React.lazy(() => import('./views/roles/UpdateForm'))
const AdminRoleFormCreate = React.lazy(() => import('./views/roles/CreateForm'))

const AdminRolesIndex = React.lazy(() => import('./views/roles/RolesIndex'))

const CompaniesIndex = React.lazy(() => import('./views/companies/index'))
const CompanyUpdate = React.lazy(() => import('./views/companies/tabs/Edit'))
const ManualBalanceDeposit = React.lazy(() => import('./views/companies/tabs/ManualBalanceDeposit'))
const CompanyBalanceTransactions = React.lazy(
  () => import('./views/companies/tabs/CompanyBalanceTransactions'),
)

const MyCompanyIndex = React.lazy(() => import('./views/my-company/Index'))
const MyTeamsIndex = React.lazy(() => import('./views/my-company/Teams'))
const MyTeamsCreate = React.lazy(() => import('./views/my-company/teams/TeamsCreate'))
const MyTeamsEdit = React.lazy(() => import('./views/my-company/teams/TeamsEdit'))
const MyUsersIndex = React.lazy(() => import('./views/my-company/Users'))
const StatisticIndex = React.lazy(() => import('./views/statistic/index'))
const StatisticDetails = React.lazy(() => import('./views/statistic/Details'))

const DomainsIndex = React.lazy(() => import('./views/domains/DomainsIndex'))
const DomainFormCreate = React.lazy(() => import('./views/domains/CreateForm'))

const TelegramBotEdit = React.lazy(() => import('./views/telegram-bot/TelegramBotEdit'))
const TelegramBotsList = React.lazy(() => import('./views/telegram-bot/TelegramBotsList'))

const SystemNotifications = React.lazy(() => import('./views/system-notifications/index'))
const SystemNotificationsCreate = React.lazy(() => import('./views/system-notifications/create'))
const SystemNotificationsUpdate = React.lazy(() => import('./views/system-notifications/update'))
const ClientNotifications = React.lazy(() => import('./views/notifications/index'))
const TariffView = React.lazy(() => import('./views/tariffs/TariffView'))
const TariffEdit = React.lazy(() => import('./views/tariffs/TariffEdit'))
const PushTemplatesIndex = React.lazy(() => import('./views/push-templates/index'))
const PushTemplatesCreate = React.lazy(() => import('./views/push-templates/create'))
const PushTemplatesUpdate = React.lazy(() => import('./views/push-templates/update'))
const PushSingleNotifications = React.lazy(() => import('./views/push-notifications/single'))
const PushRegularNotifications = React.lazy(() => import('./views/push-notifications/regular'))
const PushNotificationsCreate = React.lazy(() => import('./views/push-notifications/create'))
const PushNotificationsUpdate = React.lazy(() => import('./views/push-notifications/update'))
const PushNotificationsStatistic = React.lazy(
  () => import('./views/push-notifications-statistic/index'),
)

const ManageApplicationIndex = React.lazy(() => import('./views/all-applications/Index'))
const ManageApplicationUpdate = React.lazy(() => import('./views/all-applications/update'))

const routes = [
  //todo: uncomment when agree permissions and know what to display on dashboard
  // { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  {
    path: '/my-company',
    name: 'Моя компания',
    element: MyCompanyIndex,
    access: PERMISSION_MY_COMPANY,
  },
  {
    path: '/my-company/teams',
    name: 'Мои команды',
    element: MyTeamsIndex,
    access: PERMISSION_CLIENT_TEAMS_LIST,
  },
  {
    path: '/my-company/teams/create',
    name: 'Мои команды',
    element: MyTeamsCreate,
    access: PERMISSION_CLIENT_TEAMS_LIST,
  },
  {
    path: '/my-company/teams/update/:teamId',
    name: 'Мои команды',
    element: MyTeamsEdit,
    access: PERMISSION_CLIENT_TEAMS_LIST,
  },
  {
    path: '/my-company/users',
    name: 'Мои участники',
    element: MyUsersIndex,
    access: PERMISSION_CLIENT_USERS_LIST,
  },

  {
    path: '/companies',
    name: 'Компании',
    element: CompaniesIndex,
    access: PERMISSION_ADMIN_COMPANY_LIST,
  },
  {
    path: '/companies/update/:companyId',
    name: 'Редактирования Компании',
    element: CompanyUpdate,
    access: PERMISSION_ADMIN_COMPANY_UPDATE,
  },
  {
    path: '/companies/manual-balance-deposit/:companyId',
    name: 'Редактирования Компании',
    element: ManualBalanceDeposit,
    access: PERMISSION_ADMIN_COMPANY_MANUAL_BALANCE_DEPOSIT,
  },
  {
    path: '/companies/transactions/:companyId',
    name: 'Транзакции',
    element: CompanyBalanceTransactions,
    access: PERMISSION_ADMIN_COMPANY_BALANCE_TRANSACTIONS_READ,
  },
  {
    path: '/applications',
    name: 'Приложения',
    element: ApplicationsIndex,
    access: PERMISSION_CLIENT_APPLICATION_LIST,
  },
  {
    path: '/applications/create',
    name: 'Создание приложения',
    element: ApplicationCreate,
    access: PERMISSION_CLIENT_APPLICATION_EDIT,
  },
  {
    path: '/applications/update/:appId',
    name: 'Редактирования приложения',
    element: ApplicationUpdate,
    access: PERMISSION_CLIENT_APPLICATION_EDIT,
  },
  {
    path: '/users',
    name: 'Пользователи',
    element: AdminUsersIndex,
    access: PERMISSION_ADMIN_USERS_LIST,
  },
  {
    path: '/permissions',
    name: 'Пермишены',
    element: AdminPermissionsIndex,
    access: PERMISSION_MANAGE_PERMISSION_READ,
  },
  {
    path: '/users/update/:userId',
    name: 'Пользователи',
    element: AdminUsersUpdate,
    access: PERMISSION_ADMIN_USERS_UPDATE,
  },
  {
    path: '/roles',
    name: 'Роли',
    element: AdminRolesIndex,
    access: PERMISSION_ADMIN_ROLES_LIST,
  },
  {
    path: '/roles/create',
    name: 'Создание роли',
    element: AdminRoleFormCreate,
    access: PERMISSION_ADMIN_ROLE_CREATE,
  },
  {
    path: '/roles/update/:roleId',
    name: 'Редактирование роли',
    element: AdminRoleFormUpdate,
    access: PERMISSION_ADMIN_ROLE_UPDATE,
  },
  {
    path: '/statistic',
    name: 'Статистика',
    element: StatisticIndex,
    access: PERMISSION_CLIENT_STATISTIC_LIST,
  },
  {
    path: '/statistic/:id',
    name: 'Подробная статистика',
    element: StatisticDetails,
    access: PERMISSION_CLIENT_STATISTIC_LIST,
  },
  {
    path: '/domains',
    name: 'Домены',
    element: DomainsIndex,
    access: PERMISSION_CLIENT_DOMAINS_LIST,
  },
  {
    path: '/domains/create',
    name: 'Создание домена',
    element: DomainFormCreate,
    access: PERMISSION_CLIENT_DOMAINS_CREATE,
  },
  {
    path: '/telegram-bot',
    name: 'Телеграмм бот',
    element: TelegramBotEdit,
    access: PERMISSION_CLIENT_TELEGRAM_BOT_EDIT,
  },
  {
    path: '/notifications',
    name: 'Уведомления',
    element: SystemNotifications,
    access: PERMISSION_ADMIN_SYSTEM_NOTIFICATIONS,
  },
  {
    path: '/notifications/create',
    name: 'Создание уведомления',
    element: SystemNotificationsCreate,
    access: PERMISSION_MANAGE_NOTIFICATION_TEMPLATE_CREATE,
  },
  {
    path: '/notifications/update/:id',
    name: 'Редактирование уведомления',
    element: SystemNotificationsUpdate,
    access: PERMISSION_ADMIN_SYSTEM_NOTIFICATIONS,
  },
  {
    path: '/my-notifications',
    name: 'Уведомления',
    element: ClientNotifications,
    access: PERMISSION_CLIENT_SYSTEM_NOTIFICATIONS,
  },
  {
    path: '/tariff',
    name: 'Тариф',
    element: TariffView,
    access: PERMISSION_CLIENT_TARIFF_READ,
  },
  {
    path: '/tariffs',
    name: 'Тарифы',
    element: (props) => <TariffEdit {...props} tariffTypeId={TARIFF_TYPE_INSTALL} />,
    access: PERMISSION_ADMIN_TARIFF_UPDATE,
  },
  {
    path: '/tariffs/subscriptions',
    name: 'Подписки',
    element: SubscriptionTiersIndex,
    access: PERMISSION_ADMIN_TARIFF_UPDATE,
  },
  {
    path: '/tariffs/subscriptions/create',
    name: 'Тарифы',
    element: SubscriptionTiersCreate,
    access: PERMISSION_ADMIN_TARIFF_UPDATE,
  },
  {
    path: '/tariffs/subscriptions/update/:tariffId',
    name: 'Тарифы',
    element: (props) => <TariffEdit {...props} tariffTypeId={TARIFF_TYPE_SUBSCRIPTION_TIERS} />,
    access: PERMISSION_ADMIN_TARIFF_UPDATE,
  },
  {
    path: '/push-notifications-statistic',
    name: 'Статистика',
    element: PushNotificationsStatistic,
    access: PERMISSION_ADMIN_PUSH_NOTIFICATIONS_STATISTIC,
  },
  {
    path: '/telegram-bots',
    name: 'Боты',
    element: TelegramBotsList,
    access: PERMISSION_ADMIN_TG_BOT_LIST,
  },
  {
    path: '/push-templates',
    name: 'Шаблоны',
    element: PushTemplatesIndex,
    access: PERMISSION_ADMIN_PUSH_TEMPLATES_LIST,
  },
  {
    path: '/push-templates/create',
    name: 'Шаблоны',
    element: PushTemplatesCreate,
    access: PERMISSION_ADMIN_PUSH_TEMPLATES_STORE,
  },
  {
    path: '/push-templates/update/:pushTemplateId',
    name: 'Шаблоны',
    element: PushTemplatesUpdate,
    access: PERMISSION_ADMIN_PUSH_TEMPLATES_UPDATE,
  },
  {
    path: '/push-notifications/single',
    name: 'Одноразовые',
    element: PushSingleNotifications,
    access: PERMISSION_ADMIN_SINGLE_PUSH_NOTIFICATIONS_LIST,
  },
  {
    path: '/push-notifications/regular',
    name: 'Регулярные',
    element: PushRegularNotifications,
    access: PERMISSION_ADMIN_REGULAR_PUSH_NOTIFICATIONS_LIST,
  },
  {
    path: '/push-notifications/create',
    name: 'Оповещения',
    element: PushNotificationsCreate,
    access: PERMISSION_ADMIN_PUSH_NOTIFICATIONS_STORE,
  },
  {
    path: '/push-notifications/update/:pushNotificationId',
    name: 'Оповещения',
    element: PushNotificationsUpdate,
    access: PERMISSION_ADMIN_PUSH_NOTIFICATIONS_UPDATE,
  },
  {
    path: '/all-applications',
    name: 'Все приложения',
    element: ManageApplicationIndex,
    access: PERMISSION_MANAGE_APPLICATION_READ,
  },
  {
    path: '/all-applications/update/:appId',
    name: 'Редактирования приложения',
    element: ManageApplicationUpdate,
    access: PERMISSION_MANAGE_APPLICATION_SAVE,
  },
]

export default routes
