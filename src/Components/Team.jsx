import React, { useState } from 'react'
import "./CSS/teamCSS.css"
import { CardFlip } from './CardFlip';

export const Team = () => {
  const [teamplayer, setTeamPlayer] = useState({
    teamname: "T1",
    top: "Zeus",
    jgl: "Oner",
    mid: "Faker",
    bot: "Gumayusi",
    spt: "Keria",

  });
  const teams=["T1","AF","DRX","DWG","FB","GENG","HLE","KT","LSB","NS"]
  const teamicon=teams.map((teamname)=>{
    const teamaddres="img/"+teamname+".png";
    return <img onClick={(e) => {
      console.log(e.target.id);
    }} key={teamname} src={teamaddres} id={teamname}/>
  })
  
  return (
    <>
      <div id="container">
        <div className='selecTeam'>
          {teamicon}
        </div>
        <div className="map">
          <div className='teamname'>
            <img src='https://media.graphcms.com/iiMXVGjRRh6lhUc8Zmfy' />
          </div>
          <div className='jungle'>
            <img className='playerphoto' src='https://w.namu.la/s/b1c1e0c446e47b55176fa6401a18e93acf3776c434adc49ba768cd4292658d3a36f7252008d61e0382fc17f7126733a06432461d0b70caa298a4b21f312f6116e7eaadd5df19c8b91a9404bdb08224676452e3e0a467153d61e98be19bd24971'/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M81.82 0a124.75 124.75 0 00-27.27 36.36 160.53 160.53 0 014.54 22.73S63.6 50 63.64 50c0-13.25 18.18-50 18.18-50zM31.82 59.09c-5.54-14.94-12.45-20-27.27-27.27C18.07 43 22.73 72.73 22.73 72.73S39.16 79.68 50 100C66 63 38.2 23.47 18.18 0c9.34 23.47 13.64 34 13.64 59.09zM63.64 72.73v13.63l18.18-18.18c0-15.1.11-29.71 13.63-40.91C77 36.33 63.64 62.09 63.64 72.73z"></path>
            </svg>
            <p className='playername'>
              {teamplayer.jgl}
            </p>
          </div>
          <div className='ADC'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M11.11 100l16.67-16.67h55.55V27.78L100 11.11V100z"></path>
              <path fillOpacity="0.3" d="M38.94 38.94v22.24h22.24V38.94z"></path>
              <path fillOpacity="0.3" d="M0 0v88.89l16.67-16.67V16.67h55.55L88.89 0z"></path>
            </svg>
            <p className='playername'>
              {teamplayer.bot}
            </p>
          </div>
          <div className='mid'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M16.67 100L100 16.67V0H83.33L0 83.33V100z"></path>
              <path fillOpacity="0.3" d="M83.33 50L100 33.33V100H33.33L50 83.33h33.33zM66.67 0L50 16.67H16.67V50L0 66.67V0z"></path>
            </svg>
            <p className='playername'>
              {teamplayer.mid}
            </p>
          </div>
          <div className='top'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path fillOpacity="0.3" d="M11.11 100l16.67-16.67h55.55V27.78L100 11.11V100z"></path>
              <path fillOpacity="0.3" d="M38.94 38.94v22.24h22.24V38.94z"></path>
              <path d="M0 0v88.89l16.67-16.67V16.67h55.55L88.89 0z"></path>
            </svg>
            <p className='playername'>
              {teamplayer.top}
            </p>
          </div>
          <div className='supporter'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M90.4 2.11c0 27.3-25.4 36.63-25.4 36.63L60.94 61a8.39 8.39 0 00-.48 2.39 6.95 6.95 0 0013.89 0 6.7 6.7 0 00-5.75-6.7c6.71-11.5 16.29-6 16.29-6 1.43-1.44 2.63-2.88 3.83-4.07l-7.19-2.88h9.34a38.5 38.5 0 005.75-11.25L87 28.69h10.3a33 33 0 00-6.9-26.58M35.32 38.74S9.93 29.41 9.93 2.11c0 0-9.82 10.77-7.42 26.1h10.3L3.23 32a41.09 41.09 0 004.07 8.9h11l-8.61 3.59a39.83 39.83 0 005.27 6s9.58-5.51 16.29 6a6.7 6.7 0 00-5.75 6.7 6.95 6.95 0 1013.41-2.39zM45.14 22.7l2.63-6.7h4.79l2.63 6.94-5 13.89zm-1-16l-7 16 10.15 25.38v23.71l-5 16 5 10H53l5-10-5-16V48.08L63.1 22.7l-7-16z"></path>
            </svg>
            <p className='playername'>
              {teamplayer.spt}
            </p>
          </div>
        </div>
        <div className='detailbox' >
          <CardFlip />
          <CardFlip />
          <CardFlip />
          <CardFlip />
          <CardFlip />
        </div>

      </div>
    </>
  )
}