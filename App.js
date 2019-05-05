import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import Decks from './components/Decks'
import AddNewDeck from './components/AddNewDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {TabNavigator, StackNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import { white, purple } from './utils/colors';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Constants} from 'expo'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware';
import {setLocalNotification} from './utils/helpers'
import {getDecks,} from './utils/api'


const store = createStore(reducer, middleware)
function UdaciStatusBar({backgroundColor , ...props}){
  return(
      <View style={{backgroundColor, height : Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
      </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks : {
    screen : Decks,
    screenProps: {screenName : Decks},
    navigationOptions : {
      tabBarLabel :  'Decks',
      tabBarIcon : ({tintColor}) => <Ionicons name = 'ios-bookmarks' size={30} color={tintColor} />,
      /*tabBarOnPress : (navigation) => {
        var DeckObj
        var deckData =  getDecks().then(result => {
          DeckObj = result
      
        })
        
      } */
    },
  },
  AddNewDeck : {
    screen : AddNewDeck,
    navigationOptions : {
      tabBarLabel : 'Add New Deck',
      tabBarIcon : ({tintColor}) => <FontAwesome name = 'plus-square' size={30} color={tintColor} />
    },
  },
},{
  navigationOptions : {
    header : null ,
  },
  tabBarOptions : {
      activeTintColor : Platform.OS === 'ios' ? purple : white,
      style : {
        height : 56 ,
        backgroundColor : Platform.OS === 'ios' ? white : purple,
        shadowColor : 'rgba(0,0,0,.24)',
        shadowOffset : {
          width : 0,
          height : 3
        },
        shadowRadius : 6,
        shadowOpacity : 1
      }
  }
}
)

const MainStacksNavigator = createStackNavigator({
  Home : {
    screen : Tabs,
    navigationOptions : {
      header : null
    }
  },
  Decks : {
    screen : Decks,
    navigationOptions : ({navigation})=>({
      headerTintColor : white,
      headerStyle : {
        backgroundColor : purple,
      },
    }),
  },
  DeckDetails : {
    screen : DeckDetails,
    navigationOptions : ({navigation}) => ({
      headerTintColor : white,
      headerStyle:{
        backgroundColor : purple,
      }
    })
  },
  Quiz : {
    screen : Quiz,
    navigationOptions : ({navigation}) => ({
      headerTintColor : white,
      headerStyle :{
        backgroundColor : purple,
      }
    })
  },
  AddCard : {
    screen : AddCard,
    navigationOptions : ({navigation}) => ({
      headerTintColor : white,
      headerStyle :{
        backgroundColor : purple,
      }
    })
  }
})

const AllTabs = createAppContainer(MainStacksNavigator)

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle = 'light-content'/>
          <AllTabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

