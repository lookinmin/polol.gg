import React, { useState } from 'react'
import axios from "axios";

export const Manage = () => {
  const [newDBName, setNewDBName] = useState('');
  const [playoffUrl, setPlayoffUrl] = useState('');
  const [playoffPlayer, setPlayoffPlayer] = useState('');
  const [playoffTeam, setPlayoffTeam] = useState('');


  const [coachName, setCoachName] = useState('');
  const [coachKName, setCoachKName] = useState('');
  const [coachTeam, setCoachTeam] = useState('');
  const [coachRole, setCoachRole] = useState('');
  const [coachBirth, setCoachBirth] = useState('');
  const [coachUrl, setCoachUrl] = useState('');
  const [deleteCoach, setDeleteCoach] = useState('');

  const makeNewDB = (e) => {
    setNewDBName(e.target.value)
  }

  const PlayOff = (e) => {
    setPlayoffUrl(e.target.value)
  }
  const POPlayer = (e) => {
    setPlayoffPlayer(e.target.value)
  }

  const POTeam = (e) => {
    setPlayoffTeam(e.target.value)
  }

  const makeNewDBBtnClick = () => {
    async function postData() {
      try {
        await axios.post('http://localhost:3002/manage',{
            data: newDBName,
            case: 1
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  };

  const playoffBtnClick = () => {
    async function postData() {
      try {
        await axios.post('http://localhost:3002/manage',{
            data: playoffUrl,
            case: 5
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  };

  const POPlayerClick = () => {
    async function postData() {
      try {
        await axios.post('http://localhost:3002/manage',{
            data: playoffPlayer,
            case: 6
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  }

  const POTeamClick = () => {
    async function postData() {
      try {
        await axios.post('http://localhost:3002/manage',{
            data: playoffTeam,
            case: 7
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  }

  const submitCoachName = (e) => {
    setCoachName(e.target.value);
  }
  
  const submitCoachKName = (e) => {
    setCoachKName(e.target.value);
  }

  const submitCoachTeam = (e) => {
    setCoachTeam(e.target.value);
  }

  const submitCoachRole = (e) => {
    setCoachRole(e.target.value);
  }

  const submitCoachBirth = (e) => {
    setCoachBirth(e.target.value);
  }

  const submitCoachUrl = (e) => {
    setCoachUrl(e.target.value);
  }

  const addNewCoach = () => {
    async function postData() {
      try {
        await axios.post('http://localhost:3002/manage',{
          data:{
            Name: coachName,
            KName: coachKName,
            Team: coachTeam,
            Role: coachRole,
            Birth: coachBirth,
            Url : coachUrl
          },
          case: 2
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  }

  const DeleteCoach = (e) => {
    setDeleteCoach(e.target.value);
  }
  
  const CoachDelete = () => {
    async function postData() {
      try {
        await axios.post('http://localhost:3002/manage',{
          data:{
            Name: deleteCoach,
          },
          case: 3
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  }

  return (
    <div className="managePage">
      <h1>관리자 페이지</h1>
      <div className="manageIn">
        <div className="MMLeft">
          <form className="manage">
            <h2>새 시즌 시작 DB Name</h2>
            <p> 계절 + 년도 ex)spring22</p>
            <div>
              <input
                type="text"
                name="DBName"
                size="60"
                className="makeNewDB"
                onChange={makeNewDB}
              />
              <button onClick={makeNewDBBtnClick}>
                Submit NewDB
              </button>
            </div>
          </form>

          <div className="manage">
            <h2>현재 플레이오프 시즌 크롤링 URL 입력</h2>
            <p>gol.gg 입력 : https://gol.gg/tournament/tournament-matchlist/LCK%20Summer%20Playoffs%202021/</p>
            <form>
              <input type="text" name="SURL" size="60" className="PlayOff" onChange={PlayOff}></input>
              <button onClick={playoffBtnClick}>Submit PlayOff</button>
            </form>
          </div>

          <div className="manage">
            <h2>플레이오프 시작시, 플레이어 URL 입력</h2>
            <p>lol.fandom 입력</p>
            <form>
              <input type="text" name="PLURL" size="60" className="POPlayer" onChange={POPlayer}></input>
              <button onClick={POPlayerClick}>Submit Player</button>
            </form>
          </div>

          
          <div className="manage">
            <h2>플레이오프 시작시, 팀 URL 입력</h2>
            <p>lol.fandom 입력</p>
            <form>
              <input type="text" name="PLURL" size="60" className="POTeam" onChange={POTeam}></input>
              <button onClick={POTeamClick}>Submit Team</button>
            </form>
          </div>
        </div>

        <div className="MMRight">
          <div className="manage">
            <h2>Coach 정보 입력</h2>
            <form className="manageCoach">
              <div className="CC1">
                <h4>Name : </h4>
                <input type="text" name="CN" size="20" onChange={submitCoachName}></input>
              </div>

              <div className="CC1">
                <h4>KName : </h4>
                <input type="text" name="CKN" size="20" onChange={submitCoachKName}></input>
              </div>

              <div className="CC1">
                <h4>Team : </h4>
                <input type="text" name="CT" size="20" onChange={submitCoachTeam}></input>
              </div>

              <div className="CC1">
                <h4>Role : </h4>
                <input type="text" name="CR" size="20" onChange={submitCoachRole}></input>
              </div>

              <div className="CC1">
                <h4>Birth : </h4>
                <input type="text" name="CB" size="20" onChange={submitCoachBirth}></input>
              </div>

              <div className="CC1">
                <h4>Pic : </h4>
                <input type="text" name="CB" size="30" onChange={submitCoachUrl}></input>
              </div>

              <button value="Submit_Coach" onClick={addNewCoach}>Submit Coach</button>
            </form>
          </div>

          <div className="manage">
            <h2>Coach 정보 삭제</h2>
            <form className="manageCoach">
              <div className="CC1">
                <h4>Name : </h4>
                <input type="text" name="CN" size="20" onChange={DeleteCoach}></input>
              </div>

              <button value="Delete_Coach" onClick={CoachDelete}>Delete Coach</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
