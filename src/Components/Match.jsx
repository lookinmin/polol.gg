import React, { useState, useEffect } from "react";
import "./CSS/Schedule.css";
import axios from "axios";

export const Match = ({date}) => {
  const [matchSchedule, setMatchSchedule] = useState(0);
  var tmp = {};
  var items = {}, exFilter = {}, TodayMatch;
  useEffect(() => {
    const apiData = async () => {
      const res = await axios.get("http://localhost:3002/data");
      setMatchSchedule(res.data);
      items = res.data;
      for(let i=0;i<45;i++){
        tmp[i] = {
          MD : items[i].month,
          DD : items[i].day,
          mat1Left : items[i].Lteam1,
          mat1Right : items[i].Rteam1,
          rate1Left : items[i].Lrate1,
          rate1Right : items[i].Rrate1,
          mat2Left : items[i].Lteam2,
          mat2Right : items[i].Rteam2,
          rate2Left : items[i].Lrate2,
          rate2Right : items[i].Rrate2

        }
      }

      for(let i = 0; i < 45; i++){
        if(tmp[i].MD*100+tmp[i].DD >= items[i].month*100+items[i].day){
          console.log(tmp[i].MD*100+tmp[i].DD);
          console.log(items[i].month*100+items[i].day);
          for(let j = i; j < i+1 ; j++){
            exFilter[j] = {
              mat1Left : tmp[j].mat1Left,
              mat1Right : tmp[j].mat1Right,
              rate1Left : tmp[j].rate1Left,
              rate1Right : tmp[j].rate1Right,
              mat2Left : tmp[j].mat2Left,
              mat2Right : tmp[j].mat2Right,
              rate2Left : tmp[j].rate2Left,
              rate2Right : tmp[j].rate2Right
            }
          }
          break;
        } 
      }


      console.log(exFilter);
    };
    apiData();

  
  }, []);

  return (
    <div>
      {

      }
      <div className="scheduleGameDiv">
        <div className="scheduleGame1">
          <div className="scheduleTime">0106 17:00</div>
          <div className="scheduleMatch">
            <div className="scheduleTeam">
              <div className="scheuleTeamImg">
                <img src="img/T1.png" />
              </div>
              <div className="scheduleTeamName">team1</div>
            </div>
            <div className="scheduleVS">VS</div>
            <div className="scheduleTeam">
              <div className="scheuleTeamImg">
                <img src="img/T1.png" />
              </div>
              <div className="scheduleTeamName">team1</div>
            </div>
          </div>
        </div>
        <div className="scheduleGame2">
          <div className="scheduleTime">0106 17:00</div>
          <div className="scheduleMatch">
            <div className="scheduleTeam">
              <div className="scheuleTeamImg">
                <img src="img/T1.png" />
              </div>
              <div className="scheduleTeamName">team1</div>
            </div>
            <div className="scheduleVS">VS</div>
            <div className="scheduleTeam">
              <div className="scheuleTeamImg">
                <img src="img/T1.png" />
              </div>
              <div className="scheduleTeamName">team1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
