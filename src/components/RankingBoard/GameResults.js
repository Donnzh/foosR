import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Row,
    Col,
    Icon,
    Select,
    Radio,
    message,
    Tooltip
} from 'antd'
import * as moment from 'moment';
import _ from 'lodash/filter'

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class RankingBoard extends Component {
    static propTypes = {
        players: PropTypes.array,
        gameResults: PropTypes.array,
        addGameResult: PropTypes.func,
        selectedPlayer: PropTypes.number,
        increment: PropTypes.func
    };

    constructor (props) {
        super(props)
        this.state = {
            team1: [],
            team2: [],
            winner: null,
            gameResults: []
        }
    }

    getTeamNames = (ids) => {
        let result = [];
        ids.forEach(id => {
            let i = _filter(this.props.players, {'id': id})[0].name
            result = [...result, i]
        })
        return result.toString()
    }
    renderGameResultsList = () => {
        return this.props.gameResults.map((r, i) => {
                return <Tooltip key={i} placement="top" style={{fontSize: '12px'}} title={r.time}>
                    <Row className="Game-result__listitem" type="flex" justify="center">
                        <Col span={6}>
                            <span> {r.winner === 1 ? <Icon type="like"/> : '' } {r.team1.join(', ')} </span>
                        </Col>
                        <Col span={2}><h4> vs</h4></Col>
                        <Col span={6}>
                            <span>{r.team2.join(', ')} {r.winner !== 1 ? <Icon type="like"/> : '' }</span>
                        </Col>
                    </Row>
                </Tooltip>
            }
        )
    }

    selectHandler = (e, i) => {
        if (i === 1) {
            this.setState({
                team1: e
            }, () => {
                console.log(this.state)
            })
        } else {
            this.setState({
                team2: e
            }, () => {
                console.log(this.state)
            })
        }

    }
    addResultButtonHandler = () => {
        let isSamePlayer
        let team1 = this.state.team1
        let team2 = this.state.team2
        if (team1.length === 0 || team2.length === 0) {
            message.warning('Please select Player ');
            return
        }
        if (!this.state.winner) {
            message.warning('Please select a winner ');
            return
        }
        team1.forEach(e => {
            for (let i = 0; i < team2.length; i++) {
                if (e === this.state.team2[i]) {
                    isSamePlayer = true
                }
            }
        })
        if (isSamePlayer) {
            message.warning('You have player in both team');
            return
        }
        else {
            this.props.addGameResult({
                team1: this.state.team1,
                team2: this.state.team2,
                winner: this.state.winner,
                time: moment().format('HH:mm, D-MMM-YY')
            })
            // upate player result
            team1.forEach(t => {
                this.props.updatePlayerResult({
                    name: t,
                    isWin: this.state.winner === 1 ? true : false
                })
            })
            team2.forEach(t => {
                this.props.updatePlayerResult({
                    name: t,
                    isWin: this.state.winner === 1 ? false : true
                })
            })
            message.success('Result Updated');
        }
    }

    radioOnChange = (e) => {
        this.setState({
            winner: e.target.value
        })
    }

    render () {
        const {
            players,
            gameResults,
            addPlayer,
            gotoSitselectedPlayer,
            increment,
        } = this.props
        const Options = this.props.players.map((p, i) =>
            <Option key={i} lable={p.name} value={'' + p.name}>{p.name}  </Option>
        )

        return (
            <div>
                <Row type="flex" justify="center">
                    <Col span={8}>
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            placeholder="Tags Mode"
                            onChange={(e) => this.selectHandler(e, 1)}>
                            {Options}
                        </Select>
                    </Col>
                    <Col span={2}>
                        <h2>VS</h2>
                    </Col>
                    <Col span={8}>
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            placeholder="Tags Mode"
                            onChange={(e) => this.selectHandler(e, 0)}>
                            {Options}
                        </Select>
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col span={2}>
                        <h4>Winner:</h4>
                    </Col>
                    <Col span={4}>
                        <RadioGroup onChange={this.radioOnChange} value={this.state.winner}>
                            <Radio value={1}>TEAM1</Radio>
                            <Radio value={2}>TEAM2</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Button
                        type="primary"
                        onClick={ () => {
                            this.addResultButtonHandler()
                        }}
                    >Add Result</Button>
                </Row>
                <br/>
                <div>
                    {this.renderGameResultsList()}
                </div>
            </div>
        )
    }
}
