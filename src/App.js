import { useState } from "react";
import "./App.css";
function App() {
  const [score, setScore] = useState(0);
  const [watchMode, setWatchMode] = useState(true);
  const [inputColorSequence, setInputColorSequence] = useState([]);
  const [randomColorsSequence, setRandomColorsSequence] = useState([]);
  const [message, setMessage] = useState(null);
  const [flash, setFlash] = useState("");
const [count, setCount] = useState(1)
// let count = 1;
  const colorList = ["red", "blue", "green", "yellow"];

  let randomColors = [];
  const createARandomColorsSequence = () => {

    for (let i = 0; i < count; i++) {
      console.log(Math.floor(Math.random() * 4));
      randomColors.push(colorList[Math.floor(Math.random() * 4)]);
    }
    setCount(count+1)
    // console.log("random colors", randomColors);
setTimeout(()=>{},500)
    for (let i = 0; i < randomColors.length; i++) {
      setTimeout(() => {
        setFlash(randomColors[i]);
        setTimeout(() => {
          setFlash("");
        }, 500);
      }, i * 1000);
    }

    console.log(randomColors);
    setRandomColorsSequence(randomColors);
    setWatchMode(false);
  };

  const startHandle = () => {
    createARandomColorsSequence();
  };

  const checkIfCorrect = (color) => {
    let array = [...inputColorSequence];
    array.push(color);
    setInputColorSequence(array);

    console.log("input color sequence", array);
    if (JSON.stringify(array) === JSON.stringify(randomColorsSequence)) {
      setScore(score + 1);
      // setCount(count+1)
      setInputColorSequence([]);
      startHandle();
    }

    if (array.length > randomColorsSequence.length) {
      setScore(0);
      setMessage("Start again");
      setCount(0)
    }
  };

  console.log("count", count);

  return (
    <>
      <div className="App">
        <div
          style={{
            width: "400px",
            height: "400px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {colorList.map((color, index) => (
            <div
              key={index}
              className={`${color}-space`}
              style={
                flash === color
                  ? { backgroundColor: "black", width: "50%", height: "50%" }
                  : { backgroundColor: color, width: "50%", height: "50%" }
              }
              onClick={() => {
                if (!watchMode) {
                  checkIfCorrect(color);
                }
              }}
            ></div>
          ))}
        </div>

        <button
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50px",
          }}
          onClick={() => {
            setMessage(null)
            startHandle();
          }}
        >
          Start
        </button>

        <div
          style={{
            position: "absolute",
            marginLeft: "-800px",

            color: "white",
            fontSize: "32px",
          }}
        >
          Your Score is: {score}
          <br />
          {message && message}
        </div>
      </div>
    </>
  );
}

export default App;
