import { useState } from "react";
import InputNumber from "./InputNumber";
import Message from "./Message";
import RestartButton from "./RestartButton";

function generateNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function Game() {
  const [secretNumber, setSecretNumber] = useState(generateNumber);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleGuess = (guess) => {
    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      setMessage("¡Correcto!");
      setGameOver(true);
    } else if (guess < secretNumber) {
      setMessage("El número es mayor");
    } else {
      setMessage("El número es menor");
    }
  };

  const handleRestart = () => {
    setSecretNumber(generateNumber());
    setMessage("");
    setGameOver(false);
    setAttempts(0);
  };

  return (
    <main>
      <h1>Adivina el Número</h1>

      <p>Adivina un número entre 1 y 100.</p>

      <InputNumber
        onGuess={handleGuess}
        disabled={gameOver}
      />

      <Message message={message} />

      <p>Intentos: {attempts}</p>

      {gameOver && (
        <RestartButton onRestart={handleRestart} />
      )}
    </main>
  );
}

export default Game;