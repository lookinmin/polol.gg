console.log("player21Spring");
const axios = require("axios");
const cheerio = require("cheerio");


var all21Spring = {
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

var top21Spring = {
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

var jgl21Spring = {
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

var mid21Spring = {
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

var ad21Spring = {
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

var spt21Spring = {
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
    return await axios.get('https://lol.fandom.com/wiki/LCK/2021_Season/Spring_Season/Player_Statistics');
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
      all21Spring.playerName.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(2)`).text());
      all21Spring.playerWin.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(4)`).text());
      all21Spring.playerLose.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(5)`).text());
      all21Spring.playerWinRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(6)`).text());
      all21Spring.playerKill.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(7)`).text());
      all21Spring.playerDeath.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(8)`).text());
      all21Spring.playerAssist.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(9)`).text());
      all21Spring.playerKDA.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(10)`).text());
      all21Spring.playerKillRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(15)`).text());
    }
  });

const getTopData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Top&TS%5Btournament%5D=LCK%2F2021+Season%2FSpring+Season&pfRunQueryFormName=TournamentStatistics');
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
      top21Spring.playerName.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(2)`).text());
      top21Spring.playerWin.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(4)`).text());
      top21Spring.playerLose.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(5)`).text());
      top21Spring.playerWinRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(6)`).text());
      top21Spring.playerKill.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(7)`).text());
      top21Spring.playerDeath.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(8)`).text());
      top21Spring.playerAssist.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(9)`).text());
      top21Spring.playerKDA.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(10)`).text());
      top21Spring.playerKillRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(11)`).text());
    }
  });

const getJglData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Jungle&TS%5Btournament%5D=LCK%2F2021+Season%2FSpring+Season&pfRunQueryFormName=TournamentStatistics');
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
      jgl21Spring.playerName.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(2)`).text());
      jgl21Spring.playerWin.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(4)`).text());
      jgl21Spring.playerLose.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(5)`).text());
      jgl21Spring.playerWinRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(6)`).text());
      jgl21Spring.playerKill.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(7)`).text());
      jgl21Spring.playerDeath.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(8)`).text());
      jgl21Spring.playerAssist.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(9)`).text());
      jgl21Spring.playerKDA.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(10)`).text());
      jgl21Spring.playerKillRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(11)`).text());
    }
  });

const getMidpData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Mid&TS%5Btournament%5D=LCK%2F2021+Season%2FSpring+Season&pfRunQueryFormName=TournamentStatistics');
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
      mid21Spring.playerName.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(2)`).text());
      mid21Spring.playerWin.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(4)`).text());
      mid21Spring.playerLose.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(5)`).text());
      mid21Spring.playerWinRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(6)`).text());
      mid21Spring.playerKill.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(7)`).text());
      mid21Spring.playerDeath.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(8)`).text());
      mid21Spring.playerAssist.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(9)`).text());
      mid21Spring.playerKDA.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(10)`).text());
      mid21Spring.playerKillRate.push($(`table.wikitable > tbody > 
      tr:nth-child(${i}) > td:nth-child(11)`).text());
    }
  });

const getAdData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Bot&TS%5Btournament%5D=LCK%2F2021+Season%2FSpring+Season&pfRunQueryFormName=TournamentStatistics');
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
      ad21Spring.playerName.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(2)`).text());
      ad21Spring.playerWin.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(4)`).text());
      ad21Spring.playerLose.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(5)`).text());
      ad21Spring.playerWinRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(6)`).text());
      ad21Spring.playerKill.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(7)`).text());
      ad21Spring.playerDeath.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(8)`).text());
      ad21Spring.playerAssist.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(9)`).text());
      ad21Spring.playerKDA.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(10)`).text());
      ad21Spring.playerKillRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(15)`).text());
    }
  });

const getSptData = async () => {
  try {
    return await axios.get('https://lol.fandom.com/wiki/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=TournamentByPlayerRole&TS%5Brole%5D=Support&TS%5Btournament%5D=LCK%2F2021+Season%2FSpring+Season&pfRunQueryFormName=TournamentStatistics');
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
      spt21Spring.playerName.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(2)`).text());
      spt21Spring.playerWin.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(4)`).text());
      spt21Spring.playerLose.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(5)`).text());
      spt21Spring.playerWinRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(6)`).text());
      spt21Spring.playerKill.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(7)`).text());
      spt21Spring.playerDeath.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(8)`).text());
      spt21Spring.playerAssist.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(9)`).text());
      spt21Spring.playerKDA.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(10)`).text());
      spt21Spring.playerKillRate.push($(`table.wikitable > tbody > 
            tr:nth-child(${i}) > td:nth-child(15)`).text());
    }
  })
// .then(() => {
//   console.log(top21Spring.playerName);
//   console.log(jgl21Spring.playerName);
//   console.log(mid21Spring.playerName);
//   console.log(ad21Spring.playerName);
//   console.log(spt21Spring.playerName);
// });


const player21Spring = {
  All: all21Spring,
  Top: top21Spring,
  Jgl: jgl21Spring,
  Mid: mid21Spring,
  Ad: ad21Spring,
  Spt: spt21Spring
}



module.exports = { player21SpringData: player21Spring }