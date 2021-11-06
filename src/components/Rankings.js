import React, {useState} from "react";



const Rankings = (props) => {
    const [showBoard, setShowBoard] = useState(true)
    const teamClone = [...props.ateams]

    teamClone.sort((team1, team2) => team1.rank - team2.rank)
    const handleShowBoard = () => {
        setShowBoard(!showBoard)
    }
    const handleShowForm = () => {
        console.log('clicked');
        props.setShowForm(!props.showForm);
    }

    return (
        <>

            <div className={showBoard ? "rankings " : "rankings size-change"}>
            
                <h2>Current Rankings</h2>
                <div>
                    <ul className="rankings-list">
                        {teamClone.map((team) => {
                            return (<>
                                {team.rank < 0 ? <></> :
                                    <li><strong>{team.rank}</strong> {team.location} {team.name} </li>
                                }
                            </>)
                        })}
                    </ul>
                </div>
            </div >
            <button onClick={handleShowBoard}>Display Top 20 Teams</button>
            <button onClick={handleShowForm}>Add Your Team</button>
        </>
    )

}


export default Rankings