import React, { useState } from "react";



const Rankings = (props) => {

    const teamClone = [...props.ateams]

    teamClone.sort((team1, team2) => team1.rank - team2.rank)


    return (
        <>

            <div className={props.showBoard ? "rankings " : "rankings size-change"}>

                <h2 className={props.showBoard ? '' : 'size-change'}>Current Rankings</h2>
                <div>
                    <ul className="rankings-list">
                        {teamClone.map((team) => {
                            return (<>
                                {team.rank < 0 || team.rank > 15 ? <></> :
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