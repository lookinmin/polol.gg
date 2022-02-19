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
                                {"정규시즌 Rank. "+match.Lteam.rank}
                            </span>
                        </div>
                        <span className={parseInt(match.Rteam.score)>parseInt(match.Lteam.score)?'lose':'win'}>
                            {match.Lteam.score}
                        </span>
                    </div>
                    <span className='POscore'>
                        :
                    </span>
                    <div className='Rteam'>
                        <span className={parseInt(match.Lteam.score)>parseInt(match.Rteam.score)?'lose':'win'}>
                            {match.Rteam.score}
                        </span>
                        <div className='teamRinfo'>
                            <img src={match.Rteam.pic}></img>
                            <span>
                                {"정규시즌 Rank. "+match.Rteam.rank}
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
