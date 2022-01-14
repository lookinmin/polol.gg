console.log("player21Summer");
const axios = require("axios");
const cheerio = require("cheerio");


var all21Summer = {
  playerName: [],
  playerWin: [],
  playerLose: [],
  playerWinRate: [],
  playerKill: [],
  playerDeath: [],
  playerAssist: [],
  playerKDA: [],
  playerKillRate: [],
}

var top21Summer = {
  playerName: [],
  playerWin: [],
  playerLose: [],
  playerWinRate: [],
  playerKill: [],
  playerDeath: [],
  playerAssist: [],
  playerKDA: [],
  playerKillRate: [],
}

var jgl21Summer = {
  playerName: [],
  playerWin: [],
  playerLose: [],
  playerWinRate: [],
  playerKill: [],
  playerDeath: [],
  playerAssist: [],
  playerKDA: [],
  playerKillRate: [],
}

var mid21Summer = {
  playerName: [],
  playerWin: [],
  playerLose: [],
  playerWinRate: [],
  playerKill: [],
  playerDeath: [],
  playerAssist: [],
  playerKDA: [],
  playerKillRate: [],
}

var ad21Summer = {
  playerName: [],
  playerWin: [],
  playerLose: [],
  playerWinRate: [],
  playerKill: [],
  playerDeath: [],
  playerAssist: [],
  playerKDA: [],
  playerKillRate: [],
}

var spt21Summer = {
  playerName: [],
  playerWin: [],
  playerLose: [],
  playerWinRate: [],
  playerKill: [],
  playerDeath: [],
  playerAssist: [],
  playerKDA: [],
  playerKillRate: [],
}

const getAllData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/LCK/2021_Season/Summer_Season/Player_Statistics');
  } catch (error) {
    console.error(error);
  }
};

getAllData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 5; i < $('table.wikitable > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      all21Summer.playerName.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(2)`).text());
      all21Summer.playerWin.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(4)`).text());
      all21Summer.playerLose.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(5)`).text());
      all21Summer.playerWinRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(6)`).text());
      all21Summer.playerKill.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(7)`).text());
      all21Summer.playerDeath.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(8)`).text());
      all21Summer.playerAssist.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(9)`).text());
      all21Summer.playerKDA.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(10)`).text());
      all21Summer.playerKillRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(15)`).text());
    }
  });

const getTopData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Top&TS%5Btournament%5D=LCK%2F2021+Season%2FSummer+Season&pfRunQueryFormName=TournamentStatistics');
  } catch (error) {
    console.error(error);
  }
};

getTopData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 4; i <= $('table.wikitable > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      top21Summer.playerName.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(2)`).text());
      top21Summer.playerWin.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(4)`).text());
      top21Summer.playerLose.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(5)`).text());
      top21Summer.playerWinRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(6)`).text());
      top21Summer.playerKill.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(7)`).text());
      top21Summer.playerDeath.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(8)`).text());
      top21Summer.playerAssist.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(9)`).text());
      top21Summer.playerKDA.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(10)`).text());
      top21Summer.playerKillRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(11)`).text());
    }
  });

const getJglData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Jungle&TS%5Btournament%5D=LCK%2F2021+Season%2FSummer+Season&pfRunQueryFormName=TournamentStatistics');
  } catch (error) {
    console.error(error);
  }
};

getJglData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 4; i <= $('table.wikitable > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      jgl21Summer.playerName.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(2)`).text());
      jgl21Summer.playerWin.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(4)`).text());
      jgl21Summer.playerLose.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(5)`).text());
      jgl21Summer.playerWinRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(6)`).text());
      jgl21Summer.playerKill.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(7)`).text());
      jgl21Summer.playerDeath.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(8)`).text());
      jgl21Summer.playerAssist.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(9)`).text());
      jgl21Summer.playerKDA.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(10)`).text());
      jgl21Summer.playerKillRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(11)`).text());
    }
  });

const getMidpData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Mid&TS%5Btournament%5D=LCK%2F2021+Season%2FSummer+Season&pfRunQueryFormName=TournamentStatistics');
  } catch (error) {
    console.error(error);
  }
};

getMidpData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 4; i <= $('table.wikitable > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      mid21Summer.playerName.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(2)`).text());
      mid21Summer.playerWin.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(4)`).text());
      mid21Summer.playerLose.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(5)`).text());
      mid21Summer.playerWinRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(6)`).text());
      mid21Summer.playerKill.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(7)`).text());
      mid21Summer.playerDeath.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(8)`).text());
      mid21Summer.playerAssist.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(9)`).text());
      mid21Summer.playerKDA.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(10)`).text());
      mid21Summer.playerKillRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(11)`).text());
    }
  });

const getAdData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Bot&TS%5Btournament%5D=LCK%2F2021+Season%2FSummer+Season&pfRunQueryFormName=TournamentStatistics');
  } catch (error) {
    console.error(error);
  }
};

getAdData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 4; i <= $('table.wikitable > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      ad21Summer.playerName.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(2)`).text());
      ad21Summer.playerWin.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(4)`).text());
      ad21Summer.playerLose.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(5)`).text());
      ad21Summer.playerWinRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(6)`).text());
      ad21Summer.playerKill.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(7)`).text());
      ad21Summer.playerDeath.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(8)`).text());
      ad21Summer.playerAssist.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(9)`).text());
      ad21Summer.playerKDA.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(10)`).text());
      ad21Summer.playerKillRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(15)`).text());
    }
  });

const getSptData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Support&TS%5Btournament%5D=LCK%2F2021+Season%2FSummer+Season&pfRunQueryFormName=TournamentStatistics');
  } catch (error) {
    console.error(error);
  }
};

getSptData()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    for (let i = 4; i <= $('table.wikitable > tbody > tr').length; i++) {//-5해야 21 스프링 선수 수
      spt21Summer.playerName.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(2)`).text());
      spt21Summer.playerWin.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(4)`).text());
      spt21Summer.playerLose.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(5)`).text());
      spt21Summer.playerWinRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(6)`).text());
      spt21Summer.playerKill.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(7)`).text());
      spt21Summer.playerDeath.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(8)`).text());
      spt21Summer.playerAssist.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(9)`).text());
      spt21Summer.playerKDA.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(10)`).text());
      spt21Summer.playerKillRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(15)`).text());
    }
  })
// .then(() => {
//   console.log(top21Summer.playerName);
//   console.log(jgl21Summer.playerName);
//   console.log(mid21Summer.playerName);
//   console.log(ad21Summer.playerName);
//   console.log(spt21Summer.playerName);
// });


const player21Summer = {
  All: all21Summer,
  Top: top21Summer,
  Jgl: jgl21Summer,
  Mid: mid21Summer,
  Ad: ad21Summer,
  Spt: spt21Summer
}



module.exports = { player21SummerData: player21Summer }