import { Team } from "./Components/team/Team";
import { Home } from "./Components/home/Home";
import { Predict } from "./Components/predict/Predict";
import { Table } from "./Components/rank/Table";
import { Cardpage } from "./Components/players/Cardpage";

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/predict',
    component: Predict
  },
  {
    path: '/table',
    component: Table
  },
  {
    path: '/team',
    component: Team
  },
  {
    path: '/players',
    component: Cardpage
  },
];