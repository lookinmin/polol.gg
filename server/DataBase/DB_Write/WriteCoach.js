const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');


const make_Player_data = async (season_year) => {
    const get_season_name=(str)=>{
        str=str.toLowerCase();
        let season;
        let year;
        if(str[1]=="p"){
            year=str.replace("spring","");
            season="spring"
        }
        else{
            year=str.replace("summer","");
            season="summer"
        }
        return [year,season]
    }
    const line_main=(str)=>{
        let main=1;
        str=str.split('/');
        if(str[0]=="Sub")
            main=0;
        str=str[str.length-1].slice(0,3);
        switch(str){
            case "Top":
                return [main,"TOP"]
            case "Sup":
                return [main,"SPT"]
            case "Mid":
                return [main,"MID"]
            case "Jun":
                return [main,"JG"]
            case "Bot":
                return [main,"ADC"]
            default:
                return [main,"null"];
        }
    }
    const Thread=async(team1_name,team1_url,team2_name,team2_url)=>{
        var player_res = await axios('https://lol.fandom.com/wiki/'+team1_url);
        var player_html = cheerio.load(player_res.data);
        var team1=[];
        var team2=[];

        for (let i = 0; i < player_html(`table.team-members-current > tbody > tr`).length-1; i++) {
            let Team=team1_name
            let Name = player_html(`table.team-members-current  tbody  tr:nth-child(`+(2+i)+`) td:nth-child(3)`).text();
            let [EnName,KoreaName] = player_html(`table.team-members-current  tbody  tr:nth-child(`+(2+i)+`) td:nth-child(4)`).text().split(' (');
            KoreaName=KoreaName.slice(0,KoreaName.length-1)
            let [Main,Position] = line_main(player_html(`table.team-members-current  tbody  tr:nth-child(`+(2+i)+`) td:nth-child(5)`).text());
            let Pic;
            let Birth;
            try{
                let res = await axios('https://lol.fandom.com/wiki/'+Name);
                let res_html = cheerio.load(res.data);
                Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                Pic=Pic.slice(0,Pic.indexOf(".png")+4);
                Birth=res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
            }
            catch{
                EnName=(" ("+EnName+")").replace(" ","_");
                let res = await axios('https://lol.fandom.com/wiki/'+Name+EnName);
                let res_html = cheerio.load(res.data);
                Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                Pic=Pic.slice(0,Pic.indexOf(".png")+4);
                Birth=res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
            }

            team1.push(
                {
                    Team:Team,
                    Name:Name,
                    KoreaName:KoreaName,
                    Main:Main,
                    Position:Position,
                    Pic:Pic,
                    Birth:Birth
                }
            )
        }
        console.log(team1_name+" finish");
        player_res = await axios('https://lol.fandom.com/wiki/'+team2_url);
        player_html = cheerio.load(player_res.data);

        for (let i = 0; i < player_html(`table.team-members-current > tbody > tr`).length-1; i++) {
            let Team=team2_name
            let Name = player_html(`table.team-members-current  tbody  tr:nth-child(`+(2+i)+`) td:nth-child(3)`).text();
            let [EnName,KoreaName] = player_html(`table.team-members-current  tbody  tr:nth-child(`+(2+i)+`) td:nth-child(4)`).text().split(' (');
            KoreaName=KoreaName.slice(0,KoreaName.length-1)
            let [Main,Position] = line_main(player_html(`table.team-members-current  tbody  tr:nth-child(`+(2+i)+`) td:nth-child(5)`).text());
            let Pic;
            let Birth;
            try{
                let res = await axios('https://lol.fandom.com/wiki/'+Name);
                let res_html = cheerio.load(res.data);
                Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                Pic=Pic.slice(0,Pic.indexOf(".png")+4);
                Birth=res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
            }
            catch{
                EnName=(" ("+EnName+")").replace(" ","_");
                let res = await axios('https://lol.fandom.com/wiki/'+Name+EnName);
                let res_html = cheerio.load(res.data);
                Pic = res_html(`table.InfoboxPlayer tbody tr:nth-child(3) td div div`).children()[0].attribs.href;
                Pic=Pic.slice(0,Pic.indexOf(".png")+4);
                Birth=res_html(`table.InfoboxPlayer tbody tr:nth-child(9) td:nth-child(2)`).text().split(' (').at(0);
            }

            team2.push(
                {
                    Team:Team,
                    Name:Name,
                    KoreaName:KoreaName,
                    Main:Main,
                    Position:Position,
                    Pic:Pic,
                    Birth:Birth
                }
            )
        }
        console.log(team2_name+" finish");
        return [...team1,...team2]
    }
    const make_frame_data=async()=>{
        let data1= Thread("T1",team_url[0],"GEN",team_url[1]);
        let data2= Thread("DK",team_url[2],"DRX",team_url[3]);
        let data3= Thread("KT",team_url[4],'KDF',team_url[5]);
        let data4= Thread("HLE",team_url[6],"BRO",team_url[7]);
        let data5= Thread("NS",team_url[8],"LSB",team_url[9]);
        return Promise.all([data1,data2,data3,data4,data5]);
    }


    const [year,season]=get_season_name(season_year);
    let teams_res = await axios("https://lol.fandom.com/wiki/LCK/" + "20"+year + "_Season");
    var teams_ = cheerio.load(teams_res.data);
    let team_url = [];
    for (let i = 0; i < 10; i++) {
        let temp = teams_(`table.standings  tbody  tr:nth-child(` + (3 + i) + `) td:nth-child(2) span span:nth-child(2) a`)[0].children[0].data;
        temp = temp.replace(" ", "_")
        team_url.push(temp);
    }
    console.log(team_url);
    try {
        var datadata=await make_frame_data();
        var insert_data=[];
        insert_data.push(...datadata[0],...datadata[1],...datadata[2],...datadata[3],...datadata[4]);
        
        var connection = await mysql.createPool(
            port
        );
        try {
            const promisePool = connection.promise();
            let value=[];
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
            console.log(value)
            let sql = "INSERT INTO stack."+season+year+"_regular_player(`Name`, `KoreaName`, `Team`, `Position`, `Kill`, `Death`, `Assist`, `Win`, `Lose`, `Birth`, `Main`, `Pic`) VALUES ?";
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
            console.log('db: ', error);
        }
    } catch (err) {
        console.log(err);
    }
}

//make_Player_data("spring22");