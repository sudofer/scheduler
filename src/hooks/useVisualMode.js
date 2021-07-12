import {useState} from 'react';

export default function useVisualMode(initMode) {

  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode])

  const transition = (newMode, replace = false) => {

    setHistory(() => [...replace ?history.slice(0,-1) : history, newMode] );
    setMode(newMode);
  }
  
  const back = () => {
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
      setHistory((prev) => prev.slice(0,-1))
    }
  }
  return {mode, transition, back}

} 

// export default function useVisualMode(initial) {   const [history, setHistory] = useState([initial]);    function transition(mode, replace = false) {     setHistory(prev =>       replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]     );   }    function back() {     if (history.length < 2) return;     setHistory(prev => [...prev.slice(0, history.length - 1)]);   }    return { mode: history[history.length - 1], transition, back }; }