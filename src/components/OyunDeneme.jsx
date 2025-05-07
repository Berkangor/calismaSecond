import { useState, useEffect } from "react";
import css from './OyunDeneme.module.css';


function OyunDeneme() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);


  // Sayfa yüklenince localStorage'dan en yüksek skoru al
  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  // Oyun süresi dolunca skoru kontrol et
  useEffect(() => {
    if (!isActive && score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }
  }, [isActive, score, highScore]);

  // Sayaç işlemleri
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (timeLeft === 0) {
    setIsActive(false);
    setIsFinished(true);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const handleClick = () => {
    if (isActive) setScore((s) => s + 1);
  };

  const startGame = () => {
    if (name.trim() === "" || surname.trim() === "") return alert("İsim ve soyisim girin");
    setScore(0);
    setTimeLeft(10);
    setIsActive(true);
    setIsStarted(true);
    setIsFinished(false);
  };

  return (
    <div className={css.scoreContainer} style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className={css.baslik}>Click Game</h1>
      <p className={css.score}>Score: {score}</p>
      <p className={css.score}>High Score: {highScore}</p>
      <p className={css.score}>Time Left: {timeLeft}</p>
      <button className={css.click} onClick={handleClick} disabled={!isActive}>
        Click Me! </button>
    {!isStarted && (
    <>
    <br /><br />
    <input
        className={css.isim}
        type="text"
        placeholder="İsim"
        value={name}
        onChange={(e) => setName(e.target.value)} />
                  
    <input
        type="text"
        placeholder="Soyisim"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className={css.isim}
        />
        <br /><br />
          
         </>
              )}
              {isStarted && (
        <>
          {!isActive && (
            <p className={css.score}>{name} {surname}, skorun: {score}</p>
            
                  )}
        {isFinished && <p className={css.bitisMesaji}>⏰ Süre bitti!</p>}

        </>
      )}
      <br /><br />
          <button className={css.startGame} onClick={startGame}>Start Game</button>

    </div>

      
  );
}

export default OyunDeneme;
