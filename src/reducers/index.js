import { combineReducers } from 'redux'
import Auth from 'src/reducers/Auth'
import Permissions from 'src/reducers/Permissions'
import GlobalSettings from 'src/reducers/GlobalSettings'

export default combineReducers({
  Auth,
  GlobalSettings,
  Permissions,
})
