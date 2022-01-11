import React, { useState } from 'react'
import "./CSS/teamCSS.css"

export const Team = () => {
  const [teamplayer, setTeamPlayer] = useState({
    teamname: "T1",
    top: "Zeus",
    jgl: "Oner",
    mid: "Faker",
    bot: "Gumayusi",
    spt: "Keria"
  });
  return (
    <>
      <div id="container">
        <div className='selecTeam'>
          <img onClick={(e) => {
            console.log(e.target.abbr);
          }} abbr="T1" src='https://w.namu.la/s/410f802f73066b9631013965b11badff858d95887e4f580aef9395e7c2b8e6bfbe4ce81c7b91cbea6638270abf3b604dd3ca220640c83e88b9388a59ab3bde1d952b9afa84dbe07dc131580c8efa2ee3dabce6dd2974f2bcf124ff225608846d' />
          <img src='https://w.namu.la/s/6a92cc45b0e610dec3aa434eb8441a4ac0b43d01217f969e6b05f714b393ff8a9f90491cba38a78bf6d59997eb1d0aa43885a61bc4eac16d574dd23be46ba66063427b4f04cf20fa4689db236220cae49d4e4818f1675da9c5100589b94867e46d0a7821d6b159cd20bb19888584e420' />
          <img src='https://w.namu.la/s/4d041066afe3490184a6ee556ee7ca1c5ff2431d3816a154216888a6bcda3ffaf66be18553849f8da0a8336705ab7ea4e3608dba32482cf6dc33421660b24471d73df17835d58680bed1a17940b0d208bd366b9b57eb086ac3c3ac97a8b7cec6' />
          <img src='https://w.namu.la/s/d4029c68387ff117314b9bd76560f9e005a85be9a495c7df97b5eda6a1925ff5e11992851ccc1b23cd8bc4159da76a1ef86dd34701505c0409105abe341be67e3538320d36e2006c25af1e40aa795368b34dd7527186e2a9cb9bf7ee7e26dd69' />
          <img src='https://cdn.imweb.me/thumbnail/20220104/b00a4837ceba2.png' />
          <img src='https://w.namu.la/s/3aa014e524096dbbac06e573cd45ad0b841506e4ec4cf15020f9f9d77e7edac34653e39f0086241fd4883b8e5246496d3a747a4d6325442dab4568fb95cade4d7613a947d5765b04c0f54180594eeac97198648a33d4d7c7b9c609de91bd0db5ca275e3c1e1ea8a2a5f95dcae38c8e2e' />
          <img src='https://w.namu.la/s/d3aa32a30d2fc5833195c953d1f41fa3b3027036917ceda3a5e17c7e141d563e41254cb1d2cabd5e3737b5d2bd380c2e046712eab7e88b4f1f9c9c8d90a3c789512edd8b23c57693b5bc6676756076258a6f57685c39c59b61780d7e640c5f4f' />
          <img src='https://ww.namu.la/s/67d656900db84b1f6a7ac40ed8a745c76d7fa11a15ae9987f59f420e845e98acd806d03810ac492fad1f02ae34000a6af3470d15a4c63f55d4c927e5e9a1618e25571e1c5e58dee6f3a24ce6acd21e8974651f149b7b2a85b698c79431f0a5be' />
          <img src='https://w.namu.la/s/14db720e4e095bcf0552835549e82685527034401964a61f9c2800f1385b74b898a002a931107b8bc3915fc21a7cb22c97168c80b4f504b68f337e1b12dcc0177e06bc6d83a0d32f6e73867eefbd6b3dba106806f019f9590d0758200ace13b587aaa84f7772b8c20b82e3a1fc879f55' />
          <img src='https://w.namu.la/s/893ef28e5a0405a50616cd48be2c8dd5ddd40e8be8e45eb3a8b00ac372407d6c2d6b881c7e98b340c9d89133de1a2437cf5cbaf981b21757a615990d918dc196bc76e933c63be895d14049f55d848db0934a6d88017caeb5e73c497cc18717e97320f9c931d69ae06110ceb6a4631c4c' />
        </div>
        <div className="map">
          <div className='teamname'>
            <img src='https://media.graphcms.com/iiMXVGjRRh6lhUc8Zmfy' />
          </div>
          <div className='jungle'>
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
        <table className="table table-striped teamtable">
          <thead className="table-dark tableThead">
            <tr>
              <th scope="col" >포지션</th>
              <th scope="col" >이름</th>
              <th scope="col" >Playname</th>
              <th scope="col" >승률</th>
              <th scope="col" >KDA</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}