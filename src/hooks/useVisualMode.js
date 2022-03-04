import { useState } from "react";

export function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  function transition(mode, replace = false) {
    replace
      ? setHistory((prev) => [...prev.slice(0, -1), mode])
      : setHistory((prev) => [...prev, mode]);
    setMode(mode);
  }

  function back() {
    setMode(history[0])
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length-2])
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
