import { useState, useEffect } from "react";
import css from './OyunDeneme.module.css';
import { FaGithub } from "react-icons/fa";
import { FaHandPointer } from "react-icons/fa";


function OyunDeneme() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [preCountdown, setPreCountdown] = useState(null);




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
    setIsStarted(true);
    setIsFinished(false);
    setTimeLeft(10);
    setPreCountdown(3);
  

     const countdownInterval = setInterval(() => {
       setPreCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setTimeLeft(10);
          setPreCountdown(null);
          setIsActive(true);
          return null;
         }
         return prev - 1;
       });

     }, 1000);
  };

  return (
    <div className={css.scoreContainer} style={{ textAlign: "center", marginTop: "50px" }}>
      
      <h1 className={css.baslik}> Click Game < FaHandPointer className={css.pointer} /> </h1>
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
          {preCountdown !== null && (
            <p className={css.geriSayim}>🎯Başlıyor: {preCountdown}</p>
          )}
          {!isActive && (
            <p className={css.score}>{name} {surname}, skorun: {score}</p>
            
                  )}
        {isFinished && <p className={css.bitisMesaji}>⏰ Süre bitti!</p>}

        </>
      )}
      <button className={css.startGame} onClick={startGame}
        disabled={isActive || preCountdown !== null}>Start Game</button>
      <br/><br/><br/><br/>
      <a
        href="https://github.com/Berkangor/calismaSecond"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "black", fontSize:"0.7rem" }}
      >
        <FaGithub size={20} color="#333" />  by Berkan Görmüş
      </a>
      
    </div>

      
  );
}

export default OyunDeneme;
