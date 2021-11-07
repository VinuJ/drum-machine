import { useEffect, useState } from 'react';
import './App.scss';
import bankOne from './bankOne.js'
import bankTwo from './bankTwo.js'

function App() {
  const [bank, setBank] = useState(bankOne)
  const [volume, setVolume] = useState(0.25)
  const [muted, setMuted] = useState(false)

  const handleSound = (sound) => {
    const audio = new Audio(sound)
    audio.currentTime = 0
    audio.muted = muted;
    audio.volume = volume;
    audio.play()
  }
  const triggerKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  useEffect(() => {
    const unsubscribe = () => {
      document.addEventListener("keydown", (e) => {
        if (triggerKeys.includes(e.key.toUpperCase())) {
          const btns = document.getElementsByClassName("drum-pad");
          for (let i = 0; i < btns.length; i++) {
            if (btns[i].innerText === e.key.toUpperCase()) {
              btns[i].click();
            }
          }
        }
      });
    }
    unsubscribe()
    return () => unsubscribe()
  }, [])

  return (
    <div id="drum-machine">
      <div id='bank-display'>{(bank[0].id === 1) ? 'Bank One' : 'Bank Two'}</div>
      <div id='slider-container'>
        <label for='slider'>Volume</label>
        <input
          id='slider'
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
      </div>  
      <div id='drumpad-container'>
        <DrumPad drumkit={bank} handleSound={handleSound}/>
      </div>
      <button id='switch-bank-btn' onClick={() => bank == bankOne ? setBank(bankTwo) : setBank(bankOne)}>Switch bank</button>
    </div>
  )
}

function DrumPad(props) {
  
  return (
    props.drumkit.map((btn) => {      
      return (
        <button id={btn.clipName} className='drum-pad' onClick={() => props.handleSound(btn.clipUrl)}>{btn.triggerKey}</button>
      )
    })
  )
}

export default App
