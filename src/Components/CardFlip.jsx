import React, { useState } from 'react'
import "./CSS/teamCSS.css"

export const CardFlip = ({player}) => {
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
                <span>{player.name}</span>
            </div>
            <div className={'cardflipback ' + (!flip ? "front" : "back")}>
                <img src={player.pic}/>
                <p>
                 {player.name}
                </p>
                <p>
                {player.pos}
                </p>
                <p className='backdetail'>
                    {player.Kname}
                </p>
                <p className='backdetail'>
                    {player.born}
                </p>
            </div>
        </div>

    )
}
