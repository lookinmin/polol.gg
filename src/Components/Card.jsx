import './CSS/card.css';
import { useState } from 'react';

function App({ pos,backimg, cardset }) {
  const [deg, setdeg] = useState([0, 0,0,0]);
  const change = () => {
    if (deg[0] == 0)
      setdeg([6, 3,-3,-6]);
    else
      setdeg([0, 0,0,0]);
  }

  return (
    <>
      <div style={pos} onMouseOut={change} onMouseOver={change} className={" cardpack "} >
        <div id={backimg} style={{ transform: "rotateZ(" + (backimg=="LCK"?(cardset[0] !="folded"?deg[0]:"0"):(cardset[0] =="folded"?deg[0]:"0")) + "deg)" }} className={backimg+" Pcard"}></div>
        <div id={backimg} style={{ transform: "rotateZ(" + (backimg=="LCK"?(cardset[0] !="folded"?deg[1]:"0"):(cardset[0] =="folded"?deg[1]:"0")) + "deg)" }} className={backimg+" Pcard"}></div>
        <div id={backimg} className={backimg+" Pcard"}></div>
        <div id={backimg} style={{ transform: "rotateZ(" + (backimg=="LCK"?(cardset[0] !="folded"?deg[2]:"0"):(cardset[0] =="folded"?deg[2]:"0")) + "deg)" }} className={backimg+" Pcard"}></div>
        <div id={backimg} style={{ transform: "rotateZ(" + (backimg=="LCK"?(cardset[0] !="folded"?deg[3]:"0"):(cardset[0] =="folded"?deg[3]:"0")) + "deg)" }} className={backimg+" Pcard"}></div>
      </div>
    </>
  );
}

export default App;
