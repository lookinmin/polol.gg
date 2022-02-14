import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const Playoff = () => {
  const [pic1, setPic1] = useState("img/LCK_MARK.png");
  const [pic2, setPic2] = useState("img/LCK_MARK.png");
  const [pic3, setPic3] = useState("img/LCK_MARK.png");
  const [pic4, setPic4] = useState("img/LCK_MARK.png");
  const [pic5, setPic5] = useState("img/LCK_MARK.png");
  const [pic6, setPic6] = useState("img/LCK_MARK.png");
  var playoff = new Array();
  const [curmatch,setcurmatch]=useState(1);
  var cur=1;

  const [temp,settemp]=useState(false);

  useEffect(()=> {
    const callApi = async () =>{
      const res = await axios.get("http://localhost:3002/playoff");
      makeData(res.data.data);
    };
    const makeData = (items) => {
      cur=items.length-1;
      playoff[2] = items[items.length-1].rank3;
      playoff[3] = items[items.length-1].rank4;
      playoff[4] = items[items.length-1].rank5;
      playoff[5] = items[items.length-1].rank6;
      if(cur>2){
        var winner36;
        if(items[0].LScore>items[0].RScore)
          winner36=items[0].Lteam;
        else
          winner36=items[0].Rteam;
        if(winner36==items[2].Lteam||winner36==items[2].Rteam){
          playoff[1] = items[items.length-1].rank2;
          playoff[0] = items[items.length-1].rank1;
        }
        else{
          playoff[0] = items[items.length-1].rank2;
          playoff[1] = items[items.length-1].rank1;
        }
        
      }
      else if(cur>3){
        
      }
      
      

      const setPicture = (e) => {
        var result;
        switch (e) {
          case "T1":
            result = "img/0.PNG";
            break;
          case "DK":
            result = "img/1.PNG";
            break;
          case "GEN":
            result = "img/2.PNG";
            break;
          case "NS":
            result = "img/3.PNG";
            break;
          case "LSB":
            result = "img/4.PNG";
            break;
          case "KDF":
            result = "img/5.PNG";
            break;
          case "KT":
            result = "img/6.PNG";
            break;
          case "HLE":
            result = "img/7.PNG";
            break;
          case "BRO":
            result = "img/8.PNG";
            break;
          case "DRX":
            result = "img/9.PNG";
            break;
          default:
            break;
        }
        return result;
      };

      setPic1(setPicture(playoff[0]));
      setPic2(setPicture(playoff[1]));
      setPic3(setPicture(playoff[2]));
      setPic4(setPicture(playoff[3]));
      setPic5(setPicture(playoff[4]));
      setPic6(setPicture(playoff[5]));
    }

    callApi();
  }, []);


  return (
    <>
      <div className='PlayOFF'>
        <button onClick={()=>{settemp(!temp)}}>toggle</button>
        <div className={"playoffTeam "+(temp?"win36":"rank3")} ><img className='tImg' src={pic3}></img></div>
        <div className="playoffTeam rank6" ><img className='tImg' src={pic6}></img></div>
        <div className={"playoffTeam "+ (temp?"win236":"rank2")} ><img className='tImg' src={pic2}></img></div>
        <div className={"playoffTeam "+(temp?"win145":"rank1")} ><img className='tImg' src={pic1}></img></div>
        <div className={"playoffTeam "+(temp?"win45":"rank4")} ><img className='tImg' src={pic4}></img></div>
        <div className="playoffTeam rank5" ><img className='tImg' src={pic5}></img></div>
        <img className='trophy' src='img/trophy.png'></img>
      </div>

      <div className="underForPredict">
        <h2 id="underPolo">KILL.GG</h2>
        <div className="exp">
          <div className="space"></div>
          <div className="space1">
            <p id="explanation1">
              LCK Match History는
            </p>
            <p id="explanation2">KILL.GG</p>
          </div>
        </div>
      </div>
    </>
    
  )
}
