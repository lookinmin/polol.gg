import React, { useState } from 'react'
import "./CSS/teamCSS.css"

export const CardFlip = ({player1, is}) => {
    const [flip, setflip] = useState(true);
    function change() {
        if (flip)
            setflip(false);
        else
            setflip(true);
    };
    return (
        <div className='cardflipbox' onClick={change}>
            <div className={'cardflipfront ' + (flip ? "front" : "back")} >
                <span>{player1.name}</span>
            </div>
            <div className={'cardflipback ' + (!flip ? "front" : "back")}>
                <img src={player1.pic} alt=''/>
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
