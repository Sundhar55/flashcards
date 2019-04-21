import {AsyncStorage} from 'react-native'
import {DATA_STORAGE_KEY, getDeckData} from './helpers'

var deckId = ''
export function getDecks(){
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((getDeckData))
}

export  function getDeck (id){
    console.log('inside api for get deck ', id ,'---')
    deckId = id
    return  AsyncStorage.getItem(DATA_STORAGE_KEY)
       /* .then((results) => {
            resul = results
            const data = JSON.parse(results)
            console.log('resul is ', resul)
            console.log('deck is: '+ data )
        })
        */
        .then(formatDeckData)

}
 function formatDeckData(results){
    console.log('formate deck data ', results)

    const data =  JSON.parse(results)
    return data[deckId]
}
/*async getDeckDataAsync(id){
    var val = await AsyncStorage.getItem(id)
}
*/
export function saveDeckTitle(key, newDeck){
   
/*   var s = AsyncStorage.getItem(DATA_STORAGE_KEY).then(getDeckData).then((result) => {
            console.log('api ' ,result)
    })
*/

    return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [key] : newDeck
    }))
   
}

export function addCardToDeck(key, card){
    console.log('add card to deck ', key  ,'card id  ', card)
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results)=>{
            var data = JSON.parse(results)
            console.log('-------------before pushing card-------------')
            console.log('old data is ', data)
            
            data[key].questions.push(card)
            console.log('---------after pushing card ------------------')
            console.log('new data is ', data)
            
            AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
        })


}

export async function removeEntry(id){
    console.log('remove entry ', id)
    return await AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results)=>{
            var data = JSON.parse(results)
            console.log('-------------------before deleting deck----------------')
            console.log('old data is ', data)
            data[id] = undefined
            delete data[id]
            console.log('------------------after deleting deck -----------------')
            console.log('new data is ' , data)
            AsyncStorage.setItem(DATA_STORAGE_KEY,JSON.stringify(data))
            
        })
}

export function getAllDecks(){
    var d 
    getDecks().then(result => {
        d = result 
        console.log('getAllDecks is ', result)
        
    })
    console.log('after promos ', d)
    return d
}