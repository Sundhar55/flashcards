//components/Quiz.js
 import React from 'react'
 import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
 import {clearLocalNotification , setLocalNotification} from '../utils/helpers'

 class Quiz extends React.Component{
     constructor(props){
         super(props)
         this.state = {
             id: '',
             questions : [],
             qno : 0,
             over : false,
             showAnswer : false, 
             startAgain : false,
             correctAns : 0,
         }
     }
    static navigationOptions = ({navigation}) => {
        const {cardId } = navigation.state.params

        return {
            title : 'quiz'
        }
    }
    submitAnswer = (answer) =>{
        var j = this.state.correctAns
        var i = this.state.qno
        if(answer){
            this.setState({
                correctAns : ++j,
            })
        }
        this.setState({qno : ++i})
        clearLocalNotification()
            .then(setLocalNotification)
    }

    showNext = (navigation) => {
        var i = this.state.qno
        this.setState({qno : ++i})

    }
    showAnswer = (navigation) => {
        this.setState({
            showAnswer : !this.state.showAnswer
        });
    }
    startAgain = () => {
        this.setState({
            over : !false,
            qno : 0,
            correctAns : 0
            
        })
    }
    componentDidMount(){
        const deckId =  this.props.navigation.state.params.id
        const ques = this.props.navigation.state.params.questions
        this.setState({id:deckId , questions : ques})


    }
     render(){
         const qLength = this.state.questions.length
         const questions = this.state.questions
         const qno = this.state.qno
         const remQstn = qLength - qno
         const showAnsButton = this.state.startAgain
         var quest = questions[this.state.qno]
         const correctAnswers = this.state.correctAns
         var over = false;
         if(qno >= qLength){
            over = true;
         }
        const showAns = this.state.showAnswer
         return(

            
            <View>
                {qLength === 0 
                    ?
                    <View>
                    <Text style = {styles.noQstn}>
                        Sorry, no questions to take quiz. kindly go back.
                    </Text>
                    </View> 
                    :
                    <View>
                        {(!over) ? <Text style={styles.textRmQstn}>Quiz : {qno+1} / {qLength}</Text> : null}
                        <Text></Text>
                        <View>
                                {(questions !== undefined && !over)? <Text style={styles.textQstn}>  {quest.question} </Text> 
                                : 
                                    <View>
                                    <Text style={styles.textQstn}> Questions answered correctly : {correctAnswers}</Text>
                                    <TouchableOpacity
                                        style = {styles.nextQstnButton}
                                        onPress = {
                                            () => this.startAgain()
                                        }>
                                        <Text style = {styles.nextQstnButtonText}> Start Again </Text>
                                    </TouchableOpacity>
                                    </View>
                                     }
                            
                            {!over ? 
                                <View >
                                    <TouchableOpacity
                                        style = {styles.showAnswerButton}
                                        onPress = {() => this.showAnswer( this.props.navigation)}
                                    >
                                        <Text style = {styles.showAnserButnText}> {showAns ? 'Hide Answer' : 'Show Answer'}  </Text>
                                    </TouchableOpacity> 
                                    <View>
                                        {showAns && !over ? <Text style={styles.textAnsr}>{quest.answer}</Text> : null} 
                                    </View>
                                    <View style={styles.bottom}>
                                        <TouchableOpacity
                                            style = {styles.correctButton}
                                            onPress = {() => this.submitAnswer(true)}
                                        >
                                            <Text style = {styles.submitButtonText}> Correct  </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style = {styles.inCorrectButton}
                                            onPress = { () => this.submitAnswer(false)
                                        }>
                                            <Text style = {styles.submitButtonText}> Incorrect  </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style = {styles.nextQstnButton}
                                            onPress = { () => this.showNext( this.props.navigation)}
                                        >
                                            <Text style = {styles.nextQstnButtonText}> Next  </Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    
                                    
                                </View>
                            : null }
                            
                        </View>
                    </View> 
                }
                
            </View>
         )
         
     }
 }

 export default Quiz

 const styles = StyleSheet.create ({
    noQstn: {
       marginTop: 40,
       textAlign: 'center',
       color: 'black',
       fontWeight: 'bold',
       fontSize: 20
    },
    textQstn :{
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    textAnsr: {
        textAlign: 'center',
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20
     },
    textRmQstn:{
        marginLeft : 250,
        textAlign : 'right',
        color: 'red',
        backgroundColor : '#ADD8E6',
        fontWeight : 'normal',
        fontSize: 20
    },
    nextQstnButton: {
        backgroundColor: 'black',
        padding: 10,
        margin: 15,
        height: 40,
        marginLeft : 100,
        width : 150,
        
        
     },
     showAnswerButton : {
        backgroundColor: '#f5f5f5',
        padding: 10,
        margin: 15,
        height: 40,
        marginLeft : 100,
        width : 150
     },
     correctButton : {
        backgroundColor: 'green',
        padding: 10,
        margin: 15,
        height: 40,
        marginLeft : 100,
        width : 150,
        
     },
     inCorrectButton : {

        backgroundColor: 'red',
        padding: 10,
        margin: 'auto',
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft : 100,
        
     },
     showAnserButnText :{
         color: 'black',
         textAlign : 'center'
     },
     submitButtonText:{
        color: 'white',
        textAlign : 'center',

     },
     nextQstnButtonText :{
         color : 'white',
         textAlign : 'center',
     },
     bottom : {
         marginTop : 80,
         
        
     }
 })