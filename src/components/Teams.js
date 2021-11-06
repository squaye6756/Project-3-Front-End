import React from 'react';
import axios from 'axios';

const Teams = (props) => {

    const loadTeams = () => {
        axios.get('http://localhost:3000/teams')
        // axios.get(`https://streetball-back.herokuapp.com/teams`)
        .then(
            (response) => {
                props.setTeams(response.data);
            }
        );
    }

    const toggleSkill = (id) => {
        const skills = document.getElementById(id);
        skills.style.display = skills.style.display === 'inline' ? 'none' : 'inline';
    }

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

    const changeTeamToEdit = (team) => {
        props.setTeamId(team._id);
    }

    const getCurrTeamByStateId = () => {
        for (const team of props.teams) {
            // console.log(team._id);
            if (team._id === props.teamId) {
                // console.log('found matching team');
                return team;
            }
        }
    }

    const findCurrTeamById = (id) => {
        for (const team of props.teams) {
            // console.log(team._id);
            if (team._id === id) {
                // console.log('found matching team');
                return team;
            }
        }
    }

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

    const changeNameEdit = (event) => {
        // console.log(event.target);
        // console.log(event.target.id);
        const currTeam = findCurrTeamById(event.target.id.split('-')[2]);
        changeTeamToEdit(currTeam);
        props.setName(event.target.value);
    }

    const changeLogoEdit = (event) => {
        const currTeam = findCurrTeamById(event.target.id.split('-')[2]);
        changeTeamToEdit(currTeam);
        props.setLogo(event.target.value);
    }

    const changeLocationEdit = (event) => {
        const currTeam = findCurrTeamById(event.target.id.split('-')[2]);
        changeTeamToEdit(currTeam);
        props.setLocation(event.target.value);
    }

    const addWin = (team) => {
        axios.put(
            `http://localhost:3000/teams/${team._id}`,
            // `https://streetball-back.herokuapp.com/teams/${team._id}`,
            {
                wins: team.wins + 1
            }
        ).then(() => {
            loadTeams();
        });
    }

    const addLoss = (team) => {
        axios.put(
            `http://localhost:3000/teams/${team._id}`,
            // `https://streetball-back.herokuapp.com/teams/${team._id}`,
            {
                losses: team.losses + 1
            }
        ).then(() => {
            loadTeams();
        });
    }

    const removeTeam = (team) => {
        axios.delete(`http://localhost:3000/teams/${team._id}`)
        // axios.delete(`https://streetball-back.herokuapp.com/teams/${team._id}`)
        .then(() => {
            loadTeams();
        });
    }

    const editTeam = (event) => {
        event.preventDefault();
        // console.log('edit call');
        const currTeam = getCurrTeamByStateId();
        // let currTeam;
        // for (const team of props.teams) {
        //     // console.log(team._id);
        //     if (team._id === props.teamId) {
        //         // console.log('found matching team');
        //         currTeam = team;
        //     }
        // }
        // console.log('now putting');
        axios.put(

            `http://localhost:3000/teams/${props.teamId}`,

            // `https://streetball-back.herokuapp.com/teams/${team._id}`,
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
                                    <h3>#{team.rank}</h3>
                                </div>
                                <img src={team.logo} alt={team.name} className='team-logo'/>
                                <h5><u>STARTING 3</u></h5>
                                <ul>
                                    {team.players.map((teammate) => {
                                        let playerId = teammate._id;
                                        playerId = playerId.toString();
                                        return (
                                            <>
                                                <li onClick={()=>toggleSkill(playerId)}>
                                                    {teammate.name}
                                                    {<span id={playerId} className='hideToggle'> - Skills: {teammate.skills}
                                                    </span>}
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
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
