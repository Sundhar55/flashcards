//components/AddNewDeck.js

import React from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {getDecks} from '../utils/api'
import {connect} from 'react-redux'
import {addDeck, ADD_DECK} from '../actions/index'


 class AddNewDeck extends React.Component{
    state = {
        deckValue : '',
        deckObj : {}
    }

    handleText = (text) =>{
        console.log('d :' + text )
        this.setState({deckValue : text})
    }
    submitDeck =(text, navigation)=>{
        console.log('new deck text is : '+ this.state.deckValue)
        var entry = {title: text , questions : []}

       /* this.props.dispatch(addDeck({
            entry
        }))
        */
        console.log('entry is ', entry)
        saveDeckTitle(text,entry )
        var deckDaa =  getDecks().then(result => {
            s = result
            this.setState({deckObj : result})
            console.log('add new deck ', this.state.deckObj)
        })
        navigation.navigate('Decks', this.state.deckObj )


    }
    render(){
        return(
            <View>
                <Text>
                    Add New Deck ,  Avoid having same name for mutiple decks

                </Text>
                <Text>What is the title of the new deck?</Text>

                <TextInput style={styles.input} placeholder="name of deck"  editable={true} maxLength={40} 
                    onChangeText={this.handleText} />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.submitDeck(this.state.deckValue , this.props.navigation)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
 }
 function mapStateToProps(state){
     return{
         deck : 'der'
     }
 }

 //export default AddNewDeck
 export default (connect(mapStateToProps)((AddNewDeck)))
 const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
       
    },
    submitButtonText:{
       color: 'white',
       textAlign : 'center',
       
    }
 })