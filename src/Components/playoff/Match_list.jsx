import { useState } from 'react';

function Match_list({match }) {

    return (
        <div className='match_box'>
                <div className='match_day'>
                    <span>
                        04.02
                    </span>
                    <span>
                        Round.1
                    </span>
                </div>
                <div className='match_data'>
                    <div className='Lteam'>
                        <div className='teamRinfo'>
                            <img src='/img/0.png'></img>
                            <span>
                                정규시즌 1위
                            </span>
                        </div>
                        <span className='POscore'>
                            점수
                        </span>
                    </div>
                    <span className='POscore'>
                       :
                    </span>
                    <div className='Rteam'>
                        <span className='POscore'>
                            점수
                        </span>
                        <div className='teamRinfo'>
                            <img src='/img/0.png'></img>
                            <span>
                                정규시즌 1위
                            </span>
                        </div>

                    </div>
                </div>
            </div>
    );
}

export default Match_list;
