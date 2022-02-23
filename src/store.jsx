import {createStore} from "redux";

export default createStore((state, action) => {
  var User =  {
    title : "",
    url : ""
  }
  if(state === undefined){
    User.title = "국내 코로나";
    User.url = "https://api.covid19api.com/total/country/kr"
  }
  if(action.type === "KOREA" ){
    console.log("korea dispatch");
    User.title = "국내 코로나";
    User.url = "https://api.covid19api.com/total/country/kr"
  }
  if(action.type === "US"){
    console.log("us dispatch");
    User.title = "미국 코로나";
    User.url = "https://api.covid19api.com/total/country/us"
  }
  return User;
})