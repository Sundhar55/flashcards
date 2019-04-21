//components/Deck.js

import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {getDecks,removeEntry} from '../utils/api'
import DeckDetails from './DeckDetails'
import {connect} from 'react-redux'
import {receiveDecks, RECEIVE_DECKS, getInitialData} from '../actions/index'


class Decks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Decks: [
                {
                   id: 0,
                   name: 'Deck1',
                },
                {
                   id: 1,
                   name: 'Deck2',
                },
                
             ],
             DeckObj : {
     
             }
        }
    }

    
    
    componentWillReceiveProps = (nextProps) => {
        console.log('in props decks ')
        console.log('---------after adding in Decks------------')
        //var sp = nextProps.navigation.state.para
        var deckData =  getDecks().then(result => {
            s = result
            this.setState({DeckObj : result})
          //  console.log('state is ', this.state.DeckObj)
        })
        
        console.log('new state is ', this.state.DeckObj)
        
    }
    componentDidUpdate = ()=> {
        console.log('com did update')
    }
    componentDidMount = ()=> {
        var decks = this.props.decks
        //var cards = this.props.cards
        var dispatch = this.props.dispatch
        dispatch(getInitialData())
        //tryd.then(result => {
        //    console.log('tryd result ', result)
        // })
        console.log('comp did mount redux decks ', decks)
        //console.log('comp did mount redux decks 2 ', tryd)
        
       // console.log('comp did mount redux cards2 ', cards)
        var s = {}
        removeEntry()
      var deckData =  getDecks().then(result => {
          s = result
          this.setState({DeckObj : result})
        //  console.log('state is ', this.state.DeckObj)
      })
      
      console.log('data in Decks is from s : ', s)
      
    }

    showDeck = (navigation, value) =>{
        //navigation.setParams({screenTitle : value })
        navigation.navigate('DeckDetails', {screenTitle : value , id : value})
    }
    render(){
        var s = {}
        //console.log('render')
        var qwert = getDecks().then(result => {
            //console.log('inside s ', result)
            s= result
           // console.log('inside s ', s)
        })
        var decks = this.state.DeckObj                        
        //var decks = s;
        var sp = Object.keys(decks)
        //console.log('spis ', sp)
        return(
            <View>
                <ScrollView>
                
                { 
                    Object.keys(decks).map((key)=>{
                       
                       return( 
                        <View>                                
                            <View>
                                <TouchableOpacity
                                key = {key}
                                style = {styles.container}
                                onPress = {() => this.showDeck(this.props.navigation, key)}>
                                <Text style = {styles.item}>
                                    {decks[key].title}{"\n"}
                                    <Text> {decks[key].questions !== undefined ? decks[key].questions.length : 0} cards</Text>
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                       )
                    })
                    
                    
                    /* this.state.Decks.map((item, index) => (
                        <View>
                        <TouchableOpacity
                            key = {item.id}
                            style = {styles.container}
                            onPress = {() => this.showDeck(this.props.navigation)}>
                            <Text style = {styles.item}>
                                {item.name} {"\n"} 
                                cards
                            </Text>
                        </TouchableOpacity>
                        </View>
                    
                    )) 
                    */

                }
                </ScrollView>  
            </View>
        )
    }
    
}

function mapStateToProps({decks,cards}){
    console.log('mapstate ' , decks )
    return{
        decks : decks,
        cards: cards,
        
    }
}
//export default Decks
export default connect(mapStateToProps)(Decks)
const styles = StyleSheet.create ({
    item: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       padding: 30,
       margin: 2,
       borderColor: '#2a4944',
       borderWidth: 1,
       backgroundColor: '#d2f7f1',
       textAlign : 'center'
    }
 })