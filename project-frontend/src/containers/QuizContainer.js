import React from 'react'
import quizQuestions from '../quizQuestions'
import QuizCard from '../components/QuizCard'
import Result from '../components/Result'
export default class QuizContainer extends 
React.Component{
    
        state = {
          counter: 0,
          questionId:1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {
            1: 0,
            2: 0,
            3: 0,
            4:0,
            5:0
          },
          result: '' 
         
    }

    handleAnswerSelected=(props)=>{
        
        //event.persist()
        console.log(props.answer)
        //(event.currentTarget.value)    
        this.setUserAnswer(props.answer);
        if(this.state.questionId<quizQuestions.length){
            setTimeout(()=> this.setNextQuestion(),300)
        }
        else{
            setTimeout(()=>this.setResults(this.getResults()),300)
        }
    }

    setUserAnswer=(answer)=>{
        
        //console.log(answer)
        this.setState({answersCount:{
            ...this.state.answersCount,
            [answer]:this.state.answersCount[answer]+1
        },
        answer:answer
    })
    }

    setResults(result) {
        if (result.length === 1) {
          this.setState({ result: result[0] });
        } else {
          this.setState({ result: 'Undetermined' });
        }
      }

    setNextQuestion=()=>{
        const counter=this.state.counter + 1
        // console.log(this.state.answersCount)
        const questionId= this.state.questionId + 1
        // if(counter<=questionId-1){
            this.setState({
           counter:counter,
           questionId:questionId,
           question: quizQuestions[counter].question,
           answerOptions:quizQuestions[counter].answers,
           answer:''
        })
        
    // }

    // else{
    //     const result=this.state.result
    //    return  result 
    // }
    }
     componentWillMount(){
         this.setState({question:quizQuestions[0].question,
        answerOptions:quizQuestions[0].answers})
     }
     getResults=()=>{
        const answersCount= this.state.answersCount;
        const answersCountKeys=Object.keys(answersCount)
        const answersCountValues=answersCountKeys.map(key=>answersCount[key])
        const maxAnswerCount=Math.max.apply(null,answersCountValues);

        return answersCountKeys.filter(key=> answersCount[key]=== maxAnswerCount)
    }
renderQuiz(){
    if(this.state.questionId<=quizQuestions.length){
    return(
    <div className="quiz-list">
    
    <QuizCard content={this.state.question} answer={this.state.answer}
    
    answerOptions={this.state.answerOptions}
    questionId={this.state.questionId}
    questionTotal={quizQuestions.length}
    onAnswerSelected={this.handleAnswerSelected} /> 
  </div> 
    ) }
    else{
        this.renderResult()
    }
};
renderResult=()=>{
    return <Result quizResult={this.state.result} />
}
    render(){

    
    return(
        <div>
            {this.state.result ? this.renderResult():this.renderQuiz()}
        </div>
    )
    }       
  
}
 


