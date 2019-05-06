//components/AddCard.js
import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity}  from 'react-native'
import {addCardToDeck,getDeck} from '../utils/api'
import {connect} from 'react-redux'
import { handleAddCard } from '../actions';


class AddCard extends React.Component{
    state = {
            deckName : '',
            question : '',
            answer : ''
        }
        
    
    static navigationOptions = ({navigation}) => {
        const {deckTitle } = navigation.state.params
        return {
            title : 'Add Card'    
        }
    }

    handleQuestion = (text)=> {
        this.setState({question : text})
        
    }
    handleAnswer = (text) => {
        this.setState({answer : text})
    }

    submitCard = (id,navigation) => {
        var qstnObj = {
            answer : this.state.answer,
            question : this.state.question
        }
        const key = this.state.deckName
        const dispatch= this.props.dispatch
            
        
        const { answer, question} = this.state
        if(!answer || !question) {
            return alert("enter both field")
        }
        dispatch(handleAddCard(id, qstnObj))
        var sendDeck = {}
        var id = this.state.deckName



        var deckitem =  getDeck(id).then(result => {
            s = result
            sendDeck = result
        })
        navigation.navigate('DeckDetails', {} )
    }
    componentDidMount= ()=> {
       
    }
    render(){
        const id = this.props.navigation.state.params.deckTitle
        
        return(
            <View>
                <TextInput style={styles.input} placeholder="question"  editable={true} maxLength={40} 
                    onChangeText={this.handleQuestion} />
                
                <TextInput style={styles.input} placeholder="answer"  editable={true} maxLength={40} 
                    onChangeText={this.handleAnswer} />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.submitCard(id, this.props.navigation)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
            
    }
}
function mapStateToProps({decks,cards}){
    return{
        decks : decks,
        cards : cards,
    }
}

export default connect(mapStateToProps)(AddCard)

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
       backgroundColor: 'black',
       padding: 10,
       margin: 15,
       height: 40,
       
    },
    submitButtonText:{
       color: 'white',
       textAlign : 'center',
       
       
    }
 })