import { useEffect, useState } from 'react';
import './styles.scss';
import bankOne from './bankOne.js'
import bankTwo from './bankTwo.js'

const App = () => {
  const triggerKeys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  const [bank, setBank] = useState(bankOne)
  const [volume, setVolume] = useState(0.25)
  const [display, setDisplay] = useState('Heater 1')
  const [volumeDisplay, setVolumeDisplay] = useState('Volume')

  const handleSound = (sound) => {
    const audio = new Audio(sound)
    audio.currentTime = 0
    audio.volume = volume;
    audio.play()
  }

  // Hook to listen for keypresses
  useEffect(() => {

    const unsubscribe = () => {
      document.addEventListener('keydown', (e) => {
        if (triggerKeys.includes(e.key.toUpperCase())) {
          const btns = document.getElementsByClassName('drum-pad');
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
    <div id='container'>
      <div id='drum-machine'>
        <div id='bank-display' className='display'><div className='panel-text'>{(bank[0].id === 1) ? 'Kit One' : 'Kit Two'}</div></div>
        <div id='sound-display' className='display'><div className='panel-text'>{display}</div></div>  
        <div id='drumpad-container'>
          <DrumPad drumkit={bank} handleSound={handleSound} setDisplay={setDisplay} />
        </div>
        <button id='switch-kit-btn' onClick={() => bank === bankOne ? setBank(bankTwo) : setBank(bankOne)}>Change Kit</button>
        <div id='slider-container'>
          <VolumeSlider volume={volume} setVolume={setVolume} setVolumeDisplay={setVolumeDisplay} />
        </div>
        <label id='label' for="slider">{volumeDisplay}</label>
      </div>
    </div>
  )
}

const DrumPad = (props) => {
  return (
    props.drumkit.map((btn) => {      
      return (
        <button
          id={btn.clipName}
          className='drum-pad'
          onClick={() => {props.handleSound(btn.clipUrl); props.setDisplay(btn.clipName.replace('-', ' '))}}
        >
          {btn.triggerKey}
        </button>
      )
    })
  )
}

const VolumeSlider = (props) => {
  return (
    <>
    <input
      id='slider'
      type='range'
      min={0}
      max={1}
      step={0.1}
      value={props.volume}
      onChange={event => {
        props.setVolume(event.target.valueAsNumber);
        props.setVolumeDisplay(`Volume: ${parseInt(props.volume * 10)}`);
        setTimeout(() => props.setVolumeDisplay('Volume'), 3000)
      } } /></>
  )
}

export default App
