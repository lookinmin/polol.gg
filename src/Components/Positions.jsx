import React from 'react'
import './CSS/Position.css'

export const Positions = ( {choosePosition } ) => {

  const positionPic = ["allPic", "topPic", "jglPic", "midPic", "adPic", "sptPic"];

  const ChangePosition = (e) => {
    choosePosition (e.target.innerHTML)
    let classNamePic = document.querySelectorAll(".positionPicDiv :nth-child(1)");
    let classNameText = document.querySelectorAll(".positionPicDiv :nth-child(2)");

    for(let i=0;i<6;i++){
      if(classNameText[i].innerHTML === e.target.innerHTML 
        && classNamePic[i].innerHTML === e.target.innerHTML ){
        classNameText[i].className += " shadow-inset-center";
        classNamePic[i].className += " shadow-inset-center";
      }
      else{
        classNamePic[i].className = positionPic[i];
        classNameText[i].className = "";
      }
    }
  }

  return (
    <div className='position'>
      <div className='positionTitle'></div>
      <div className='positionDiv'>
        <div className='positionPicDiv btn-outline-secondary'
          onClick={ChangePosition}>
          <div className="allPic">ALL</div>
          <div>ALL</div>
        </div>
        <div className='positionPicDiv btn-outline-secondary'
          onClick={ChangePosition}>
          <div className="topPic">TOP</div>
          <div>TOP</div>
        </div>
        <div className='positionPicDiv btn-outline-secondary'
          onClick={ChangePosition}>
          <div className="jglPic">JGL</div>
          <div>JGL</div>
        </div>
        <div className='positionPicDiv btn-outline-secondary'
          onClick={ChangePosition}>
          <div className="midPic">MID</div>
          <div>MID</div>
        </div>
        <div className='positionPicDiv btn-outline-secondary'
          onClick={ChangePosition}>
          <div className="adPic">AD</div>
          <div>AD</div>
        </div>
        <div className='positionPicDiv btn-outline-secondary'
          onClick={ChangePosition}>
          <div className="sptPic">SPT</div>
          <div>SPT</div>
        </div>
      </div>
    </div>
  )
}
