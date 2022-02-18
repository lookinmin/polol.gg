console.log('WriteBanPick');
const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require('mysql2');
const port = require('../port/pololPort');

var champList = [];

const getChampionNum = (url) => {
  const newUrl = url.split("/");
  return newUrl[3];
}

const sumPickAndBan = (all, line) => {
  all.forEach(e => {
    line.forEach(i => {
      if (e.name === i.name) {
        if (e.checked === true) {
          if (e.pick < i.pick) {
            e.position = i.position;
          }
          e.pick = Number(e.pick) + Number(i.pick);
          e.total = Number(e.ban) + Number(e.pick);
        } else {
          e.pick = i.pick;
          e.total = Number(e.ban) + Number(i.pick);
          e.position = i.position;
          e.checked = true;
        }
      }
    })
  });
}

// const sortByTotal = (arr, line) => {
//   let result = arr.sort((a, b) => {
//     return b.total - a.total;
//   });

//   if (line !== 'top') {
//     let insert = 0;
//     for (let i = 0; i < result.length; i++) {
//       let cnt = 0;
//       for (let j = 0; j < champList.length; j++) {
//         if (result[i].name === champList[j].name) {
//           champList[j].pick = Number(champList[j].pick) + Number(result[i].pick);
//           cnt++;
//           break;
//         }
//       }
//       if (cnt === 0) {
//         champList.push(result[i]);
//         insert++;
//       }
//       if (insert === 3) {
//         break;
//       }
//     }
//   } else {
//     champList.push(result[0]);
//     champList.push(result[1]);
//     champList.push(result[2]);
//   }

// }

const getChampWinLose = (text) => {
  const newText = text.split('L')[0] + 'L';
  const newTxt = newText.split('-');
  return [newTxt[0].replace(/ /g, ""), newTxt[1].replace(/ /g, "")];
}

const getChampImg = async (champNum) => {
  const res = await axios.get(`https://gol.gg/champion/champion-stats/${champNum}/season-S12/split-ALL/tournament-LCK%20Spring%202022/`);
  const $ = cheerio.load(res.data);
  const winLose = getChampWinLose($(`table.table_list > tbody > tr:nth-child(5) > td.text-center`).text());
  return [
    $(`table.table_list > tbody > tr:nth-child(1) > td > img`).attr('src'),
    $(`table.table_list > tbody > tr:nth-child(5) > td:nth-child(2) > div > div:nth-child(3)`).text(),
    winLose[0],
    winLose[1]
  ]
}

const getAllBanChampions = async () => {
  try {
    return await axios.get('https://gol.gg/tournament/tournament-picksandbans/LCK%20Spring%202022/');
  } catch (error) {
    console.log(error);
  }
}

