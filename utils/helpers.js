//utils/helper.js

import { AsyncStorage } from 'react-native'
import {Notifications, Permissions } from 'expo'

export const DATA_STORAGE_KEY = 'Flashcards:data'
export const NOTIFICATION_KEY = 'Flashcards:notifications'
export function getDeck(id){
  var riD
  const retrivedItem = AsyncStorage.getItem(id).then((value )=>{ riD = value })
  const item = JSON.parse(riD)
  return item
}

export function getDeckData(results){
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
    AsyncStorage.setItem(DATA_STORAGE_KEY , JSON.stringify(dummyData))

    return dummyData
}

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification(){
  return {
    title : 'Take atleast one quiz',
    body : 'Dont forget to take atleast one quiz for the day',
    ios :{
      sound : true,
    },
    android : {
      sound : true,
      priority : 'high',
      sticky : false,
      vibrate : true,

    }
  }
} 

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
          if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({status}) => {
                if(status === 'granted'){
                  Notifications.cancelAllScheduledNotificationsAsync()

                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate()+1)
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(0)

                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time : tomorrow,
                      repeat : 'day',
                    }
                  )

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
              })
          }
      })
}

