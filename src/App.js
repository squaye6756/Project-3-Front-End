import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Teams from './components/Teams.js';

const App = () => {
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [playerNames, setPlayerNames] = useState([]);
    const [teamSkills, setTeamSkills] = useState([]);
    const [teamId, setTeamId] = useState('');
    const [location, setLocation] = useState('');

    const loadTeams = () => {
        console.log('axios get call');
        axios.get('https://streetball-back.herokuapp.com/teams')
        .then(
            (response) => {
                console.log(response.data);
                setTeams(response.data);
            }
        );
    }

    const clearInputs = () => {
        document.getElementById('player-name-one').value = '';
        document.getElementById('player-one-skills').value = '';
        document.getElementById('player-name-two').value = '';
        document.getElementById('player-two-skills').value = '';
        document.getElementById('player-name-three').value = '';
        document.getElementById('player-three-skills').value = '';
        document.getElementById('name').value = '';
        document.getElementById('logo').value = '';
        document.getElementById('location').value = '';
    }

    const addTeam = (event) => {
        event.preventDefault();
        console.log('axios post call');
        axios.post(
            // 'http://localhost:3000/teams',
            'https://streetball-back.herokuapp.com/teams',
            {
                name: name,
                logo: logo,
                wins: 0,
                losses: 0,
                location: location,
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
        ).then(() => {
            console.log('loadTeams() call');
            loadTeams();
        });
        clearInputs();
    }

    const changePlayers = () => {
        const playerOneName = document.getElementById('player-name-one').value;
        const playerTwoName = document.getElementById('player-name-two').value;
        const playerThreeName = document.getElementById('player-name-three').value;
        // console.log([playerOneName, playerTwoName, playerThreeName]);
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

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    useEffect(() => {
        loadTeams();
    }, [])

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
                        <label htmlFor='location'>Location: </label>
                        <input type='text' id='logo' onChange={changeLocation}/>
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
            <Teams teams={teams} setTeams={setTeams} playerNames={playerNames} setPlayerNames={setPlayerNames} teamSkills={teamSkills} setTeamSkills={setTeamSkills} name={name} setName={setName} logo={logo} setLogo={setLogo} teamId={teamId} setTeamId={setTeamId} location={location} setLocation={setLocation}/>
        </div>
    )
}

export default App;
