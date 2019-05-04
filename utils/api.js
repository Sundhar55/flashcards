import {AsyncStorage} from 'react-native'
import {DATA_STORAGE_KEY, getDeckData} from './helpers'

var deckId = ''
export function getDecks(){
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((getDeckData))
}

export  function getDeck (id){
    deckId = id
    return  AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then(formatDeckData)

}
 function formatDeckData(results){
    const data =  JSON.parse(results)
    return data[deckId]
}
export function saveDeckTitle(key, newDeck){
    return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [key] : newDeck
    }))
   
}

export async function saveCardToDeck(key, card){
    var item = await AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results)=>{
            var data = JSON.parse(results)
            data[key].questions.push(card)
            
            AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
        })
    return item
}

export async function removeEntry(id){
    return await AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results)=>{
            var data = JSON.parse(results)
            data[id] = undefined
            delete data[id]
            AsyncStorage.setItem(DATA_STORAGE_KEY,JSON.stringify(data))
        })
}

export function getAllDecks(){
    var decks 
    getDecks().then(result => {
        decks = result 
        
    })
    return decks
}