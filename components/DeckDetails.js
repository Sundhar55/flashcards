//component/DeckDetails.js

import React from 'react'
import {View,Text, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import {getDeck,removeEntry, getDecks} from '../utils/api'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import { handleDeleteDeck } from '../actions';

class DeckDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id : '',
            deckItem : {},
            questionsObj : {},
            spinner : false,
            opacity : new Animated.Value(0)
        }
        
        
    }
    static navigationOptions = ({navigation}) => {
        const {screenTitle } = navigation.state.params
        return {
            title : screenTitle
        }
    }
    onRefresh =(prop) =>{
        
    }
    addCard = (navigation) => {
        const deckTitle =  this.state.id
        navigation.navigate('AddCard', {deckTitle : deckTitle, onRefresh : this.onRefresh})
    }

    startQuiz = (navigation) => {
        const questObj = this.state.deckItem.questions
        navigation.navigate('Quiz', {id : this.state.id, questions : questObj })
    }

    deleteDeck = (navigation) => {
        this.remove()
        /*
        var deckDaa =  getDecks().then(result => {
            s = result
            this.setState({deckObj : result})
            
        }) , this.state.deckObj
        */
        navigation.navigate('Decks')
    }
    async remove(){
        const dispatch= this.props.dispatch
         dispatch(handleDeleteDeck(this.state.id))
        
    }
    componentWillReceiveProps = (nextProps) => {
        //this.setState({spinner : !this.state.spinner})
        var id = this.state.id
        var deckitem =  getDeck(id).then(result => {
            s = result
            this.setState({deckItem : result})
        })
        var deck = this.state.deckItem
        this.setState({questionsObj : deck.questions }) 
        
    }
    
    componentDidMount= ()=> {
        const deckId =  this.props.navigation.state.params.id
        this.setState({id:deckId})
        const deckItem = getDeck(deckId).then(result => {
            this.setState({deckItem : result})
        })
        var deck = this.state.deckItem
        this.setState({questionsObj : deck.questions }) 

        const opacity  = this.state.opacity
        Animated.timing(opacity,{toValue:1 , duration:1500})
            .start()
    }
    
    render(){
       const deck = this.state.deckItem
       const opacity = this.state.opacity
       var totalCards = 0
       var title = ""
       if(deck !==  undefined)
            title = deck.title === 'undefined' ? "Eror in getting deck" : deck.title
       
       if(deck !== undefined &&  deck.questions != undefined)
            totalCards =  deck.questions.length
        return(
            <View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Animated.Text style = {[styles.item,{opacity}]} >
                    {title} {"\n"}
                    <Text >
                        {totalCards} cards
                    </Text>
                    <Text></Text>
                </Animated.Text>
                <View>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {
                            () => this.addCard(this.props.navigation)
                        }>
                        <Text style = {styles.buttonText}> Add Card </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {
                            () => this.deleteDeck(this.props.navigation)
                        }>
                        <Text style = {styles.buttonText}> Delete Deck </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.buttonQuiz}
                        type='outline'
                        onPress = {
                            () => this.startQuiz(this.props.navigation)
                        }>
                        <Text style = {styles.quizText} > start quiz </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
function mapStateToProps({decks,cards}){
    return{
        decks: decks,
        cards : cards ,
    }
}
export default connect(mapStateToProps)(DeckDetails) 


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
    button: {
       //backgroundColor: '#7a42f4',
       backgroundColor: 'purple',
       padding: 10,
       margin: 15,
       height: 40,
       
    },
    buttonQuiz: {
        padding: 10,
        margin: 35,
        height: 70,
        
     },
    quizText: {
        color: '#7a42f4',
       textAlign : 'center',
       fontSize : 30,

     },
    buttonText:{
       color: 'white',
       textAlign : 'center',
       
    },
    titleText : {
        fontSize : 20,
        fontWeight : 'bold',
    },
    bodyText : {
        fontSize : 20,
        fontWeight : 'bold',
    },
    item: {
        fontSize : 20,
        fontWeight : 'bold',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        borderColor: '#2a4944',
        textAlign : 'center'
     },
    spinnerTextStyle: {
        color: '#FFF'
      },
 })
  
  