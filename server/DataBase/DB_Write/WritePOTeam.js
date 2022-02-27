const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');

const teamname_matching = (teamname) => { //팀풀네임과 줄임말 매칭
    const is_shortcut = (word1, word2) => {
        let i = 0
        word:
            for (let temp of word1) {
                for (; i < word2.length; i++) {
                    if (temp == word2[i]) {
                        i = i + 1;
                        continue word;
                    }
                }
                return false;
            }
        return true;
    }
    let lower_words = {
        short: [],
        full: []
    }
    for (let temp of teamname.short) {
        lower_words.short.push(temp.toLowerCase());
    }
    for (let temp of teamname.full) {
        lower_words.full.push(temp.toLowerCase());
    }
    let result = [];
    for (let short = 0; short < lower_words.short.length; short++) {
        let temp = {
            name: teamname.short[short],
            maybe: []
        }
        for (let full = 0; full < lower_words.full.length; full++) {
            if (is_shortcut(lower_words.short[short], lower_words.full[full])) {
                temp.maybe.push(teamname.full[full])
            }
        }
        result.push(temp);
    }
    var map = new Map()
    var overlaped = [];
    for (let temp of result) {
        if (temp.maybe.length == 1) {
            map.set(temp.maybe[0], temp.name);
        } else {
            overlaped.push(temp);
        }
    }
    for (let temp of overlaped) {
        for (let tmp of temp.maybe) {
            if (!map.has(tmp)) {
                map.set(tmp, temp.name);
            }
        }
    }
    return map;
}
const getPOTeam = async (str) => {
    const get_season_name = (str) => {
        str = str.toLowerCase();
        let season;
        let year;
        if (str[1] == "p") {
            year = str.replace("spring", "");
            season = "Spring"
        } else {
            year = str.replace("summer", "");
            season = "Summer"
        }
        return [year, season]
    }

    try {
        let [year, season] = get_season_name(str);
        var connection = await mysql.createPool(
            port
        );
        const promisePool = connection.promise();
        const [rows] = await promisePool.query('SELECT TeamName FROM stack.' + str + '_regular_team ORDER BY `Rank` LIMIT 6');

        for (let temp of rows) {
            temp.Win = 0;
            temp.Lose = 0;
            temp.Kill = 0;
            temp.Death = 0;
            temp.Assist = 0;
        }

        const teamTable = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Playoffs');
        const $ = cheerio.load(teamTable.data);

        for (let i = 0; i < 3; i++) {
            for (let j = 8; j < 14; j += 5) {
                try {
                    let team1_score = ($('div.matchlist-tab-wrapper:nth-child(' + (i + 1) + ')  table.matchlist  tbody  tr:nth-child(' + j + ') td:nth-child(2)').text());
                    let team1 = ($('div.matchlist-tab-wrapper:nth-child(' + (i + 1) + ')  table.matchlist  tbody  tr:nth-child(' + j + ') td:nth-child(1) span.teamname')[0].children[0].data)
                    let team2_score = ($('div.matchlist-tab-wrapper:nth-child(' + (i + 1) + ')  table.matchlist  tbody  tr:nth-child(' + j + ') td:nth-child(3)').text())
                    let team2 = ($('div.matchlist-tab-wrapper:nth-child(' + (i + 1) + ')  table.matchlist  tbody  tr:nth-child(' + j + ') td:nth-child(5) span.teamname')[0].children[0].data)

                    switch (team1) {
                        case rows[0].TeamName:
                            rows[0].Win += Number(team1_score);
                            rows[0].Lose += Number(team2_score);
                            break;
                        case rows[1].TeamName:
                            rows[1].Win += Number(team1_score);
                            rows[1].Lose += Number(team2_score);
                            break;
                        case rows[2].TeamName:
                            rows[2].Win += Number(team1_score);
                            rows[2].Lose += Number(team2_score);
                            break;
                        case rows[3].TeamName:
                            rows[3].Win += Number(team1_score);
                            rows[3].Lose += Number(team2_score);
                            break;
                        case rows[4].TeamName:
                            rows[4].Win += Number(team1_score);
                            rows[4].Lose += Number(team2_score);
                            break;
                        case rows[5].TeamName:
                            rows[5].Win += Number(team1_score);
                            rows[5].Lose += Number(team2_score);
                            break;
                        default:
                            break;
                    }
                    switch (team2) {
                        case rows[0].TeamName:
                            rows[0].Win += Number(team2_score);
                            rows[0].Lose += Number(team1_score);
                            break;
                        case rows[1].TeamName:
                            rows[1].Win += Number(team2_score);
                            rows[1].Lose += Number(team1_score);
                            break;
                        case rows[2].TeamName:
                            rows[2].Win += Number(team2_score);
                            rows[2].Lose += Number(team1_score);
                            break;
                        case rows[3].TeamName:
                            rows[3].Win += Number(team2_score);
                            rows[3].Lose += Number(team1_score);
                            break;
                        case rows[4].TeamName:
                            rows[4].Win += Number(team2_score);
                            rows[4].Lose += Number(team1_score);
                            break;
                        case rows[5].TeamName:
                            rows[5].Win += Number(team1_score);
                            rows[5].Lose += Number(team2_score);
                            break;
                        default:
                            break;
                    }
                } catch {
                    console.log("값없음")
                    continue;
                }

            }
        }
        const team_all_KDA = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Playoffs/Player_Statistics');
        const team_KDA = cheerio.load(team_all_KDA.data);

        let fullname = [];
        let shortname = [];
        for (let i = 5; i < team_KDA('table.spstats  tbody  tr').length; i++) {
            fullname.push(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td a')[0].attribs.title);
        }
        fullname = [...new Set(fullname)];
        for(let temp of rows){
            shortname.push(temp.TeamName);
        }
        let fullname2short = teamname_matching({
            short: shortname,
            full: fullname
        });
        for (let i = 5; i < team_KDA('table.spstats  tbody  tr').length; i++) {
            let teamname_data = team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td a')[0].attribs.title;
            let gamecount_data = team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(3)').text();
            let kill_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(7)').text() * gamecount_data);
            let death_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(8)').text() * gamecount_data);
            let assist_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(9)').text() * gamecount_data);
            switch (fullname2short.get(teamname_data)) {
                case rows[0].TeamName:
                    rows[0].Kill += kill_data;
                    rows[0].Death += death_data;
                    rows[0].Assist += assist_data;
                    break;
                case rows[1].TeamName:
                    rows[1].Kill += kill_data;
                    rows[1].Death += death_data;
                    rows[1].Assist += assist_data;
                    break;
                case rows[2].TeamName:
                    rows[2].Kill += kill_data;
                    rows[2].Death += death_data;
                    rows[2].Assist += assist_data;
                    break;
                case rows[3].TeamName:
                    rows[3].Kill += kill_data;
                    rows[3].Death += death_data;
                    rows[3].Assist += assist_data;
                    break;
                case rows[4].TeamName:
                    rows[4].Kill += kill_data;
                    rows[4].Death += death_data;
                    rows[4].Assist += assist_data;
                case rows[5].TeamName:
                    rows[5].Kill += kill_data;
                    rows[5].Death += death_data;
                    rows[5].Assist += assist_data;
                    break;
                default:
                    break;
            }
        }
        for (let temp of rows) {
            if (temp.Death == 0) {
                temp.Death = 0.9
            }
            temp.KDA = ((temp.Kill + temp.Assist) / temp.Death).toFixed(2);
        }
        
        for (let j = 0; j < rows.length; j++) {
            let sql = "REPLACE INTO `stack`.`" + str + "_playoff_team` (`Win`, `Lose`, `KDA`, `Kill`, `Death`, `Assist`) VALUES (?, ?, ?, ?, ?, ?);";
            await promisePool.query(sql, [rows[j].Win, rows[j].Lose, rows[j].KDA, rows[j].Kill, rows[j].Death, rows[j].Assist],
                function (err, rows, field) {
                    if (err) {
                        console.log('dbwrite: ' + err);
                    } else {
                        console.log("data inserted");
                    }
                })
        }


        promisePool.end();
    } catch (error) {
        console.log(error);
    }
    console.log(str + "team update")

}
module.exports = {
    getPOTeam: getPOTeam
};