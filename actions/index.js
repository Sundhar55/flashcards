import { getAllDecks, getDecks, saveCardToDeck, removeEntry, saveDeckTitle } from "../utils/api";

//actions/index.js

export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
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

function removeDeck(deckId){
    return{
        type: REMOVE_DECK,
        deckId
    }
}

export function handleDeleteDeck(deckId){
    return(dispatch) => {
        return removeEntry(deckId)
            .then((result) => {
                dispatch(removeDeck(deckId))
            })
    }
}

export function handleAddCard(key, card){
    return(dispatch) => {
        return saveCardToDeck(key,card)
            .then((result) => {
                dispatch(addCard(result))
            })
    }
}

export function handleAddDeck(key, newDeck){
    return(dispatch) => {
        return saveDeckTitle(key,newDeck)
            .then((result) => {
                dispatch(addDeck(result))
            })
    }
}

export function getInitialData(){
    var trial =  getAllDecks()
    return (dispatch) =>{
        return getDecks()
            .then(({decks})=>{
                dispatch(receiveDecks(decks))
            })
    }
}

