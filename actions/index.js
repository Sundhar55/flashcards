import { getAllDecks, getDecks } from "../utils/api";

//actions/index.js

export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARDS'

function receiveDecks(decks){
    return{
        type : RECEIVE_DECKS,
        decks,
    }
}

function addDeck(deck){
    return{
        type : ADD_DECK,
        deck,
    }   
}

function addCard(card){
    return{
        type : ADD_CARD,

        card
    }
}

export function getInitialData(){
    console.log('inside get initialData')
    var trial =  getAllDecks()
    console.log('trial is ', trial )
    return (dispatch) =>{
        return getDecks()
            .then(({decks})=>{
                console.log('action geting initialdata ' , decks)
                dispatch(receiveDecks(decks))
            })
    }
}

