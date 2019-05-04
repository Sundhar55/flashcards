//components/Deck.js

import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {getDecks,removeEntry} from '../utils/api'
import DeckDetails from './DeckDetails'
import {connect} from 'react-redux'
import {receiveDecks, RECEIVE_DECKS, getInitialData} from '../actions/index'
import Spinner from 'react-native-loading-spinner-overlay'

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
     
             },
             spinner : false
        }
    }

    
    
    componentWillReceiveProps = (nextProps) => {
        
        var deckData =  getDecks().then(result => {
            s = result
            this.setState({DeckObj : result})
        
        })
        
    }
    componentDidUpdate = ()=> {
        
    }
    componentDidMount = ()=> {
        var decks = this.props.decks
        var dispatch = this.props.dispatch
        dispatch(getInitialData())
        var s = {}
        var deckData =  getDecks().then(result => {
          s = result
          this.setState({DeckObj : result})
        
        })
      
    }

    showDeck = (navigation, value) =>{
        navigation.navigate('DeckDetails', {screenTitle : value , id : value})
    }
    render(){
        var s = {}
        var qwert = getDecks().then(result => {
            s= result
        })
        var decks = this.state.DeckObj                        
        var sp = Object.keys(decks)
        return(
            <View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView>
                
                { 
                    Object.keys(decks).map((key)=>{
                       
                       return( 
                        <View key={key}>                                
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
       padding: 20,
       margin: 2,
       alignItems : 'center',
       borderColor: '#f5f5f5',
       borderWidth: 1,
       backgroundColor: 'white',
       textAlign : 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
 })