import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Layout,
    Row,
    Col,
    Tabs,
    Icon

} from 'antd'
import GameResults from './GameResults'
import PlayerRanking from './PlayerRanking'
import './RankingBoard.scss'
const TabPane = Tabs.TabPane;

export default class RankingBoard extends Component {
    static propTypes = {
        players: PropTypes.array,
        gameResults: PropTypes.array,
        addNewPlayer: PropTypes.func,
        addGameResult: PropTypes.func,
        selectedPlayer: PropTypes.string,
        updatePlayerResult: PropTypes.func
    };

    render () {
        const {
            players,
            gameResults,
            addNewPlayer,
            addGameResult,
            selectedPlayer,
            updatePlayerResult
        } = this.props
        return (
            <Col span={18} className="">
                <Tabs defaultActiveKey="2">
                    <TabPane
                        tab={<span><Icon type="rocket"/>Results</span>}
                        key="2">
                        <GameResults
                            players={players}
                            gameResults={gameResults}
                            addNewPlayer={addNewPlayer}
                            addGameResult={addGameResult}
                            updatePlayerResult={updatePlayerResult}
                        />
                    </TabPane>
                    <TabPane tab={<span><Icon type="dot-chart" />Player Ranking</span>} key="1">
                        <PlayerRanking
                            gameResults={gameResults}
                            selectedPlayer={selectedPlayer}
                            players={players} />
                    </TabPane>
                </Tabs>
            </Col>
        )
    }
}
