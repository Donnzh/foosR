import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Icon,
    Card
} from 'antd'
import _filter from 'lodash/filter'
import CountUp from 'react-countup'

export default class PlayerRanking extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired,
        selectedPlayer: PropTypes.string,
    }

    constructor (props) {
        super(props)
        this.state = {
            playerInfo: null,
        }
    }
    componentDidMount() {
        this.setState({
            playerInfo: this.getPlayerInfo(),
            selectedPlayer: this.props.selectedPlayer
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedPlayer !== this.props.selectedPlayer) {
            this.setState({
                playerInfo: this.getPlayerInfo(),
                selectedPlayer: this.props.selectedPlayer
            })
        }
    }

    getPlayerInfo = () => _filter(this.props.players, {'name': this.props.selectedPlayer})[0]

    render () {
        if (this.state.playerInfo) {
            const {
                name,
                won,
                lose
            } = this.state.playerInfo
            return <div style={{background: '#ECECEC', padding: '30px'}}>
                <Card title={name} bordered={false} style={{width: 300}}>
                    <p>Won: {won} </p>
                    <p>Lose: {lose} </p>
                    <p>Won/Lose Ratio:
                        <CountUp
                            start={0}
                            useEasing
                            duration={0.6}
                            decimals={2}
                            end={(won / (won + lose)).toPrecision(3)} />
                        </p>
                </Card>
            </div>
        } else {
            return null
        }
    }
}