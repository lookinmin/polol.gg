function Match_list({ match_his }) {
    const box = []
    match_his.map((match) => {
        box.push(
            <div key={match.day} className='match_box'>
                <div className='match_day'>
                    <span>
                        {match.day}
                    </span>
                    <span>
                        {match.round}
                    </span>
                </div>
                <div className='match_data'>
                    <div className='Lteam'>
                        <div className='teamRinfo'>
                            <img src={match.Lteam.pic}></img>
                            <span>
                                {match.Lteam.rank}
                            </span>
                        </div>
                        <span className='POscore'>
                            {match.Lteam.score}
                        </span>
                    </div>
                    <span className='POscore'>
                        :
                    </span>
                    <div className='Rteam'>
                        <span className='POscore'>
                            {match.Rteam.score}
                        </span>
                        <div className='teamRinfo'>
                            <img src={match.Rteam.pic}></img>
                            <span>
                                {match.Rteam.rank}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        )
    })
    return (
        box
    );
}

export default Match_list;
