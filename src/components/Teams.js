import React from 'react';
import axios from 'axios';

const Teams = (props) => {

    //Makes an axios get request to load current data from the database
    const loadTeams = () => {
        // axios.get('http://localhost:3000/teams')
        axios.get(`https://streetball-back.herokuapp.com/teams`)
        .then(
            (response) => {
                props.setTeams(response.data);
            }
        );
    }

    //Takes id of span element of each li as a parameter and toggles its display
    const toggleSkill = (id) => {
        const skills = document.getElementById(id);
        skills.className = skills.className === 'playerSkills showToggle' ? 'playerSkills hideToggle' : 'playerSkills showToggle';
        const playerNameDiv = document.getElementById('player-'+id);
        playerNameDiv.className = playerNameDiv.className === 'player-name player-center' ? 'player-name player-left' : 'player-name player-center';
    }

    //Using each of the edit fields' classes, we set them all to an empty string
    const clearEditFields = () => {
        // console.log(document.getElementsByClassName('edit-header'));
        const editHeaderFields = document.getElementsByClassName('edit-header');
        for (const field of editHeaderFields) {
            field.value = '';
        }
        const editPlayerNameFields = document.getElementsByClassName('edit-player-name-input');
        for (const field of editPlayerNameFields) {
            field.value = '';
        }
        const editPlayerSkillsFields = document.getElementsByClassName('edit-player-skills-input');
        for (const field of editPlayerSkillsFields) {
            field.value = '';
        }
    }

    /*Changes the state of the teamId, which determines which team will be
    edited upon submission of an edit form*/
    const changeTeamToEdit = (team) => {
        props.setTeamId(team._id);
    }

    //Uses the teamId state to find a team in the list of teams
    const getCurrTeamByStateId = () => {
        for (const team of props.teams) {
            // console.log(team._id);
            if (team._id === props.teamId) {
                // console.log('found matching team');
                return team;
            }
        }
    }

    //Uses an id passed as a parameter to find a team in the list of teams
    const findCurrTeamById = (id) => {
        for (const team of props.teams) {
            // console.log(team._id);
            if (team._id === id) {
                // console.log('found matching team');
                return team;
            }
        }
    }

    /*Uses a team passed as a parameter in order to set the state of player
    names to the current values of those in the edit player fields of the team;
    also calls changeTeamToEdit*/
    const changePlayersEdit = (team) => {
        const playerOneId = team.players[0]._id.toString();
        const playerTwoId = team.players[1]._id.toString();
        const playerThreeId = team.players[2]._id.toString();
        // const editPlayerFieldId = `edit-player-${playerId}``;
        const editedPlayerOne = document.getElementById(`edit-player-${playerOneId}`).value;
        const editedPlayerTwo = document.getElementById(`edit-player-${playerTwoId}`).value;
        const editedPlayerThree = document.getElementById(`edit-player-${playerThreeId}`).value;
        props.setPlayerNames([editedPlayerOne, editedPlayerTwo, editedPlayerThree]);
        changeTeamToEdit(team);
    }

    /*Uses a team passed as a parameter in order to set the state of player
    skills to the current values of those in the edit skills fields of the team;
    also calls changeTeamToEdit*/
    const changeSkillsEdit = (team) => {
        const playerOneId = team.players[0]._id.toString();
        const playerTwoId = team.players[1]._id.toString();
        const playerThreeId = team.players[2]._id.toString();
        const editedPOneSkills = document.getElementById(`edit-player-skills-${playerOneId}`).value;
        const editedPTwoSkills = document.getElementById(`edit-player-skills-${playerTwoId}`).value;
        const editedPThreeSkills = document.getElementById(`edit-player-skills-${playerThreeId}`).value;
        props.setTeamSkills([editedPOneSkills, editedPTwoSkills, editedPThreeSkills]);
        changeTeamToEdit(team);
    }

    /*changes the state of the name to the current value of that in the edit
    name field; furthermore, using the findCurrTeamById function, it calls
    changeTeamToEdit*/
    const changeNameEdit = (event) => {
        // console.log(event.target);
        // console.log(event.target.id);
        const currTeam = findCurrTeamById(event.target.id.split('-')[2]);
        changeTeamToEdit(currTeam);
        props.setName(event.target.value);
    }

    /*changes the state of the logo to the current value of that in the edit
    name field; furthermore, using the findCurrTeamById function, it calls
    changeTeamToEdit*/
    const changeLogoEdit = (event) => {
        const currTeam = findCurrTeamById(event.target.id.split('-')[2]);
        changeTeamToEdit(currTeam);
        props.setLogo(event.target.value);
    }

    /*changes the state of the location to the current value of that in the edit
    name field; furthermore, using the findCurrTeamById function, it calls
    changeTeamToEdit*/
    const changeLocationEdit = (event) => {
        const currTeam = findCurrTeamById(event.target.id.split('-')[2]);
        changeTeamToEdit(currTeam);
        props.setLocation(event.target.value);
    }

    /*Takes in a team as a parameter, then makes an axios put request using that
    team’s id to increment the team’s amount of wins, then calls loadTeams*/
    const addWin = (team) => {
        axios.put(
            // `http://localhost:3000/teams/${team._id}`,
            `https://streetball-back.herokuapp.com/teams/${team._id}`,
            {
                wins: team.wins + 1
            }
        ).then(() => {
            loadTeams();
        });
    }

    /*Takes in a team as a parameter, then makes an axios put request using that
    team’s id to increment the team’s amount of losses, then calls loadTeams*/
    const addLoss = (team) => {
        axios.put(
            // `http://localhost:3000/teams/${team._id}`,
            `https://streetball-back.herokuapp.com/teams/${team._id}`,
            {
                losses: team.losses + 1
            }
        ).then(() => {
            loadTeams();
        });
    }

    /*Takes in a team as a parameter then makes an axios delete request using
    that team’s id to remove the team from the database, then calls loadTeams*/
    const removeTeam = (team) => {
        // axios.delete(`http://localhost:3000/teams/${team._id}`)
        axios.delete(`https://streetball-back.herokuapp.com/teams/${team._id}`)
        .then(() => {
            loadTeams();
        });
    }

    /*Makes an axios put request using on the current state of teamId to
    determine which team will be edited; the states of the name, logo, location,
    playerNames, and playerSkills then replace the original values as long as
    they are not empty; the page is then reloaded using loadTeams, and the input
    fields are cleared using clearEditFields*/
    const editTeam = (event) => {
        event.preventDefault();
        // console.log('edit call');
        const currTeam = getCurrTeamByStateId();
        axios.put(
            // `http://localhost:3000/teams/${props.teamId}`,
            `https://streetball-back.herokuapp.com/teams/${props.teamId}`,
            {
                name: props.name || currTeam.name,
                logo: props.logo || currTeam.logo,
                location: props.location || currTeam.location,
                players: [
                    {
                        name: props.playerNames[0] || currTeam.players[0].name,
                        skills: props.teamSkills[0] || currTeam.players[0].skills
                    },
                    {
                        name: props.playerNames[1] || currTeam.players[1].name,
                        skills: props.teamSkills[1] || currTeam.players[1].skills
                    },
                    {
                        name: props.playerNames[2] || currTeam.players[2].name,
                        skills: props.teamSkills[2] || currTeam.players[2].skills
                    }
                ]
            }
        ).then(() => {
            // console.log('loadTeams() call');
            loadTeams();
        });
        clearEditFields();
        // props.clearStates();
    }

    return (
        <div className='teams-container'>
        {
            props.teams.map((team) => {
                return (
                    <>
                        <div className='team'>
                            <div className='team-info'>
                                <div className='team-header'>
                                    <h3>{team.location} {team.name}</h3>
                                    <h3><span className='wins'>{team.wins}</span>-<span className='losses'>{team.losses}</span></h3>
                                    {team.rank > 0
                                        ? <h3>#{team.rank}</h3>
                                        : <h3>unranked</h3>
                                    }
                                </div>
                                <img src={team.logo} alt={team.name} className='team-logo'/>
                                <h5><u>STARTING 3</u></h5>
                                <div className = 'players-list'>
                                    {team.players.map((teammate) => {
                                        let playerId = teammate._id;
                                        playerId = playerId.toString();
                                        return (
                                            <>
                                            <div className='players' onClick={()=>toggleSkill(playerId)}>
                                                <div className='player-name player-center' id={'player-'+ playerId}>
                                                    {teammate.name} </div>
                                                    <div id={playerId} className='player-skills hideToggle'> - Skills: {teammate.skills}
                                                    </div>
                                                    </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='edit-team'>
                                <h2>Edit Team</h2>
                                <form onSubmit={editTeam}>
                                    <div>
                                        <label htmlFor={`edit-name-${team._id.toString()}`}>Name: </label>
                                        <input type='text' className='edit-header' id={`edit-name-${team._id.toString()}`} onChange={changeNameEdit}/>
                                    </div>
                                    <div>
                                        <label htmlFor={`edit-logo-${team._id.toString()}`}>Logo: </label>
                                        <input type='text' className='edit-header' id={`edit-logo-${team._id.toString()}`} placeholder='image URL' onChange={changeLogoEdit}/>
                                    </div>
                                    <div>
                                        <label htmlFor={`edit-location-${team._id.toString()}`}>Location: </label>
                                        <input type='text' className='edit-header' id={`edit-location-${team._id.toString()}`} onChange={changeLocationEdit}/>
                                    </div>
                                    <div>
                                        <h3>Starting 3:</h3>
                                    </div>
                                    {team.players.map((teammate) => {
                                        const playerId = teammate._id.toString();
                                        const editPlayerFieldId = `edit-player-${playerId}`;
                                        const editSkillsFieldId = `edit-player-skills-${playerId}`;
                                        return (
                                            <>
                                                <div className='edit-player-input'>
                                                    <label htmlFor={editPlayerFieldId}>Player Name: </label>
                                                    <input type='text' id={editPlayerFieldId} className='edit-player-name-input' onChange={() => {changePlayersEdit(team)}}/>
                                                    <label htmlFor={editSkillsFieldId}>Skills: </label>
                                                    <input type='text' id={editSkillsFieldId} className='edit-player-skills-input' onChange={() => {changeSkillsEdit(team)}}/>
                                                </div>
                                            </>
                                        )
                                    })}
                                    <input type='submit' value='Submit Team Edits'/>
                                </form>
                                <div className='record-btns'>
                                    <button onClick={() => {addWin(team)}}>Add Win</button>
                                    <button onClick={() => {addLoss(team)}}>Add Loss</button>
                                </div>
                                <button className='delete-btn' onClick={() => {removeTeam(team)}}>Remove Team</button>
                            </div>
                        </div>
                    </>
                )
            })
        }
        </div>
    )
}

export default Teams;
