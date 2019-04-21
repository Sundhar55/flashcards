//component/DeckDetails.js

import React from 'react'
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import {getDeck,removeEntry, getDecks} from '../utils/api'
import {connect} from 'react-redux'

class DeckDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id : '',
            deckItem : {},
            questionsObj : {}
        }
        
        
    }
    static navigationOptions = ({navigation}) => {
        const {screenTitle } = navigation.state.params
        return {
            title : screenTitle
        }
    }
    onRefresh =(prop) =>{
        console.log('=====refresh==========', prop , '0000')
    }
    addCard = (navigation) => {
        console.log('acard')
        const deckTitle =  this.state.id
        console.log('------------add card-----------------', deckTitle)
        navigation.navigate('AddCard', {deckTitle : deckTitle, onRefresh : this.onRefresh})
    }

    startQuiz = (navigation) => {
        const questObj = this.state.deckItem.questions

        navigation.navigate('Quiz', {id : this.state.id, questions : questObj })
    }

    deleteDeck = (navigation) => {
        console.log('delete deck', this.state.id)
        this.remove()
        console.log("after deleting in deckdetails ")
        /*
        var deckDaa =  getDecks().then(result => {
            s = result
            this.setState({deckObj : result})
            console.log('delete a deck ', this.state.deckObj)
        }) , this.state.deckObj
        */
        navigation.navigate('Decks')
    }
    async remove(){
        removeEntry(this.state.id)
    }
    componentWillReceiveContext=(props)=>{
        console.log('-------------')
    }
    
    componentWillReceiveProps = (nextProps) => {
        console.log('in props decks details =====,', nextProps.sendDeck)
        console.log('---------after adding card in Decks in deckDetails-----------------------------')
        //var sp = nextProps.navigation.state.para
        var id = this.state.id
        var deckitem =  getDeck(id).then(result => {
            s = result
            this.setState({deckItem : result})
          //  console.log('state is ', this.state.DeckObj)
        })
        var deck = this.state.deckItem
        console.log('decks is did update---------------------------', deck)
        this.setState({questionsObj : deck.questions }) 
        
        console.log('new state is ', this.state.id)
    }
    /*componentDidUpdate=()=>{
        console.log('-----------------------------updated deck details----------------------------------')
        
        

    } */
    shouldComponentUpdate=(props)=>{
        console.log('-----------------------------should comp update-------------------')
        console.log('111--- ', props.update, '----')
        return true
    }
    fetchData (){
          console.log('fetchData')
      }
    componentDidMount= ()=> {
        const deckId =  this.props.navigation.state.params.id
        this.setState({id:deckId})
        //var sp = this.getDectItem(deckId).then(result => this.setState({deckItem : result}))
        const deckItem = getDeck(deckId).then(result => {
            this.setState({deckItem : result})
        })
        var deck = this.state.deckItem
        console.log('decks is ---------------------------', deck)
        this.setState({questionsObj : deck.questions }) 

        /*this.props.fetchData();
        this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
            this.props.fetchData();
        }
        );
        */
        
    }
    /*async getDectItem(deckId){
        var r =''
        const deckItem = getDeck(deckId).then(result => {
            console.log('result ' , result)
            r = result
            this.setState({deckItem : result})
            
        })
        return r
        
    }
    */
    render(){
       const deck = this.state.deckItem
       var totalCards = 0
       var title = deck.title === undefined ? "Eror in getting deck" : deck.title
       
       if(deck.questions != undefined)
            totalCards =  deck.questions.length
        return(
            <View>
                <Text style = {styles.item} >
                    {title} {"\n"}
                    <Text >
                        {totalCards} cards
                    </Text>
                    <Text></Text>
                </Text>
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
                        style = {styles.button}
                        onPress = {
                            () => this.startQuiz(this.props.navigation)
                        }>
                        <Text style = {styles.buttonText}> start quiz </Text>
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
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
       
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
     }


 })
  
  