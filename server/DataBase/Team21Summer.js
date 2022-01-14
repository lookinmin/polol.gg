console.log("team21Summer");
const axios = require("axios");
const cheerio = require("cheerio");

var team21Summer = {
  teamName: [],
  teamGameWin: [],
  teamGameLose: [],
  teamGameWinRate: [],
  teamSetWin: [],
  teamSetLose: [],
  teamSetWinRate: [],
  teamDiff: [],
}

const getTeamData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/LCK/2021_Season/Summer_Season#Results');
  } catch (error) {
    console.error(error);
  }
};

getTeamData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 3; i < $('table.standings > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      team21Summer.teamName.push($(`table.standings > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text());
      team21Summer.teamGameWinRate.push($(`table.standings > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text());
      team21Summer.teamSetWinRate.push($(`table.standings > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text());
      team21Summer.teamDiff.push($(`table.standings > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text());
      SeperateText($(`table.standings > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text(),
       $(`table.standings > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text())
    }
  });


function SeperateText(games, sets) {
  let game = games.split('-');
  team21Summer.teamGameWin.push(game[0]);
  team21Summer.teamGameLose.push(game[1]);
  let set = sets.split('-');
  team21Summer.teamSetWin.push(set[0]);
  team21Summer.teamSetLose.push(set[1]);
}

module.exports = { team21SummerData: team21Summer }