getAllBanChampions()
  .then((res) => {
    const $ = cheerio.load(res.data);
    let banChampList = [];
    let topList = [];
    let jglList = [];
    let midList = [];
    let adcList = [];
    let sptList = [];

    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(3) > td:nth-child(2) > span`).length; i++) {
      banChampList.push({
        name: $(`table.table_list > tbody > tr:nth-child(3)
        > td:nth-child(2) > span:nth-child(${i}) > a > img`).attr('alt'),
        ban: $(`table.table_list > tbody > tr:nth-child(3)
        > td:nth-child(2) > span:nth-child(${i})`).text().replace(/[^0-9]/g, ''),
        checked: false
      });
    }
    //전체 챔피언 밴

    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(4) > td:nth-child(2) > div`).length; i++) {
      topList.push({
        champNum: getChampionNum($(`table.table_list > tbody > tr:nth-child(4) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href')),
        name: $(`table.table_list > tbody > tr:nth-child(4) > td:nth-child(2) > div:nth-child(${i}) > a > img`).attr('alt'),
        pick: $(`table.table_list > tbody > tr:nth-child(4) > td:nth-child(2) > div:nth-child(${i})`).text().replace(/[^0-9]/g, ''),
        position: 'TOP'
      })
    }


    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(5) > td:nth-child(2) > div`).length; i++) {
      jglList.push({
        champNum: getChampionNum($(`table.table_list > tbody > tr:nth-child(5) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href')),
        name: $(`table.table_list > tbody > tr:nth-child(5) > td:nth-child(2) > div:nth-child(${i}) > a > img`).attr('alt'),
        pick: $(`table.table_list > tbody > tr:nth-child(5) > td:nth-child(2) > div:nth-child(${i})`).text().replace(/[^0-9]/g, ''),
        position: 'JGL'
      })
    }

    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(6) > td:nth-child(2) > div`).length; i++) {
      midList.push({
        champNum: getChampionNum($(`table.table_list > tbody > tr:nth-child(6) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href')),
        name: $(`table.table_list > tbody > tr:nth-child(6) > td:nth-child(2) > div:nth-child(${i}) > a > img`).attr('alt'),
        pick: $(`table.table_list > tbody > tr:nth-child(6) > td:nth-child(2) > div:nth-child(${i})`).text().replace(/[^0-9]/g, ''),
        position: 'MID'
      })
    }

    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(7) > td:nth-child(2) > div`).length; i++) {
      adcList.push({
        champNum: getChampionNum($(`table.table_list > tbody > tr:nth-child(7) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href')),
        name: $(`table.table_list > tbody > tr:nth-child(7) > td:nth-child(2) > div:nth-child(${i}) > a > img`).attr('alt'),
        pick: $(`table.table_list > tbody > tr:nth-child(7) > td:nth-child(2) > div:nth-child(${i})`).text().replace(/[^0-9]/g, ''),
        position: 'ADC'
      })
    }

    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(8) > td:nth-child(2) > div`).length; i++) {
      sptList.push({
        champNum: getChampionNum($(`table.table_list > tbody > tr:nth-child(8) > td:nth-child(2) > div:nth-child(${i}) > a`).attr('href')),
        name: $(`table.table_list > tbody > tr:nth-child(8) > td:nth-child(2) > div:nth-child(${i}) > a > img`).attr('alt'),
        pick: $(`table.table_list > tbody > tr:nth-child(8) > td:nth-child(2) > div:nth-child(${i})`).text().replace(/[^0-9]/g, ''),
        position: 'SPT'
      })
    }
    //라인별 픽

    sumPickAndBan(banChampList, topList);
    sumPickAndBan(banChampList, jglList);
    sumPickAndBan(banChampList, midList);
    sumPickAndBan(banChampList, adcList);
    sumPickAndBan(banChampList, sptList);

    let tmpTop = [];
    let tmpJgl = [];
    let tmpMid = [];
    let tmpAdc = [];
    let tmpSpt = [];

    for (const e of banChampList) {
      switch (e.position) {
        case 'TOP':
          tmpTop.push(e);
          break;
        case 'JGL':
          tmpJgl.push(e);
          break;
        case 'MID':
          tmpMid.push(e);
          break;
        case 'ADC':
          tmpAdc.push(e);
          break;
        case 'SPT':
          tmpSpt.push(e);
          break;
        default:
          break;
      }
    }

    let sortTop = tmpTop.sort((a, b) => {
      return b.total - a.total;
    });

    console.log(sortTop);

    // for(let i=0;i<3;i++){
    //   champList.push(tmpTop[i]);
    //   champList.push(tmpJgl[i]);
    //   champList.push(tmpMid[i]);
    //   champList.push(tmpAdc[i]);
    //   champList.push(tmpSpt[i]);
    // }

    // console.log(champList);


    // sortByTotal(topList, 'top');
    // sortByTotal(jglList, 'jgl');
    // sortByTotal(midList, 'mid');
    // sortByTotal(adcList, 'adc');
    // sortByTotal(sptList, 'spt');
  })
  // .then(async () => {
  //   for (let e of champList) {
  //     const info = await getChampImg(e.champNum);
  //     e.url = info[0];
  //     e.winRate = info[1];
  //     e.win = info[2];
  //     e.lose = info[3];
  //   }
  // })
  // .then(async () => {
  //   const sql = "REPLACE INTO `polol`.`champions` (`name`, `position`, `pick`, `ban`, `url`, `winRate`, `win`, `lose`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
  //   const connection = await mysql.createPool(
  //     port
  //   );
  //   try {
  //     try {
  //       const promisePool = connection.promise();
  //       for (const champ of champList) {
  //         let param = [champ.name, champ.position, champ.pick, champ.ban, champ.url, champ.winRate, champ.win, champ.lose];
  //         const [row] = await promisePool.query(sql, param, function (err, rows, fields) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log(row);
  //           }
  //         });
  //       }
  //       promisePool.end();

  //       console.log('write to champions db')
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });