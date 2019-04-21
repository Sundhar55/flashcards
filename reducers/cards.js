//reducers/cards.js

import {ADD_CARD} from '../actions/index'

function cards(state={}, action){
    switch(action.type){
        case ADD_CARD : 
            return{
                ...state,
                ...action.decks,
            }
        
        default :
            return state
    }
}
export default cards