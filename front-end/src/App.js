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
    const [playerNames, setPlayerNames] = useState([]);
    // const [wins, setWins] = useState('');
    // const [losses, setLosses] = useState('');
    const [teamSkills, setTeamSkills] = useState([]);

    const clearInputs = () => {
        document.getElementById('player-name-one').value = '';
        document.getElementById('player-one-skills').value = '';
        document.getElementById('player-name-two').value = '';
        document.getElementById('player-two-skills').value = '';
        document.getElementById('player-name-three').value = '';
        document.getElementById('player-three-skills').value = '';
        document.getElementById('name').value = '';
        document.getElementById('logo').value = '';
    }

    const addTeam = (event) => {
        event.preventDefault();
        const newTeam = {
            name: name,
            logo: logo,
            wins: 0,
            losses: 0,
            location: 'Milky Way',
            players: [
                {
                    name: playerNames[0],
                    skills: teamSkills[0]
                },
                {
                    name: playerNames[1],
                    skills: teamSkills[1]
                },
                {
                    name: playerNames[2],
                    skills: teamSkills[2]
                }
            ]
        }
        teamsList.push(newTeam);
        console.log(teamsList);
        setTeams(teamsList);
        clearInputs();
    }

    const changePlayers = () => {
        const playerOneName = document.getElementById('player-name-one').value;
        const playerTwoName = document.getElementById('player-name-two').value;
        const playerThreeName = document.getElementById('player-name-three').value;
        console.log([playerOneName, playerTwoName, playerThreeName]);
        setPlayerNames([playerOneName, playerTwoName, playerThreeName]);
    }

    const changeSkills = () => {
        const playerOneSkills = document.getElementById('player-one-skills').value;
        const playerTwoSkills = document.getElementById('player-two-skills').value;
        const playerThreeSkills = document.getElementById('player-three-skills').value;
        // console.log([playerOneSkills, playerTwoSkills, playerThreeSkills]);
        setTeamSkills([playerOneSkills, playerTwoSkills, playerThreeSkills]);
    }

    const changeName = (event) => {
        setName(event.target.value)
    }

    const changeLogo = (event) => {
        setLogo(event.target.value)
    }

    useEffect(() => {
        setTeams(teamsList);
    }, [teams])

    return (
        <div>
            <h1>STREETBALL</h1>
            <div className='add-team'>
                <h2>Add Team</h2>
                <form onSubmit={addTeam}>
                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' id='name' onChange={changeName}/>
                    </div>
                    <div>
                        <label htmlFor='logo'>Logo: </label>
                        <input type='text' id='logo' placeholder='image URL' onChange={changeLogo}/>
                    </div>
                    <div>
                        <h3>Starting 3:</h3>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-one'>Player Name: </label>
                        <input type='text' id='player-name-one' className='player-name-input' onChange={changePlayers}/>
                        <label htmlFor='player-one-skills'>Skills: </label>
                        <input type='text' id='player-one-skills' onChange={changeSkills}/>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-two'>Player Name: </label>
                        <input type='text' id='player-name-two' className='player-name-input' onChange={changePlayers}/>
                        <label htmlFor='player-two-skills'>Skills: </label>
                        <input type='text' id='player-two-skills' onChange={changeSkills}/>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-three'>Player Name: </label>
                        <input type='text' id='player-name-three' className='player-name-input' onChange={changePlayers}/>
                        <label htmlFor='player-three-skills'>Skills: </label>
                        <input type='text' id='player-three-skills' onChange={changeSkills}/>
                    </div>
                    <input type='submit' value='Add Team'/>
                </form>
            </div>
            <Teams teams={teams}/>
        </div>
    )
}

export default App;
