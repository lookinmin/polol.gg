import React, { useState } from 'react'
import "./CSS/teamCSS.css"

export const CardFlip = () => {
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
                <span>faker</span>
            </div>
            <div className={'cardflipback ' + (!flip ? "front" : "back")}>
                <p>
                    Faker
                </p>
                <p className='backdetail'>
                    이상혁 - 미드
                </p>
                <p className='backdetail'>
                    MAY 7, 1996 - SOUTH KOREA
                </p>
            </div>
        </div>

    )
}
