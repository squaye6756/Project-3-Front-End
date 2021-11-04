import React from 'react';
import axios from 'axios';

const Teams = (props) => {

    const loadTeams = () => {
        axios.get('http://localhost:3000/teams')
        .then(
            (response) => {
                props.setTeams(response.data);
            }
        );
    }

    const toggleSkill = (id) => {
        const skills = document.getElementById(id);
        skills.style.display = skills.style.display === 'none' ? 'block' : 'none';
    }

    const changePlayersEdit = () => {
        const editedPlayerOne = document.getElementById('edit-player-name-one').value;
        const editedPlayerTwo = document.getElementById('edit-player-name-two').value;
        const editedPlayerThree = document.getElementById('edit-player-name-three').value;
        props.setPlayerNames([editedPlayerOne, editedPlayerTwo, editedPlayerThree]);
    }

    const changeSkillsEdit = () => {
        const editedPOneSkills = document.getElementById('edit-player-one-skills').value;
        const editedPTwoSkills = document.getElementById('edit-player-two-skills').value;
        const editedPThreeSkills = document.getElementById('edit-player-three-skills').value;
        props.setTeamSkills([editedPOneSkills, editedPTwoSkills, editedPThreeSkills]);
    }

    const changeNameEdit = (event) => {
        props.setName(event.target.value)
    }

    const changeLogoEdit = (event) => {
        props.setLogo(event.target.value)
    }

    const addWin = (team) => {
        axios.put(
            `http://localhost:3000/teams/${team._id}`,
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
            {
                losses: team.losses + 1
            }
        ).then(() => {
            loadTeams();
        });
    }

    const removeTeam = (team) => {
        axios.delete(`http://localhost:3000/teams/${team._id}`)
        .then(() => {
            loadTeams();
        });
    }

    const editTeam = (team) => {
        console.log(props.playerNames[0]);
        if (props.playerNames[0]) {
            console.log('counts as false');
        }
        axios.put(
            `http://localhost:3000/teams/${team._id}`,
            {
                name: props.name || team.name,
                logo: props.logo || team.logo,
                // location: 'Milky Way',
                players: [
                    {
                        name: props.playerNames[0] || team.players[0].name,
                        skills: props.teamSkills[0] || team.players[0].skills
                    },
                    {
                        name: props.playerNames[1] || team.players[1].name,
                        skills: props.teamSkills[1] || team.players[1].skills
                    },
                    {
                        name: props.playerNames[2] || team.players[2].name,
                        skills: props.teamSkills[2] || team.players[2].skills
                    }
                ]
            }
        ).then(() => {
            loadTeams();
        })
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
                                    <h3>{team.name}</h3>
                                    <h3>{team.wins}-{team.losses}</h3>
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
                                                    <div id={playerId}>
                                                        <p>Skills: {teammate.skills}</p>
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='edit-team'>
                                <h2>Edit Team</h2>
                                <form onSubmit={() => {editTeam(team)}}>
                                    <div>
                                        <label htmlFor='edit-name'>Name: </label>
                                        <input type='text' id='edit-name' onChange={changeNameEdit}/>
                                    </div>
                                    <div>
                                        <label htmlFor='edit-logo'>Logo: </label>
                                        <input type='text' id='edit-logo' placeholder='image URL' onChange={changeLogoEdit}/>
                                    </div>
                                    <div>
                                        <h3>Starting 3:</h3>
                                    </div>
                                    <div className='edit-player-input'>
                                        <label htmlFor='edit-player-name-one'>Player Name: </label>
                                        <input type='text' id='edit-player-name-one' className='edit-player-name-input' onChange={changePlayersEdit}/>
                                        <label htmlFor='edit-player-one-skills'>Skills: </label>
                                        <input type='text' id='edit-player-one-skills' onChange={changeSkillsEdit}/>
                                    </div>
                                    <div className='edit-player-input'>
                                        <label htmlFor='edit-player-name-two'>Player Name: </label>
                                        <input type='text' id='edit-player-name-two' className='edit-player-name-input' onChange={changePlayersEdit}/>
                                        <label htmlFor='edit-player-two-skills'>Skills: </label>
                                        <input type='text' id='edit-player-two-skills' onChange={changeSkillsEdit}/>
                                    </div>
                                    <div className='edit-player-input'>
                                        <label htmlFor='edit-player-name-three'>Player Name: </label>
                                        <input type='text' id='edit-player-name-three' className='edit-player-name-input' onChange={changePlayersEdit}/>
                                        <label htmlFor='edit-player-three-skills'>Skills: </label>
                                        <input type='text' id='edit-player-three-skills' onChange={changeSkillsEdit}/>
                                    </div>
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