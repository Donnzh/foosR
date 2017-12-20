import HomeView from './components/HomeView'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent */
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Home = require('./containers/HomeContainer').default
            const reducer = require('./modules/home').default
            injectReducer(store, { key: 'FoosballRankings', reducer })
            cb(null, Home)
        }, 'FoosballRankings')
    }
})
