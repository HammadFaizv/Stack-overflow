import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {

    const [ questionTitle, setQuestionTitle ] = useState('')
    const [ questionBody, setQuestionBody ] = useState('')
    const [ questionTags, setQuestionTags ] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.currentUserReducer)
    const questions = useSelector(state => state.questionsReducer.Asked );
    // console.log("questions today",questions);
    useEffect( () => {
        if(User === null) {
            alert("Please sign in to ask questions!");
            navigate('/Auth');
        } // eslint-disable-next-line 
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let asked = questions === undefined ? 0 : questions.data;

        console.log(questions,asked);
        if(User.result.subscription === "free" && asked < 1){
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id }, navigate))
        }
        else if (User.result.subscription === "silver" && asked < 5){
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id }, navigate))
        }
        else if (User.result.subscription === "gold"){
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id }, navigate))
        }
        else {
            alert("You have asked the Maximum number of questions today as your plan allows. Upgrade to silver or gold plan to ask more questions.");
            navigate('/Subscription');
        }
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter') {
            setQuestionBody(questionBody + '\n');
        }
    }
    return (
        <>
        <div className="ask-question">
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            {/* <p>{questionBody}</p> */}
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specific and imagine you're asking a question to another person</p>
                        <input type="text" id='ask-ques-title' onChange={(e) => { setQuestionTitle(e.target.value) }} placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea name="" id="ask-ques-body" onChange={(e) => { setQuestionBody(e.target.value) }} onKeyDown={handleEnter} cols="30" rows="10" ></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text" id='ask-ques-tags'  onChange={(e) => { setQuestionTags(e.target.value.split(" ")) }}  placeholder='e.g. (xml typescript wordpress)'/>
                    </label>
                </div>
                <input type="submit" value='Reivew your question' className='review-btn'/>
            </form>
        </div>
    </div>
    </>
  )
}

export default AskQuestion
