import React from 'react'
import './CSS/Position.css'

export const Positions = ( {choosePosition } ) => {

  const ChangePosition = (e) => {
    choosePosition (e.target.innerHTML)
    let classNamePic = document.querySelectorAll(".positionPicDiv");

    for(let i=0;i<6;i++){
      if(classNamePic[i].firstChild.innerHTML === e.target.innerHTML ){
        classNamePic[i].className += " shadow-inset-center";
      }
      else{
        classNamePic[i].className = 'positionPicDiv';
      }
    }
  }

  return (
    <div className='position'>
      <div className='positionTitle'></div>
      <div className='positionDiv'>
        <div className='positionPicDiv'
          onClick={ChangePosition}>
          <div className="allPic">ALL</div>
        </div>
        <div className='positionPicDiv'
          onClick={ChangePosition}>
          <div className="topPic">TOP</div>
        </div>
        <div className='positionPicDiv'
          onClick={ChangePosition}>
          <div className="jglPic">JGL</div>
        </div>
        <div className='positionPicDiv'
          onClick={ChangePosition}>
          <div className="midPic">MID</div>
        </div>
        <div className='positionPicDiv'
          onClick={ChangePosition}>
          <div className="adPic">AD</div>
        </div>
        <div className='positionPicDiv'
          onClick={ChangePosition}>
          <div className="sptPic">SPT</div>
        </div>
      </div>
    </div>
  )
}
