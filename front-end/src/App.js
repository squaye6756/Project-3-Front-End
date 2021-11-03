import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [players, setPlayers] = useState([]);
    const [wins, setWins] = useState('');
    const [losses, setLosses] = useState('');
    const [skills, setSkills] = useState([]);

    return (
        <div>
            <h1>STREETBALL</h1>
            <div className='add-team'>
                <form>
                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' id='name'/>
                    </div>
                    <div>
                        <label htmlFor='logo'>Logo: </label>
                        <input type='text' id='logo' placeholder='image URL'/>
                    </div>
                    <div>
                        <h3>Starting 3:</h3>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-one'>Player Name: </label>
                        <input type='text' id='player-name-one'/>
                        <label htmlFor='player-one-skills'>Skills: </label>
                        <input type='text' id='player-one-skills' placeholder='(separate with commas)'/>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-two'>Player Name: </label>
                        <input type='text' id='player-name-two'/>
                        <label htmlFor='player-two-skills'>Skills: </label>
                        <input type='text' id='player-two-skills' placeholder='(separate with commas)'/>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-three'>Player Name: </label>
                        <input type='text' id='player-name-three'/>
                        <label htmlFor='player-three-skills'>Skills: </label>
                        <input type='text' id='player-three-skills' placeholder='(separate with commas)'/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App;
