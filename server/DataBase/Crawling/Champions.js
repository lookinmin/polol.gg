console.log('champions start');
const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require('mysql2');
const port = require('../port/pololPort');


const getChampionNum = (url) => {
  const newUrl = url.split("/");
  return newUrl[3];
}

const getNumber = (num) => {
  const newNum = num.split("(");
  return newNum[0];
}

const getPickBan = async (champNum, position) => {
  const res = await axios.get(`https://gol.gg/champion/champion-stats/${champNum}/season-S12/split-ALL/tournament-LCK%20Spring%202022/`);
  const $ = cheerio.load(res.data);
  const name = $(`table.table_list > tbody > tr:nth-child(1) > td > img`).attr('alt');
  const ban = getNumber($(`table.table_list > tbody > tr:nth-child(2) > td:nth-child(2).text-center`).text());
  const pick = getNumber($(`table.table_list > tbody > tr:nth-child(3) > td:nth-child(2).text-center`).text());
  const url = $(`table.table_list > tbody > tr:nth-child(1) > td > img`).attr('src');
  console.log('name: ')
  return {
    name,
    position,
    ban,
    pick,
    url
  }
}

const getChampions = async () => {
  try {
    return await axios.get('https://gol.gg/tournament/tournament-picksandbans/LCK%20Spring%202022/');
  } catch (error) {
    console.log(error);
  }
}

getChampions()
.then(async (res) => {
  const $ = cheerio.load(res.data);
  var champ = [];
  
  for(let i=1; i<=3;i++){
    const champNum = getChampionNum($(`table.table_list > tbody > tr:nth-child(4) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href'));    
    champ.push(await getPickBan(champNum, 'TOP'));
  } console.log('top');

  for(let i=1; i<=3;i++){
    const champNum = getChampionNum($(`table.table_list > tbody > tr:nth-child(5) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href'));
    champ.push(await getPickBan(champNum, 'JGL'));
  }  console.log('jgl');

  for(let i=1; i<=3;i++){
    const champNum = getChampionNum($(`table.table_list > tbody > tr:nth-child(6) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href'));
    champ.push(await getPickBan(champNum, 'MID'));
  }  console.log('mid');

  for(let i=1; i<=3;i++){
    const champNum = getChampionNum($(`table.table_list > tbody > tr:nth-child(7) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href'));
    champ.push(await getPickBan(champNum, 'ADC'));
  }  console.log('adc');

  for(let i=1; i<=3;i++){
    const champNum = getChampionNum($(`table.table_list > tbody > tr:nth-child(8) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href'));
    champ.push(await getPickBan(champNum, 'SPT'));
  }  console.log('spt');

  return champ;
})
.then(async (data) => {
  console.log(data)
  const sql = "REPLACE INTO `polol`.`champions` (`name`, `position`, `pick`, `ban`, `url`) VALUES (?, ?, ?, ?, ?);";
  const connection = await mysql.createPool(
    port
  );
  try {
    try {
      const promisePool = connection.promise();
      for (const champ of data) {
        let param = [champ.name, champ.position, champ.pick, champ.ban, champ.url];
        const [row] = await promisePool.query(sql, param, function (err, rows, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      }
      promisePool.end();

      console.log('write to champions db')
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


