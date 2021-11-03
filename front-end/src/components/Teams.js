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
                                <h3>{team.name}</h3>
                                <h3>{team.wins}-{team.losses}</h3>
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
