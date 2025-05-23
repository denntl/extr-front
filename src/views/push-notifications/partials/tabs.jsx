import {
  PERMISSION_ADMIN_REGULAR_PUSH_NOTIFICATIONS_LIST,
  PERMISSION_ADMIN_SINGLE_PUSH_NOTIFICATIONS_LIST,
} from 'src/enums/permissions'

export const TAB_SINGLE = 'single'
export const TAB_REGULAR = 'auto'

export default [
  {
    label: 'push_notifications_tab_single',
    value: TAB_SINGLE,
    link: '/push-notifications/single',
    permission: PERMISSION_ADMIN_SINGLE_PUSH_NOTIFICATIONS_LIST,
  },
  {
    label: 'push_notifications_tab_regular',
    value: TAB_REGULAR,
    link: '/push-notifications/regular',
    permission: PERMISSION_ADMIN_REGULAR_PUSH_NOTIFICATIONS_LIST,
  },
]
