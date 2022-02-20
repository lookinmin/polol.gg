import React from 'react'

export const manage = () => {
  return (
  <div className='managePage'>
    <h1>관리자 페이지</h1>
    <div className='manageIn'>
      <div className="MMLeft">
        <div className='manage'>
          <h2>현재 정규시즌 크롤링 URL 입력</h2>
          <form>
            <input type="text" name="SURL" size="60"></input>
            <input type="submit" value="Submit_NowSeason"></input>
          </form>
        </div>

        <div className='manage'>
          <h2>현재 플레이오프 크롤링 URL 입력</h2>
          <form>
            <input type="text" name="PURL" size="60"></input>
            <input type="submit" value="Submit_PlayOff"></input>
          </form>
        </div>

        <div className='manage'>
          <h2>현재 시즌 플레이어 크롤링 URL 입력</h2>
          <form>
            <input type="text" name="PLURL" size="60"></input>
            <input type="submit" value="Submit_Player"></input>
          </form>
        </div>

        <div className='manage'>
          <h2>현재 시즌 팀 크롤링 URL 입력</h2>
          <form>
            <input type="text" name="TURL" size="60"></input>
            <input type="submit" value="Submit_Team"></input>
          </form>
        </div>
      </div>

      <div className="MMRight">
        <div className='manage'>
          <h2>Coach 정보 입력</h2>
          <form className='manageCoach'>
            <div className='CC1'>
              <h4>Name : </h4>
              <input type="text" name="CN" size="20"></input>
            </div>
            
            <div className='CC1'>
              <h4>KName : </h4>
              <input type="text" name="CKN" size="20"></input>
            </div>

            <div className='CC1'>
              <h4>Team : </h4>
              <input type="text" name="CT" size="20"></input>
            </div>

            <div className='CC1'>
              <h4>Role : </h4>
              <input type="text" name="CR" size="20"></input>
            </div>

            <div className='CC1'>
              <h4>Birth : </h4>
              <input type="text" name="CB" size="20"></input>
            </div>

            <input type="submit" value="Submit_Coach"></input>
          </form>
        </div>
      </div>
      
    </div>
    

    
  </div>
  )
}
