import { useState, useRef, useEffect } from "react";
import Card from "./Card";
import { PlayerCard } from "./PlayerCard";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { Seasons } from "../rank/Seasons";

const init_pos_const = [
  { transform: "translate(0%,0%)" },
  { transform: "translate(0%,0%)" },
  { transform: "translate(0%,0%)" },
  { transform: "translate(0%,0%)" },
  { transform: "translate(0%,0%)" },
  { transform: "translate(0%,0%)" },
];
const old_pos_coonst = [
  { transform: "translate(-200%,0%) ", transitionDelay: "0s" },
  { transform: "translate(-150%,-120%)", transitionDelay: "0.25s" },
  { transform: "translate(0%,-140%)", transitionDelay: "0.5s" },
  { transform: "translate(150%,-120%)", transitionDelay: "0.75s" },
  { transform: "translate(200%,0%)", transitionDelay: "1s" },
  { transform: "translate(0%,0%)", transitionDelay: "0s" },
];
const init_move_const = [
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
  {
    transform: "translate(0%,0%) scale(0.8)",
    transition: "1s",
    visibility: "hidden",
  },
];

export const Cardpage = () => {
  const [cardset, setcardset] = useState(["init"]);
  const [curline, setcurline] = useState(0);
  const [pos, setpos] = useState(init_pos_const);
  const [move, setmove] = useState(init_move_const);
  const [cardpackpos, setcardpackpos] = useState([{}, {}]);
  const [loading, setloading] = useState(true);
  const ref = useRef(null);
  const players = useRef([]);
  const [season, setSeason] = useState("");
  useEffect(() => {


    const makeData = (items) => {
      var TopInfo = [];
      var UnderInfo = [];
      for (let i = 0; i < items.Data.length; i++) {
        TopInfo[i] = {
          Team: items.Data[i].Team,
          Name: items.Data[i].Name,
          POS: items.Data[i].Position,
        };
        UnderInfo[i] = {
          win: parseInt(items.Data[i].Win) ,
          lose: parseInt(items.Data[i].Lose),
          kill: parseInt(items.Data[i].Kill),
          death: parseInt(items.Data[i].Death),
          assist: parseInt(items.Data[i].Assist),
        };
      }
      var KDAs = [];
      var playerPic = [];

      var TOPp = new Array();
      var JGp = new Array();
      var MIDp = new Array();
      var ADCp = new Array();
      var SPTp = new Array();

      const setPicture = (e) => {
        var reesult;
        switch (e) {
          case "T1":
            reesult = "img/0.PNG";
            break;
          case "DK":
            reesult = "img/1.PNG";
            break;
          case "GEN":
            reesult = "img/2.PNG";
            break;
          case "NS":
            reesult = "img/3.PNG";
            break;
          case "LSB":
            reesult = "img/4.PNG";
            break;
          case "KDF":
            reesult = "img/5.PNG";
            break;
          case "KT":
            reesult = "img/6.PNG";
            break;
          case "HLE":
            reesult = "img/7.PNG";
            break;
          case "BRO":
            reesult = "img/8.PNG";
            break;
          case "DRX":
            reesult = "img/9.PNG";
            break;
          default:
            break;
        }
        return reesult;
      };

      const positionPic = (e) => {
        var result;
        switch (e) {
          case "TOP":
            result = "img/positions/TOP.png";
            break;
          case "JG":
            result = "img/positions/JGL.png";
            break;
          case "MID":
            result = "img/positions/MID.png";
            break;
          case "ADC":
            result = "img/positions/AD.png";
            break;
          case "SPT":
            result = "img/positions/SPT.png";
            break;
        }
        return result;
      };

      for (let i = 0; i < items.Data.length; i++) {
        playerPic[i] = items.Data[i].Pic;
        if (UnderInfo[i].death == 0 || UnderInfo[i].death == null) {
          KDAs[i] = 0;
          UnderInfo[i].win = 0;
          UnderInfo[i].lose = 0;
          UnderInfo[i].kill = 0;
          UnderInfo[i].death = 0;
          UnderInfo[i].assist = 0;
        } else
          KDAs[i] = (
            (UnderInfo[i].kill + UnderInfo[i].assist) /
            UnderInfo[i].death
          );

        switch (TopInfo[i].POS) {
          case "TOP":
            TOPp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist,
            });
            break;
          case "JG":
            JGp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist,
            });
            break;

          case "MID":
            MIDp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist,
            });
            break;

          case "ADC":
            ADCp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist,
            });
            break;

          case "SPT":
            SPTp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist,
            });
            break;
        }
      }

      TOPp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      JGp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      MIDp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      ADCp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      SPTp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      for (let i = 0; i < TOPp.length; i++) {
        TOPp[i].KDA = TOPp[i].KDA.toFixed(2);
      }
      for (let i = 0; i < JGp.length; i++) {
        JGp[i].KDA = JGp[i].KDA.toFixed(2);
      }
      for (let i = 0; i < MIDp.length; i++) {
        MIDp[i].KDA = MIDp[i].KDA.toFixed(2);
      }
      for (let i = 0; i < ADCp.length; i++) {
        ADCp[i].KDA = ADCp[i].KDA.toFixed(2);
      }
      for (let i = 0; i < SPTp.length; i++) {
        SPTp[i].KDA = SPTp[i].KDA.toFixed(2);
      }
      players.current = [TOPp, JGp, MIDp, ADCp, SPTp];
      
    };
    // callApi();
    async function postData() {
        try {
          await axios
            .post("http://localhost:3002/players", {
              url: season,
            })
            .then((res) => {
                makeData(res.data);
                setloading(false);
            });
        } catch (error) {
          //응답 실패
        }
      }
      postData();
  }, [season]);

  const initcard = (e) => {
    if (cardset[0] == "init") {
      setpos(old_pos_coonst);
      setcardset(["folded"]);
    }
    if (cardset[0] == "folded") {
      
      var line;
      let playercount;
      let row = 0;
      switch (e.target.id) {
        case "TOP":
          setcurline(0);
          playercount = players.current[0].length;
          line = 0;
          break;
        case "JGL":
          setcurline(1);
          playercount = players.current[1].length;
          line = 1;
          break;
        case "MID":
          setcurline(2);
          playercount = players.current[2].length;
          line = 2;
          break;
        case "AD":
          setcurline(3);
          playercount = players.current[3].length;
          line = 3;
          break;
        case "SPT":
          setcurline(4);
          playercount = players.current[4].length;
          line = 4;
          break;
      }
      var old_move_const = [];
      row = Math.ceil(playercount / 4);
      for (let i = 0; i < row; i++) {
        let y = row * 120 - i * 120;
        for (let j = 0; j < 4; j++) {
          let x = -155 + j * 175;
          let delay = i + 0.25 * j;
          old_move_const.push({
            transform: "translate(" + x + "%,-" + y + "%)",
            transitionDelay: delay + "s",
          });
        }
      }
      var tp = [...init_pos_const];
      tp[line] = { transform: "translate(-200%,0%)", transitionDelay: "0s" };
      setpos(tp);
      setcardpackpos([
        { height: 24 * (row + 1) + "vw" },
        { transitionDelay: "0s", transform: "translate(97%,0%)" },
      ]);
      setTimeout(() => {
        setmove(old_move_const);
      }, 1000);
      setcardset(["unfolded"]);
    }
    if (cardset[0] == "unfolded") {
      setmove(init_move_const);
      setTimeout(() => {
        setcardpackpos([{}, {}]);
        setpos(init_pos_const);
        setTimeout(() => {
          setpos(old_pos_coonst);
        }, 1000);
        setcardset(["folded"]);
      }, 1000);
    }
  };

  const nowSeason = (season) => {
      setSeason(season);
      setcardset([["init"]]);
      setpos(init_pos_const);
      setmove(init_move_const);
      setTimeout(() => {
        setcardpackpos([{}, {}]);
      }, 1000);
      
  }

  return (
    <>
      {loading ? (
        <div className="POloading">
          <Seasons nowSeason={nowSeason}/>
          <div className="center">
            <PulseLoader size={"5vw"} margin={"5vw"} color={"#c6c6ca"} />
          </div>
        </div>
      ) : (
        <div>
          
          
          <div style={cardpackpos[0]} className="box boxsizeA">
          <div className="dropdown_player">
          <Seasons nowSeason={nowSeason}/>
          </div>
            <div
              ref={ref}
              style={cardpackpos[1]}
              onClick={initcard}
              className="cardbox"
            >
              <Card pos={pos[0]} backimg={"TOP"} cardset={cardset} key={1} />
              <Card pos={pos[1]} backimg={"JGL"} cardset={cardset} key={2} />
              <Card pos={pos[2]} backimg={"MID"} cardset={cardset} key={3} />
              <Card pos={pos[3]} backimg={"AD"} cardset={cardset} key={4} />
              <Card pos={pos[4]} backimg={"SPT"} cardset={cardset} key={5} />
              <Card pos={pos[5]} backimg={"LCK"} cardset={cardset} key={6} />
              <PlayerCard
                position={players.current[curline]}
                setmove={setmove}
                move={move}
              />
            </div>
          </div>
        </div>
      )}

      <div className="underForPredict">
        <h2 id="underPolo">KILL.GG</h2>
        <div className="exp">
          <div className="space"></div>
          <div className="space1">
            <p id="explanation1">LCK Match History는</p>
            <p id="explanation2">KILL.GG</p>
          </div>
        </div>
      </div>
    </>
  );
};
