import { useState } from "react";

function InputNumber({ onGuess, disabled }) {
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number === "") return;

    onGuess(Number(number));
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        max="100"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Adivinar
      </button>
    </form>
  );
}

export default InputNumber;