import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Teams from './components/Teams.js';

const team1 = {
    name: 'Bunnies',
    logo: '',
    wins: 3,
    losses: 4,
    location: 'Chicago',
    players: [
        {
            _id: 4,
            name: 'Troy Lee',
            skills: 'dribbling, shooting'
        },
        {
            _id: 3,
            name: 'Mike Haze',
            skills: 'passing, coordination'
        },
        {
            _id: 2,
            name: 'Jason Bratt',
            skills: 'defense, free throws'
        }
    ]
}

const team2 = {
    name: 'Tigers',
    logo: '',
    wins: 7,
    losses: 0,
    location: 'Detroit',
    players: [
        {
            _id: 1,
            name: 'Tyson Daft',
            skills: 'defense, shooting'
        },
        {
            _id: 0,
            name: 'Emler Fudent',
            skills: '?'
        },
        {
            _id: 9,
            name: 'Moe Burd',
            skills: 'passing, dribbling, breaking ankles'
        }
    ]
}

const team3 = {
    name: 'Whispers',
    logo: '',
    wins: 5,
    losses: 2,
    location: 'Columbus',
    players: [
        {
            _id: 8,
            name: 'Scott Dryp',
            skills: 'half-court shooting'
        },
        {
            _id: 7,
            name: 'Mike Haze',
            skills: 'defense, passing, dribbling'
        },
        {
            _id: 6,
            name: 'Jason Bratt',
            skills: 'free throws, shooting'
        }
    ]
}

const teamsList = [team1, team2, team3];

const App = () => {
    const [teams, setTeams] = useState(teamsList);
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
                <h2>Add Team</h2>
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
                        <input type='text' id='player-name-one' className='player-name-input'/>
                        <label htmlFor='player-one-skills'>Skills: </label>
                        <input type='text' id='player-one-skills'/>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-two'>Player Name: </label>
                        <input type='text' id='player-name-two' className='player-name-input'/>
                        <label htmlFor='player-two-skills'>Skills: </label>
                        <input type='text' id='player-two-skills'/>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-three'>Player Name: </label>
                        <input type='text' id='player-name-three' className='player-name-input'/>
                        <label htmlFor='player-three-skills'>Skills: </label>
                        <input type='text' id='player-three-skills'/>
                    </div>
                </form>
            </div>
            <Teams teams={teams}/>
        </div>
    )
}

export default App;
