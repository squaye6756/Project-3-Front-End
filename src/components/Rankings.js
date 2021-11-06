import React from "react";



const Rankings = (props) => {
    props.ateams.sort((team1, team2) => team1.rank - team2.rank)
    const handleShowBoard = () => {
        props.setShowBoard(!props.showBoard)
    }

    return (
        <>
            <button onClick={handleShowBoard}>Show</button>
            <div className={props.showBoard ? "rankings width-change" : "rankings"}>
            
                <h2>Current Rankings</h2>
                <div>
                    <ul className="rankings-list">
                        {props.ateams.map((team) => {
                            return (<>
                                {team.rank < 0 ? <></> :
                                    <li><strong>{team.rank}</strong> {team.location} {team.name} </li>
                                }
                            </>)
                        })}
                    </ul>
                </div>
            </div >
        </>
    )

}


export default Rankings