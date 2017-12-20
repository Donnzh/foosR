import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Layout,
    Row,
    Col
} from 'antd'
import PlayerList from 'components/PlayerList/PlayerList'
import RankingBoard from 'components/RankingBoard/RankingBoard'
import './HomeView.scss'
const {Content} = Layout

export default class HomeView extends Component {
    static propTypes = {
        increment: PropTypes.func.isRequired,
        selectPlayer: PropTypes.func,
        players: PropTypes.array.isRequired,
        selectedPlayer: PropTypes.string,
        addGameResult: PropTypes.func,
        gameResults: PropTypes.array.isRequired,
        addNewPlayer: PropTypes.func,
        updatePlayerResult: PropTypes.func
    };
    updateGameResult = (data) =>{
        this.props.addGameResult(data)

    }
    updatePlayerResult = (data) => {
        this.props.updatePlayerResult(data)
    }
    updateSelectPlayer = (data) => {
        this.props.selectPlayer(data)
    }

    render () {
        const {
            increment,
            selectPlayer,
            players,
            selectedPlayer,
            addGameResult,
            addNewPlayer,
            gameResults,
        } = this.props
        return (
            <div>
                <h3>Welcome! Foosball Rrankings</h3>
                <br/>
                    <Layout>
                        <Row>
                            <PlayerList
                                players={players}
                                selectPlayer={this.updateSelectPlayer}
                                addNewPlayer={addNewPlayer}
                            />
                            <RankingBoard
                                players={players}
                                gameResults={gameResults}
                                updatePlayerResult={this.updatePlayerResult}
                                addGameResult={this.updateGameResult}
                                selectedPlayer={selectedPlayer}
                                increment={increment}
                            />
                        </Row>
                    </Layout>
            </div>
        )
    }
}
