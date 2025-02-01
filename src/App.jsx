import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import { Main } from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { StartScreen } from "./components/StartScreen";
import { Questions } from "./components/Questions";
import { NextButton } from "./components/NextButton";
import { Progress } from "./components/Progress";
import { FinnishScreen } from "./components/FinnishScreen";

const initailstate = {
  questions: [],

  // loading error ready active finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return { ...state, status: "ready", questions: action.payload };

    case "dataFailed":
      return { ...state, status: "error" };

    case "dataLoading":
      return { ...state, status: "loading" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.index];
      const points =
        question.correctOption === action.payload
          ? state.points + question.points
          : state.points;
      return { ...state, answer: action.payload, points: points };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      const newHighScore =
        state.points > state.highscore ? state.points : state.highscore;
      return {
        ...state,
        status: "finished",
        index: 0,
        highscore: newHighScore,
      };

    case "restart":
      return { ...state, points: 0, index: 0, answer: null, status: "ready" };

    default:
      throw new Error("Action error");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initailstate);
  const { questions, status, index, answer, points, highscore } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        dispatch({ type: "dataLoading" });
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (e) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchQuestions();
  }, []);
  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPoints={maxPoints}
                answer={answer}
              />
              <Questions
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </>
          )}
          {status === "finished" && (
            <FinnishScreen
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
};

export default App;
