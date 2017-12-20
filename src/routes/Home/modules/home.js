import {
    createAction,
    handleActions
} from 'redux-actions'
import * as moment from 'moment';
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER'
export const SELECT_PLAYER = 'SELECT_PLAYER'
export const ADD_GAME_RESULT = 'ADD_GAME_RESULT'
export const UPDATE_PLAYER_RESULT = 'UPDATE_PLAYER_RESULT'

export const INIT_FOOSRANKING_STATE = {
    players: [
        {
            name: 'Tony Spredeman',
            won: 1,
            lose: 0
        },
        {
            name: 'Loffredo Todd',
            won: 0,
            lose: 1
        },
        {
            name: 'Denial Deng',
            won: 0,
            lose: 1
        }

    ],
    gameResults: [
        {
            resultId: 0,
            team1: ['Tony Spredeman'],
            team2: ['Loffredo Todd'],
            time: moment(new Date(2017, 9, 16)).format('LLLL'),
            winner: 1
        },
        {
            resultId: 1,
            team1: ['Loffredo Todd', 'Tony Spredeman'],
            team2: ['Denial Deng'],
            time: moment().format('LLLL'),
            winner: 1
        },

    ],
    selectedPlayer: 'Tony Spredeman',
    integer: 2,
}
// ------------------------------------
// Actions
// ------------------------------------

const incrementAction = createAction(COUNTER_INCREMENT)
const selectPlayerAction = createAction(SELECT_PLAYER)
const addGameResultAction = createAction(ADD_GAME_RESULT)


export function increment () {
    return (dispatch, getState) => {
        dispatch({
            type: COUNTER_INCREMENT,
            payload: getState().integer++
        })
    }
}
export function selectPlayer (id) {
    return {
        type: SELECT_PLAYER,
        payload: id
    }
}

export function addGameResult (result) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_GAME_RESULT,
            payload: result
        })
    }
}

export function addNewPlayer (player) {
    return {
        type: ADD_NEW_PLAYER,
        payload: player
    };
}

export function updatePlayerResult (result) {
    return {
            type: UPDATE_PLAYER_RESULT,
            payload: result
        }
}

export const actions = {
    increment,
    selectPlayer,
    addGameResult,
    addNewPlayer,
    updatePlayerResult
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [COUNTER_INCREMENT]: (state, action) => Object.assign({}, state, {
        integer: action.payload
    }),
    [ADD_NEW_PLAYER]: (state, action) => Object.assign({}, state, {
        players: [...state.players, action.payload],
    }),
    [SELECT_PLAYER]: (state, action) => Object.assign({}, state, {
        selectedPlayer: action.payload
    }),
    [ADD_GAME_RESULT]: (state, action) => {
        let result = {
            ...state,
            gameResults: [...state.gameResults, action.payload]
        }
        return result
    },
    [UPDATE_PLAYER_RESULT]: (state, action) => {
        let players = state.players
        let targetPlayerIndex = players.map((v,i) => v.name === action.payload.name ? i : -1).filter(v => v > -1)[0];
        if (players[targetPlayerIndex]) {
            let wonTimes = players[targetPlayerIndex].won
            let loseTime = players[targetPlayerIndex].lose
            if(action.payload.isWin) {
                //TODO: should use immutable.js
                return {
                    ...state,
                    players : [
                        ...state.players.slice(0, targetPlayerIndex),
                        Object.assign({}, state.players[targetPlayerIndex], {won: wonTimes + 1}),
                        ...state.players.slice(targetPlayerIndex + 1)
                    ]
                }
            } else {
                return {
                    ...state,
                    players : [
                        ...state.players.slice(0, targetPlayerIndex),
                        Object.assign({}, state.players[targetPlayerIndex], {lose: loseTime + 1}),
                        ...state.players.slice(targetPlayerIndex + 1)
                    ]
                }
            }

        }
    }

}

// ------------------------------------
// Reducer
// ------------------------------------
export default function homeReducer (state = INIT_FOOSRANKING_STATE, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
