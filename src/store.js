import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import reducers from 'src/reducers/index'

const store = createStore(reducers)
export default store
