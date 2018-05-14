import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Icon,
    Card,
    Select,
    Row,
    Col,
    Popover
} from 'antd'
import _filter from 'lodash/filter'
import CountUp from 'react-countup'
import {AreaChart} from 'react-easy-chart';

const Option = Select.Option;

export default class PlayerRanking extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired,
        selectedPlayer: PropTypes.string,
        gameResults: PropTypes.array
    }

    constructor (props) {
        super(props)
        this.state = {
            playerInfo: null,
            comparedPlayer: null
        }
    }

    componentDidMount () {
        this.setState({
            playerInfo: this.getPlayerInfo(this.props.selectedPlayer),
            selectedPlayer: this.props.selectedPlayer
        })
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.selectedPlayer !== this.props.selectedPlayer) {
            this.setState({
                playerInfo: this.getPlayerInfo(this.props.selectedPlayer),
                selectedPlayer: this.props.selectedPlayer
            })
        }
    }
    getPlayerInfo = (name) => _filter(this.props.players, {'name': name})[0]

    getPlayerChartData = (name) => {
        let allResults = this.props.gameResults
        let winTimes = 0
        let loseTimes = 0
        let data = []
        let playTimes = 0
        allResults.map( (r) => {
            if(r.team1.includes(name)) {
                if(r.winner === 1) {
                    winTimes++
                }else {
                    loseTimes++
                }
                playTimes++
                data.push({x: playTimes, y: winTimes/loseTimes === Infinity? 1 : winTimes/loseTimes  } )
            } else if (r.team2.includes(name)) {
                if(r.winner === 1) {
                    loseTimes++
                }else {
                    winTimes++
                }
                playTimes++
                data.push({x: playTimes, y: winTimes/loseTimes === Infinity? 1 : winTimes/loseTimes} )
            }
        })
        return [data]
    }

    renderPlayerInfoCard = (name, won, lose) => {
        const content = (
            <div>
                <AreaChart
                    axes
                    xDomainRange={[0, 20]}
                    yDomainRange={[0, 10]}
                    verticalGrid
                    interpolate={'cardinal'}
                    width={160}
                    height={160}
                    data={this.getPlayerChartData(name)}
                />
            </div>
        );
        return  <Popover content={content} placement="left" trigger="hover">
            <Card title={name} bordered={false} style={{width: 300}}>
                <p>Won: {won} </p>
                <p>Lose: {lose} </p>
                <p>Won/Lose Ratio: {this.getCountUpAnimation((won / (won + lose)).toPrecision(3), 2)}
                </p>
            </Card>
            </Popover>
    }

    selectHandler = (e) => {
        e ? this.setState({comparedPlayer: e}) : null
    }
    renderCompareCard = () => {
        if (this.state.comparedPlayer) {
            let {name, won, lose} = this.getPlayerInfo(this.state.comparedPlayer)
            return this.renderPlayerInfoCard(name, won, lose)
        }
    }
    renderCompareResulte = () => {
        let totalPlayedTime = 0
        let wonTimes = 0
        let loseTimes = 0
        let selectPlayer = this.state.selectedPlayer
        let comparedPlayer = this.state.comparedPlayer
        let allResults = this.props.gameResults

        let team1Data = allResults.map((r, i) => {
            if (r.team1.includes(selectPlayer) && r.team2.includes(comparedPlayer)) {
                totalPlayedTime++
                if (r.winner === 1) {
                    wonTimes++
                } else {
                    loseTimes++
                }
            } else if (r.team2.includes(selectPlayer) && r.team1.includes(comparedPlayer)) {
                totalPlayedTime++
                if (r.winner === 1) {
                    loseTimes++
                } else {
                    wonTimes++
                }
            }
        })
        return <div>
            <h3> Total Played: {this.getCountUpAnimation(totalPlayedTime, 0)} times</h3>
            <h4>Won: {this.getCountUpAnimation(wonTimes, 0)} </h4>
            <h4>lost: {this.getCountUpAnimation(loseTimes, 0)} </h4>
        </div>
    }

    getCountUpAnimation = (e, decimals) => <CountUp start={0} useEasing duration={0.6} decimals={decimals} end={e}/>

    render () {
        if (this.state.playerInfo) {
            const {
                name,
                won,
                lose
            } = this.state.playerInfo
            const Options = this.props.players.map((p, i) =>
                <Option key={i} lable={p.name} value={'' + p.name}>{p.name}  </Option>
            )
            const colStyle = {display: 'flex', justifyContent: 'center'}
            return <div style={{background: '#ECECEC', padding: '30px'}}>
                <Row type="flex" justify="center">
                    <Col style={colStyle} md={8} sm={20}>
                        {this.renderPlayerInfoCard(name, won, lose)}
                    </Col>
                    <Col style={colStyle} md={6} sm={10} xs={12}>
                        <div style={{width: '100%', margin:'20px'}}>
                            <Select
                                showSearch
                                style={{width: '100%'}}
                                placeholder="Comppare with"
                                onChange={(e) => this.selectHandler(e, 1)}>
                                {Options}
                            </Select>
                            <div>
                                <br/>
                                {this.state.comparedPlayer && this.state.comparedPlayer !== this.state.selectedPlayer
                                    ? this.renderCompareResulte() : null}
                            </div>
                        </div>
                    </Col>
                    <Col style={colStyle} md={8} sm={20}>
                        {this.state.comparedPlayer ? this.renderCompareCard() : null }
                    </Col>
                </Row>
            </div>
        } else {
            return null
        }
    }
}