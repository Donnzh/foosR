import { connect } from 'react-redux'
import {
    increment,
    selectPlayer,
    addGameResult,
    addNewPlayer,
    updatePlayerResult,
    INIT_FOOSRANKING_STATE
} from '../modules/home'

import HomeView from '../components/HomeView'

const mapDispatchToProps = {
    increment,
    selectPlayer,
    addGameResult,
    addNewPlayer,
    updatePlayerResult
}

const mapStateToProps = (state) => {
    return {
        gameResults : state.FoosballRankings.gameResults,
        players : state.FoosballRankings.players,
        selectedPlayer : state.FoosballRankings.selectedPlayer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
