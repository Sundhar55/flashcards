//components/Quiz.js
 import React from 'react'
 import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

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
        if(answer){
            this.setState({correctAns : ++j})
        }

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
         console.log('questions s --- ',quest, 'over flag ', over, ' qno ', qno, 'show ans ', this.state.showAnswer)
         return(

            
            <View>
                {qLength === 0 
                    ?
                    <View>
                    <Text style = {styles.textQstn}>
                        Sorry, no questions to take quiz. kindly go back.
                    </Text>
                    </View> 
                    :
                    <View>
                        <Text> Lets begin</Text>
                        <Text style={styles.textRmQstn}>Unanswered : {remQstn}</Text>
                        <Text></Text>
                        <View>
                            
                                {(questions !== undefined && !over)? <Text> ert {quest.question} </Text> 
                                : 
                                    <View>
                                    <Text> ALL QUESTIONS are over {"\n"} Do you want to start the quiz again ? </Text>
                                    <Text> Questions answered correctly : {correctAnswers}</Text>
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
                                <View>
                                    <TouchableOpacity
                                        style = {styles.showAnswerButton}
                                        onPress = {() => this.showAnswer( this.props.navigation)}
                                    >
                                        <Text style = {styles.submitButtonText}> {showAns ? 'Hide Answer' : 'Show Answer'}  </Text>
                                    </TouchableOpacity> 

                                    <TouchableOpacity
                                        style = {styles.showAnswerButton}
                                        onPress = {() => this.submitAnswer(true)}
                                    >
                                        <Text style = {styles.submitButtonText}> Correct  </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style = {styles.showAnswerButton}
                                        onPress = { () => this.submitAnswer(false)
                                    }>
                                        <Text style = {styles.submitButtonText}> Incorrect  </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            : null }
                            
                            {showAns && !over ? <Text>{quest.answer}</Text> : null}
                            {!over ?
                            <TouchableOpacity
                                style = {styles.nextQstnButton}
                                onPress = { () => this.showNext( this.props.navigation)}
                            >
                                <Text style = {styles.nextQstnButtonText}> Next  </Text>
                            </TouchableOpacity>
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
    textQstn: {
       marginTop: 40,
       textAlign: 'center',
       color: 'black',
       fontWeight: 'bold',
       fontSize: 20
    },
    textRmQstn:{
        marginLeft : 240,
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
        
     },
     showAnswerButton : {
        backgroundColor: '#f5f5f5',
        padding: 10,
        margin: 15,
        height: 40,
     },
     submitButtonText:{
        color: 'black',
        textAlign : 'center',
     },
     nextQstnButtonText :{
         color : 'white',
         textAlign : 'center',
     }
 })