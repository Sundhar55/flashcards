//utils/helper.js

import { AsyncStorage } from 'react-native'

export const DATA_STORAGE_KEY = 'Flashcards:data'

export function getDeck(id){
  console.log('inside getDeck ' , id)
  var riD
  const retrivedItem = AsyncStorage.getItem(id).then((value )=>{ riD = value })
  const item = JSON.parse(riD)
  return item
}
/*async getDeck(id) {
  const retrivedItem = await AsyncStorage.getItem(id)
  const item = JSON.parse(retrivedItem)
  return item
}
*/
export function getDeckData(results){
    console.log('getdeckdata results are ', results)
        return results === null ? loadedData() : initialData(results)
}

function loadedData(){
    var dummyData = {
        React1: {
          title: 'React1',
          questions: [{
              qs : '1',
              t : '2'
            },
            ]
        }
    }
    return dummyData
}

function initialData(results){
    console.log('initial data ', results)
    //AsyncStorage.clear()
    var dummyData = {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
  }
    var dummy
    if (results !== null){
      
     dummyData =  Object.assign(dummyData, JSON.parse(results))
    }
    /* if(results !== null){
      dummy = JSON.parse(results)
      AsyncStorage.setItem(DATA_STORAGE_KEY , JSON.stringify(dummy))

      return dummy
    }
    */
    
    

    AsyncStorage.setItem(DATA_STORAGE_KEY , JSON.stringify(dummyData))

    return dummyData
}


