import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Teams from './components/Teams.js';
import Rankings from './components/Rankings.js';


const App = () => {
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [playerNames, setPlayerNames] = useState([]);
    const [teamSkills, setTeamSkills] = useState([]);
    const [teamId, setTeamId] = useState('');
    const [location, setLocation] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [showBoard, setShowBoard] = useState(false)

    //Makes an axios get request to load current data from the database
    const loadTeams = () => {
        // console.log('axios get call');
        axios.get('https://streetball-back.herokuapp.com/teams')
        // axios.get('http://localhost:3000/teams')
            .then(
                (response) => {
                    // console.log('response', response.data);
                    setTeams(response.data);
                }
            );
    }

    //Clears the states for name, logo, playerNames, teamSkills, location
    const clearStates = () => {
        setName('');
        setLogo('');
        setPlayerNames([]);
        setTeamSkills([]);
        setLocation([]);
    }


    /*Empties the text of the name, logo, location, players, and skills inputs
    in the add team form*/
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

    /*Makes an axios post request adding a team to the database based on the
    team, logo, location, players, and their skills, and defaults the added
    team’s wins and losses to 0, and its rank to -1; calls loadTeams afterward
    and the clearStates and clearInputs functions*/
    const addTeam = (event) => {
        event.preventDefault();
        // console.log('axios post call');
        axios.post(
            // 'http://localhost:3000/teams',
            'https://streetball-back.herokuapp.com/teams',
            {
                name: name,
                logo: logo,
                wins: 0,
                losses: 0,
                rank: -1,
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
            // console.log('loadTeams() call');
            loadTeams();
        });
        clearInputs();
        clearStates();
    }

    /*Sets the state of playerNames using the values in each of the player input
    fields in the add form*/
    const changePlayers = () => {
        const playerOneName = document.getElementById('player-name-one').value;
        const playerTwoName = document.getElementById('player-name-two').value;
        const playerThreeName = document.getElementById('player-name-three').value;
        // console.log([playerOneName, playerTwoName, playerThreeName]);
        setPlayerNames([playerOneName, playerTwoName, playerThreeName]);
    }

    /*Sets the state of playerSkills using the values in each of the skill input
    fields in the add form*/
    const changeSkills = () => {
        const playerOneSkills = document.getElementById('player-one-skills').value;
        const playerTwoSkills = document.getElementById('player-two-skills').value;
        const playerThreeSkills = document.getElementById('player-three-skills').value;
        // console.log([playerOneSkills, playerTwoSkills, playerThreeSkills]);
        setTeamSkills([playerOneSkills, playerTwoSkills, playerThreeSkills]);
    }

    //Sets the state of name with the value in the name input field in the add form
    const changeName = (event) => {
        setName(event.target.value);
    }

    //Sets the state of logo with the value in the name input field in the add form
    const changeLogo = (event) => {
        setLogo(event.target.value);
    }

    /*Sets the state of location with the value in the name input field in the
    add form*/
    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    /*Takes an array of teams sorted by their winPercentage, and gives them their
    rank based on their array position using an axios put request, then calls
    loadTeams*/
    const displayRankings = (sortedRankedArr) => {
        for (let i = 0; i < sortedRankedArr.length; i++) {
            sortedRankedArr[i].rankObtained = i + 1;
            //put request
            axios.put(
                // `http://localhost:3000/teams/${sortedRankedArr[i]._id}`,
                `https://streetball-back.herokuapp.com/teams/${sortedRankedArr[i]._id}`,
                {
                    rank: sortedRankedArr[i].rankObtained
                }
            ).then(() => {
                // console.log('before last loadTeams()');
                loadTeams();
            });
        }
        // console.log('at last', sortedRankedArr);
    }

    /*Takes an array of teams as a parameter, sorts the teams by their
    winPercentage, and returns the sorted array*/
    const sortByWinPercentage = (rankedArr) => {
        for (let i = 0; i < rankedArr.length - 1; i++) {
            for (let j = 0; j < rankedArr.length - 1; j++) {
                if (rankedArr[j].winPercentage < rankedArr[j + 1].winPercentage) {
                    // console.log('swap');
                    const temp = rankedArr[j];
                    rankedArr[j] = rankedArr[j + 1];
                    rankedArr[j + 1] = temp;
                }
            }
        }
        return rankedArr;
        // displayRankings(rankedArr);
    }

    //Copies and returns an array holding all the teams in the database
    const copyTeams = () => {
        const copiedArr = [];
        for (const team of teams) {
            copiedArr.push(team);
        }
        return copiedArr;
    }

    /*Calculates the win percentage of each team in the copy of teams and saves
    it as a key-value pair*/
    const assignWinPercentages = () => {
        for (const team of teams) {
            const totalGames = team.wins + team.losses;
            if (totalGames === 0) {
                team.winPercentage = -1;
            } else {
                team.winPercentage = team.wins / totalGames;
            }
        }
        // console.log('after assigning win %s', teams);
    }

    //calls helper methods to rank all the teams in the database
    const rankTeams = () => {
        assignWinPercentages();
        const teamsToSort = copyTeams();
        // console.log('copied array', teamsToSort);
        const sortedTeams = sortByWinPercentage(teamsToSort);
        // console.log('sorted teams', sortedTeams);
        displayRankings(sortedTeams);
    }

    /*sets the state of showBoard, which determines whether the rankings are
    displayed or not*/
    const handleShowBoard = () => {
        setShowBoard(!showBoard)
    }

    /*sets the state of showForm, which determines whether to show the add form
    or not*/
    const handleShowForm = () => {
        // console.log('clicked');
        setShowForm(!showForm);
    }

    //loads the data from the database upon initially loading the page
    useEffect(() => {
        loadTeams();
    }, [])

    return (
        <div>
            <h1>STREETBALL</h1>
            <div className='button-area'>
                <button onClick={rankTeams}>Update Rankings</button>
                <button onClick={handleShowBoard}>{showBoard ? 'Hide' : 'Display' } Top 15 Teams</button>
                <button onClick={handleShowForm}>{showForm ? 'Close form' : 'Add Your Team'}</button>
            </div>
            <div className={showForm ? 'add-team' : 'add-team size-change'}>
                <h2 className={showForm ? '' : 'size-change'}>Add Team</h2>
                <form onSubmit={addTeam}>
                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' id='name' onChange={changeName} />
                    </div>
                    <div>
                        <label htmlFor='logo'>Logo: </label>
                        <input type='text' id='logo' placeholder='image URL' onChange={changeLogo} />
                    </div>
                    <div>
                        <label htmlFor='location'>Location: </label>
                        <input type='text' id='location' onChange={changeLocation} />
                    </div>
                    <div>
                        <h3>Starting 3:</h3>
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-one'>Player Name: </label>
                        <input type='text' id='player-name-one' className='player-name-input' onChange={changePlayers} />
                        <label htmlFor='player-one-skills'>Skills: </label>
                        <input type='text' id='player-one-skills' onChange={changeSkills} />
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-two'>Player Name: </label>
                        <input type='text' id='player-name-two' className='player-name-input' onChange={changePlayers} />
                        <label htmlFor='player-two-skills'>Skills: </label>
                        <input type='text' id='player-two-skills' onChange={changeSkills} />
                    </div>
                    <div className='player-input'>
                        <label htmlFor='player-name-three'>Player Name: </label>
                        <input type='text' id='player-name-three' className='player-name-input' onChange={changePlayers} />
                        <label htmlFor='player-three-skills'>Skills: </label>
                        <input type='text' id='player-three-skills' onChange={changeSkills} />
                    </div>
                    <input type='submit' value='Add Team' />
                </form>
            </div>
            <Rankings ateams={teams} showBoard={showBoard} setShowBoard={setShowBoard} />
            <Teams teams={teams} setTeams={setTeams} playerNames={playerNames} setPlayerNames={setPlayerNames} teamSkills={teamSkills} setTeamSkills={setTeamSkills} name={name} setName={setName} logo={logo} setLogo={setLogo} teamId={teamId} setTeamId={setTeamId} location={location} setLocation={setLocation} />
        </div>
    )
}

export default App;
