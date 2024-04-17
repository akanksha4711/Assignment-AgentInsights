import {useState, useEffect, useCallback} from "react";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import QuestionCard from "./QuestionCard";
import Questions from './questions.json'
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [voilationCount, setVoilationCount] = useState(0);

  document.addEventListener("visibilitychange", () => {
    if(document.visibilityState !== "visible"){
      setVoilationCount(voilationCount+1);
    }
  })

  // const handle = useFullScreenHandle();
  const handle = useFullScreenHandle()

  useEffect(()=> {
    setQuestions(Questions);
  },[]);

  const checkAnswer = (ans) => {
    localStorage.setItem("index", Number(localStorage.getItem("index"))+1);
    if(ans){
      localStorage.setItem("score", Number(localStorage.getItem("score"))+1);
      setScore(Number(localStorage.getItem("score"))+1);
    }
    setIndex(Number(localStorage.getItem("index"))+1);
    
  }
  if(!localStorage.getItem("index")) localStorage.setItem("index", -1);
  if(!localStorage.getItem("score")) localStorage.setItem("score", 0);
  
  if(Number(localStorage.getItem("index")) < 10){
    return (
      <FullScreen handle={handle}>
      <div className="App">
      {(!window.isFullScreen) && <button onClick={() => {
          handle.enter();
          if(Number(localStorage.getItem("index"))===-1) checkAnswer(false);
          window.setIsFullScreen = true;
        }}>Full Screen Mode</button>}
        <div className="score">
          <div>Question No: {Number(localStorage.getItem("index"))+1}/10</div>
          <div>Score: {Number(localStorage.getItem("score"))}</div>
          <div>Voilation Count: {voilationCount}</div>
        </div>
        <QuestionCard question={questions[Number(localStorage.getItem("index"))]} handleNext={checkAnswer}></QuestionCard>
      </div>
      </FullScreen>
    );
  } else {
    return (
      <>
        <div className="final-score">
          <div>Your Final Score: {Number(localStorage.getItem("score"))}/10</div>
          <div>Voilation Count: {voilationCount}</div>
          <button onClick={() => {
            localStorage.setItem("score",0);
            localStorage.setItem("index",-1);
            setIndex(-1);
            setScore(0);
          }}>Give the test again</button>
        </div>
      </>
    );
  }
  
}

export default App;
