import ReactWordcloud from "react-wordcloud";
import React, { useState, useEffect } from "react";

const options = {
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [32, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};
export const SimpleCloud = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [words, setWords] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5056/api/WordCloud")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setWords(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ReactWordcloud words={words} options={options} />
      </div>
    );
  }
};
