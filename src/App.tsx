import { useEffect, useState } from "react";
import "./App.css";

enum Result {
  correct,
  wrong
}

const getRandomColour = () => {
  const digits = "0123456789ABCDEF";
  let colorHex = "#";
  for (let i = 0; i < 6; i++) {
    colorHex += digits[Math.floor(Math.random() * 16)];
  }
  return colorHex;
};

function App() {
  const [colour, setColour] = useState("");
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const handleAnswerClicked = (answer: string) => {
    if (answer === colour) {
      setResult(Result.correct);
      makeColours();
    } else {
      setResult(Result.wrong);
    }
  };

  const makeColours = () => {
    const correctColor = getRandomColour();
    setColour(correctColor);
    setAnswers(
      [correctColor, getRandomColour(), getRandomColour()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    makeColours();
  }, []);

  return (
    <div className="guess-area" style={{ backgroundColor: colour }}>
      <div>
        <div className="guess-area__title" style={{ color: "white" }}>
          Guess The Colour!
        </div>
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswerClicked(answer)}
            className="guess-colour-button"
          >
            {answer}
          </button>
        ))}
        {result === Result.correct && (
          <div className="correct" style={{ color: colour }}>
            Correct!
          </div>
        )}
        {result === Result.wrong && <div className="wrong">Incorrect!</div>}
      </div>
    </div>
  );
}

export default App;
