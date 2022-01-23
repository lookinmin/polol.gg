import React, { useState } from 'react'
import "./CSS/teamCSS.css"

export const CardFlip = ({ player1, teamname, color1 }) => {
    const [flip, setflip] = useState(true);
    function change() {
        if (flip)
            setflip(false);
        else
            setflip(true);
    };
    console.log(color1);
    return (
        <div className='cardflipbox' onClick={change}>
            <div style={{ color: color1 }} className={'cardflipfront ' + (flip ? "front" : "back")} >
                <p>
                    {teamname}
                </p>
                <p>{player1.name}</p>
            </div>
            <div className={'cardflipback ' + (!flip ? "front" : "back")}>
                <img src={player1.pic} alt='' />
                <p>
                    {player1.name}
                </p>
                <p>
                    {player1.pos}
                </p>
                <p className='backdetail'>
                    {player1.Kname}
                </p>
                <p className='backdetail'>
                    {player1.born}
                </p>
            </div>
        </div>

    )
}
