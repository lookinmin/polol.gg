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
const get_season_name = (str) => { //입력값 시즌이랑 년도로 나눔
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
const line_main = (str) => { //라인별로 나누고 메인인지 아닌지 판단
    let main = 1;
    str = str.split('/');
    if (str[0] == "Sub")
        main = 0;
    str = str[str.length - 1].slice(0, 3);
    switch (str) {
        case "Top":
            return [main, "TOP"]
        case "Sup":
            return [main, "SPT"]
        case "Mid":
            return [main, "MID"]
        case "Jun":
            return [main, "JG"]
        case "Bot":
            return [main, "ADC"]
        default:
            return [main, "null"];
    }
}

const make_table_frame = async (season_year) => {//경기 일정 테이블과 정규시즌 팀, 선수 테이블 프레임 생성
    let match_period = {}; //스케줄러으 기간 설정
    match_scehdule_team = async (string) => { //경기 일정 테이블과 정규시즌팀 테이블 프레임 생성
        var Lteam1 = [];
        var Rteam1 = [];
        var Lteam2 = [];
        var Rteam2 = [];
        var month = [];
        var day = [];
        let jointeam = [];
        const SplitDate = (date) => {
            const newDate = date.split("-");
            month.push(newDate[1]);
            day.push(newDate[2]);
        } //tableMaker에 보내는 디비랑 동일
        let [year, season] = get_season_name(string);
        try {
            const res = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Season');
            const $ = cheerio.load(res.data);
            for (let i = 0; i < $(`div.matchlist-tab-wrapper`).length; i++) {
                for (let j = 8; j <= $(`div#matchlist-content-wrapper  div:nth-child(${i + 1})  table.matchlist  tbody tr`).length; j += 7) {
                    Lteam1.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
                table.matchlist > tbody > tr:nth-child(${j}) > td.matchlist-team1 > span.team > span.teamname`).text());
                    Rteam1.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
                table.matchlist > tbody > tr:nth-child(${j}) > td.matchlist-team2 > span.team > span.teamname`).text());
                    Lteam2.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
                table.matchlist > tbody > tr:nth-child(${j + 2}) > td.matchlist-team1 > span.team > span.teamname`).text());
                    Rteam2.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
                table.matchlist > tbody > tr:nth-child(${j + 2}) > td.matchlist-team2 > span.team > span.teamname`).text());
                    SplitDate($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
                table.matchlist > tbody > tr:nth-child(${j})`).attr('data-date'));
                }
            }
            match_period = {
                start: Number(month[0]),
                end: Number(month[month.length - 1])
            }
            jointeam = [...(new Set(Lteam1))];
        } catch(err) {
            console.log("경기일정 크롤링 실패")
        }
        try {
            const connection = await mysql.createPool(
                port
            );
            const promisePool = connection.promise();

            var sql = "REPLACE INTO `history`." + string + " (`Month`, `Day`, `Lteam1`, `Rteam1`, `Lteam2` ,`Rteam2`) VALUES (?, ?, ?, ?, ?, ?);";
            for (let i = 0; i < Lteam1.length; i++) {
                let param = [month[i], day[i], Lteam1[i], Rteam1[i], Lteam2[i], Rteam2[i], ];
                const [row] = await promisePool.query(sql, param, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            for (let i = 0; i < 10; i++) {
                let value = jointeam[i]
                sql = "REPLACE INTO stack." + string + "_regular_team(`TeamName`) VALUES (?)";
                await promisePool.query(sql, value,
                    function (err, rows, fields) {
                        if (err) {
                            console.log('dbwrite: ' + err);
                        } else {
                            console.log("data inserted");
                        }
                    })
            }
            promisePool.end();
        } catch (err) {
            console.log(err);
        }

        return jointeam;
    }


    const Thread = async (team1_name, team1_url, team2_name, team2_url) => {
        var player_res = await axios('https://lol.fandom.com/wiki/' + team1_url);
        var player_html = cheerio.load(player_res.data);
        var team1 = [];
        var team2 = [];

        try {
            
            for (let i = 0; i < player_html(`table.team-members-current > tbody > tr`).length - 1; i++) {
                let Team = team1_name
                let Name = player_html(`table.team-members-current  tbody  tr:nth-child(` + (2 + i) + `) td:nth-child(3)`).text();
                if(i>0&&team1[team1.length-1].Name==Name){
                    continue;
                }
                let [EnName, KoreaName] = player_html(`table.team-members-current  tbody  tr:nth-child(` + (2 + i) + `) td:nth-child(4)`).text().split(' (');
                KoreaName = KoreaName.slice(0, KoreaName.length - 1)
                let [Main, Position] = line_main(player_html(`table.team-members-current  tbody  tr:nth-child(` + (2 + i) + `) td:nth-child(5)`).text());
                let Pic;
                let Birth;
                try {
                    let res = await axios('https://lol.fandom.com/wiki/' + Name);
                    let res_html = cheerio.load(res.data);
                    Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                    Pic = Pic.slice(0, Pic.indexOf(".png") + 4);
                    Birth = res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
                } catch {
                    EnName = (" (" + EnName + ")").replace(" ", "_").replace(" ", "_");
                    let res = await axios('https://lol.fandom.com/wiki/' + Name + EnName);
                    let res_html = cheerio.load(res.data);
                    Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                    Pic = Pic.slice(0, Pic.indexOf(".png") + 4);
                    Birth = res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
                }

                team1.push({
                    Team: Team,
                    Name: Name,
                    KoreaName: KoreaName,
                    Main: Main,
                    Position: Position,
                    Pic: Pic,
                    Birth: Birth
                })
            }
            player_res = await axios('https://lol.fandom.com/wiki/' + team2_url);
            player_html = cheerio.load(player_res.data);

            for (let i = 0; i < player_html(`table.team-members-current > tbody > tr`).length - 1; i++) {
                let Team = team2_name
                let Name = player_html(`table.team-members-current  tbody  tr:nth-child(` + (2 + i) + `) td:nth-child(3)`).text();
                if(i>0&&team2[team2.length-1].Name==Name){
                    continue;
                }
                let [EnName, KoreaName] = player_html(`table.team-members-current  tbody  tr:nth-child(` + (2 + i) + `) td:nth-child(4)`).text().split(' (');
                KoreaName = KoreaName.slice(0, KoreaName.length - 1)
                let [Main, Position] = line_main(player_html(`table.team-members-current  tbody  tr:nth-child(` + (2 + i) + `) td:nth-child(5)`).text());
                let Pic;
                let Birth;
                try {
                    let res = await axios('https://lol.fandom.com/wiki/' + Name);   //여기 안됨 시발
                    let res_html = cheerio.load(res.data);
                    Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                    Pic = Pic.slice(0, Pic.indexOf(".png") + 4);
                    Birth = res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
                } catch {
                    EnName = (" (" + EnName + ")").replace(" ", "_").replace(" ", "_");
                    console.log(Name + EnName)
                    let res = await axios('https://lol.fandom.com/wiki/' + Name + EnName);
                    let res_html = cheerio.load(res.data);
                    Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                    Pic = Pic.slice(0, Pic.indexOf(".png") + 4);
                    Birth = res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
                }

                team2.push({
                    Team: Team,
                    Name: Name,
                    KoreaName: KoreaName,
                    Main: Main,
                    Position: Position,
                    Pic: Pic,
                    Birth: Birth
                })
            }
            console.log(team2_name + " finish");
        } catch {
            console.log("선수정보 크롤링 실패")
        }

        return [...team1, ...team2]
    }
    const make_frame_data = async () => {
        let data1 = Thread(fullname2short.get(team_url[0]), team_url[0], fullname2short.get(team_url[1]), team_url[1]);
        let data2 = Thread(fullname2short.get(team_url[2]), team_url[2], fullname2short.get(team_url[3]), team_url[3]);
        let data3 = Thread(fullname2short.get(team_url[4]), team_url[4], fullname2short.get(team_url[5]), team_url[5]);
        let data4 = Thread(fullname2short.get(team_url[6]), team_url[6], fullname2short.get(team_url[7]), team_url[7]);
        let data5 = Thread(fullname2short.get(team_url[8]), team_url[8], fullname2short.get(team_url[9]), team_url[9]);
        return Promise.all([data1, data2, data3, data4, data5]);
    }


    const [year, season] = get_season_name(season_year);
    let jointeam_list = await match_scehdule_team(season_year);
    let teams_res = await axios("https://lol.fandom.com/wiki/LCK/" + "20" + year + "_Season");
    var teams_ = cheerio.load(teams_res.data);
    let team_url = [];
    
    for (let i = 0; i < 10; i++) {
        let temp = teams_(`table.standings  tbody  tr:nth-child(` + (3 + i) + `) td:nth-child(2) span span:nth-child(2) a`)[0].children[0].data;
        temp = temp.replace(" ", "_");
        temp = temp.replace(" ", "_");
        team_url.push(temp);
    }
    let fullname2short = teamname_matching({
        short: jointeam_list,
        full: team_url
    });

    try {
        var datadata = await make_frame_data();
        var insert_data = [];
        insert_data.push(...datadata[0], ...datadata[1], ...datadata[2], ...datadata[3], ...datadata[4]);

        var connection = await mysql.createPool(
            port
        );
        const promisePool = connection.promise();
        let value = [];
        for (let i = 0; i < insert_data.length; i++) {
            value.push([
                insert_data[i].Name,
                insert_data[i].KoreaName,
                insert_data[i].Team,
                insert_data[i].Position,
                null,
                null,
                null,
                null,
                null,
                insert_data[i].Birth,
                insert_data[i].Main,
                insert_data[i].Pic,
            ])
        }
        let sql = "REPLACE INTO stack." + season_year + "_regular_player(`Name`, `KoreaName`, `Team`, `Position`, `Kill`, `Death`, `Assist`, `Win`, `Lose`, `Birth`, `Main`, `Pic`) VALUES ?";
        await promisePool.query(sql, [value],
            function (err, rows, fields) {
                if (err) {
                    console.log('dbwrite: ' + err);
                } else {
                    console.log("data inserted");
                }
            })

        promisePool.end();
    } catch (error) {
        console.log("팀별 선수정보 프레임 생성 실패 :" + error);
    }
    return match_period;
}

module.exports = {
    MTF: make_table_frame
};
