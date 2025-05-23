import {
  PERMISSION_CLIENT_TEAMS_LIST,
  PERMISSION_CLIENT_USERS_LIST,
  PERMISSION_MY_COMPANY,
} from 'src/enums/permissions'

export const TAB_COMPANY = 'company'
export const TAB_TEAMS = 'teams'
export const TAB_USERS = 'users'

export default [
  {
    label: 'myCompany_company_tabName',
    value: TAB_COMPANY,
    link: '/my-company',
    permission: PERMISSION_MY_COMPANY,
  },
  {
    label: 'myCompany_teams_tabName',
    value: TAB_TEAMS,
    link: '/my-company/teams',
    permission: PERMISSION_CLIENT_TEAMS_LIST,
  },
  {
    label: 'myCompany_users_tabName',
    value: TAB_USERS,
    link: '/my-company/users',
    permission: PERMISSION_CLIENT_USERS_LIST,
  },
]
