import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Row,
    Col,
    Input,
    message,
    Tabs,
    Icon,
    Popover
} from 'antd'
const TabPane = Tabs.TabPane;

export default class PlayerList extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired,
        selectPlayer: PropTypes.func,
        addNewPlayer: PropTypes.func,
    };

    constructor (props) {
        super(props)
        this.state = {
            playerName: null,
        }
    }

    nameClickHandler = (name) => {
        this.props.selectPlayer(name);
    }
    renderPlayersInfo = () => {
        return this.props.players.map((p, i) => {
            return <div className="Player-list__item"
                        key={i}
                        onClick={() => {
                            this.nameClickHandler(p.name)
                        }}>
                {p.name}
                </div>
        })
    }
    addPlayerClickHandler = () => {
        if (!this.state.playerName) {
            message.warning('Name can not be empty ');
            return
        }
        this.props.addNewPlayer({
            name: this.state.playerName,
            won: 0,
            lose: 0
        })
        message.success('Player Added');
    }
    inputChangeHandler = (e) => {
        this.setState({
            playerName: e.target.value
        })
    }

    render () {
        const {
            players
        } = this.props
        return (
            <Col span={6}>
                <Tabs >
                    <TabPane tab={<span><Icon type="team"/> Players</span>} key="1">
                        <Row type="flex" justify="center">
                            <Col span={12}>
                                <Input
                                    onChange={this.inputChangeHandler}
                                    value={this.state.playerName}
                                    placeholder="New Player Name"/>
                            </Col>
                            <Col span={6}>
                                <Button onClick={ () => this.addPlayerClickHandler()}>New Player</Button>
                            </Col>
                        </Row>
                        <br/>
                        {this.renderPlayersInfo()}
                    </TabPane>
                </Tabs>
            </Col>
        )
    }
}
