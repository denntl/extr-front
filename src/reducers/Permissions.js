export const ACTION_SET_PERMISSIONS = 'set_permissions'

const initState = {
  permissions: [],
}

const Permissions = (state = initState, { type, payload }) => {
  switch (type) {
    case ACTION_SET_PERMISSIONS:
      return { ...state, permissions: payload }
    default:
      return { ...state, ...initState }
  }
}

export default Permissions
