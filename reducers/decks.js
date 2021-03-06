//reducers/decks.js

import {RECEIVE_DECKS,ADD_DECK, REMOVE_DECK} from '../actions/index'

export function decks(state={}, action){
    switch(action.type){
        case RECEIVE_DECKS :
            return{
                ...state,
                ...action.decks,
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck,

            }
        case REMOVE_DECK : 
            return {
                ...state,
                ...action.deck
            }

        default :
            return state
    }
}