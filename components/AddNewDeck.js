//components/AddNewDeck.js

import React from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {getDecks} from '../utils/api'
import {connect} from 'react-redux'
import {addDeck, ADD_DECK,handleAddDeck} from '../actions/index'


 class AddNewDeck extends React.Component{
    state = {
        deckValue : '',
        deckObj : {},
        text : ''
    }

    handleText = (text) =>{
        this.setState({
            deckValue : text,
            text: text 
        })
    }
    submitDeck =(text, navigation)=>{

        if(!text) { 
            return alert("Add the Deck Name")
       }
        var entry = {title: text , questions : []}
        const dispatch= this.props.dispatch
        dispatch(handleAddDeck(text,entry))
        
        //saveDeckTitle(text,entry )
        var deckDaa =  getDecks().then(result => {
            s = result
            this.setState({deckObj : result})
            
        })
        this.setState({
            text: '' 
        })
        navigation.navigate('DeckDetails',  {screenTitle : text , id : text} )


    }
    render(){
        return(
            <View>
                
                <Text style = {styles.titleText}>What is the title of the new deck?</Text>
                
                <TextInput style={styles.input} placeholder="name of new deck"  editable={true} maxLength={40} 
                    onChangeText={this.handleText} value= {this.state.text} clearButtonMode='always' />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.submitDeck(this.state.text , this.props.navigation)
                    }>
                    <Text style = {styles.submitButtonText}> Create Deck </Text>
                </TouchableOpacity>
                <Text>
                    Note : Avoid having same name for mutiple decks
                </Text>
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
    titleText : {
        margin: 30,
        marginTop : 80,
        fontSize : 20,
        fontWeight : 'bold'
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