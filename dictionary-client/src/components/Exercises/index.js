import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Words from "./components/Words";
import Translation from "./components/Translation";

import useExerciseData from "./hooks/useExerciseData";
import useScoreData from "./hooks/useScoreData";

import Header from "../common/Header";
import LoadingSpinner from "../common/LoadingSpinner";
import { PrimaryButton } from "../common/Buttons";
import { ErrorMessage } from "../common/Messages";
import { ROUTES } from "../../constants";

import useStyles from "./styles";

export const answers = {
  correct: "CORRECT",
  incorrect: "INCORRECT",
};

const Exercises = () => {
  const [correct, setCorrect] = useState(null);
  const { word, translatedWords, error } = useExerciseData();
  const { score, loading, updateScore } = useScoreData();

  const classes = useStyles();
  const navigate = useNavigate();

  const onCheck = (chooseWord) => {
    if (chooseWord === word?.randomWord?.translate) {
      setCorrect(answers.correct);
    } else {
      setCorrect(answers.incorrect);
    }
  };

  const onClickNext = async () => {
    const newScore = correct === answers.correct ? 1 : 0;
    await updateScore(newScore);
    setCorrect(null);
  };

  useEffect(() => {
    if (error) {
      navigate(ROUTES.user);
    }
  }, []);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <Header score={score?.score} />
      {!word?.randomWord ? (
        <div className={classes.error}>
          <ErrorMessage
            classes={classes}
            message="You have to add new words to your dictionary."
          />
          <PrimaryButton
            onClick={() => navigate(ROUTES.user)}
            name="To Actions"
          />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.exercises}>
            <Words word={word} />
            <Translation
              checkWord={word?.randomWord?.translate}
              correct={correct}
              onCheck={onCheck}
              words={translatedWords}
            />
            <PrimaryButton
              disabled={!correct}
              onClick={onClickNext}
              exerciseStyle
              name="Next word"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Exercises;
