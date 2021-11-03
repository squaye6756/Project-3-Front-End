import React from 'react';

const Teams = (props) => {

    const toggleSkill = (id) => {
        const skills = document.getElementById(id);
        skills.style.display = skills.style.display === 'none' ? 'block' : 'none';
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
                                        let playerId = teammate._id.toString();
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
                                <form>
                                    <div>
                                        <label htmlFor='edit-name'>Name: </label>
                                        <input type='text' id='edit-name'/>
                                    </div>
                                    <div>
                                        <label htmlFor='edit-logo'>Logo: </label>
                                        <input type='text' id='edit-logo' placeholder='image URL'/>
                                    </div>
                                    <div>
                                        <h3>Starting 3:</h3>
                                    </div>
                                    <div className='edit-player-input'>
                                        <label htmlFor='edit-player-name-one'>Player Name: </label>
                                        <input type='text' id='edit-player-name-one' className='edit-player-name-input'/>
                                        <label htmlFor='edit-player-one-skills'>Skills: </label>
                                        <input type='text' id='edit-player-one-skills'/>
                                    </div>
                                    <div className='edit-player-input'>
                                        <label htmlFor='edit-player-name-two'>Player Name: </label>
                                        <input type='text' id='edit-player-name-two' className='edit-player-name-input'/>
                                        <label htmlFor='edit-player-two-skills'>Skills: </label>
                                        <input type='text' id='edit-player-two-skills'/>
                                    </div>
                                    <div className='edit-player-input'>
                                        <label htmlFor='edit-player-name-three'>Player Name: </label>
                                        <input type='text' id='edit-player-name-three' className='edit-player-name-input'/>
                                        <label htmlFor='edit-player-three-skills'>Skills: </label>
                                        <input type='text' id='edit-player-three-skills'/>
                                    </div>
                                </form>
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