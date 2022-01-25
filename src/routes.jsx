import { Team } from "./Components/Team";
import { Players } from "./Components/Players";
import { Home } from "./Components/Home";
import { Predict } from "./Components/Predict";
import { Table } from "./Components/Table";
import { Cardpage } from "./Components/Cardpage";

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