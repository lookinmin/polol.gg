import React, { useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CSS/MyCalendar.css'

export default function Toolbar(props) {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <div>
          <button type="button" onClick={navigate.bind(null, 'PREV')}>
            &#60;
          </button>
        </div>
        <div className="rbc-toolbar-label">
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        </div>
        <div>
          <button type="button" onClick={navigate.bind(null, 'NEXT')}>
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
}

const weekend = () => {
  let sun = document.querySelector('.rbc-row :nth-child(1)');
  if(sun !== undefined){
    sun.style.color = "red"
  }
  let sat = document.querySelector('.rbc-row :nth-child(7)');
  if(sat !== undefined){
    sat.style.color = "blue"
  }
}

const eventStyleGetter = () => {  
  weekend();
  var style = {
    backgroundColor: "#d3d7f0",
    borderRadius: '5px',
    opacity: 0.8,
    color: 'black',
    display: 'block',
    height: '20px',
    fontSize: '10px',
    fontWeight: "bolder",
    textAlign: "center"
  };
  return {
    style: style
  };

}

const handleSelectEvent = (event,target) => {
  console.log(event.title);
}

export const MyCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

  const myEventsList = [
    {
      start: new Date(), end: new Date(),
      title: "T1 VS 젠지 ",
    },
    {
      start: new Date("2022-1-19"), end: new Date("2022-1-19"),
      title: "KT VS DRX"
    },
    {
      start: new Date("2022-1-19"), end: new Date("2022-1-19"),
      title: "KT2 VS DRX2"
    }
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        components={{
          toolbar: Toolbar,
        }}
        views={['month']}
        eventPropGetter={(eventStyleGetter)}
        onSelectEvent={handleSelectEvent} 
        style={{ height: '65vh', maxWidth: "50vw", margin: "0px auto" }}
      />
    </div>
  )
}
