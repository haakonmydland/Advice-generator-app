import { useState, useEffect } from "react";
import style from "./Card.module.css";
import desktopDiv from "./assets/pattern-divider-desktop.svg";
import mobileDiv from "./assets/pattern-divider-mobile.svg";

export default function Card() {
  const [advice, setAdvice] = useState(["title", "advice"]);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    getAdvice();
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  function getAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => setAdviceWrapper(data));
  }
  function setAdviceWrapper(data: object) {
    setAdvice((prev) => {
      return [data.slip.id, data.slip.advice];
    });
  }

  return (
    <div className={style.card}>
      <h2 className={style.title}>Advice #{advice[0]}</h2>
      <h1 className={style.advice}>“{advice[1]}”</h1>
      {width < 500 ? (
        <img src={mobileDiv} className={style.divider}></img>
      ) : (
        <img src={desktopDiv} className={style.divider}></img>
      )}

      <button className={style.button} onClick={getAdvice}></button>
    </div>
  );
}
