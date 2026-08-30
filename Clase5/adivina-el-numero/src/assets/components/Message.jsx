function Message({ message }) {
  if (!message) {
    return <p>Ingresa un número del 1 al 100.</p>;
  }

  return <p>{message}</p>;
}

export default Message;