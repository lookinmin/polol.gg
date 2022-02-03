import React, { useState } from 'react'
import "./teamCSS.css"

export const CardFlip = ({ player1, teamname, color1 }) => {
    const [flip, setflip] = useState(true);
    function change() {
        if (flip)
            setflip(false);
        else
            setflip(true);
    };
    return (
        <div className='cardflipbox' onClick={change}>
            <div style={{ color: color1 }} className={'cardflipfront ' + (flip ? "front" : "back")} >
                <p className='FrontTN'>
                    {teamname}
                </p>
                <p className='FrontPN'>{player1.name}</p>
            </div>
            <div className={'cardflipback ' + (!flip ? "front" : "back")}>
                <img src={player1.pic} alt='' />
                <p className='BackPN'>
                    {player1.name}
                </p>
                <p className='BackPos'>
                    {player1.pos}
                </p>
                <p className='backdetail' id="BackKorName">
                    {player1.Kname}
                </p>
                <p className='backdetail' id='BackBirth'>
                    {player1.born}
                </p>
            </div>
        </div>

    )
}
