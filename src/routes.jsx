import { Team } from "./Components/team/Team";
import { Home } from "./Components/home/Home";
import { Playoff } from "./Components/playoff/Playoff";
import { Table } from "./Components/rank/Table";
import { Cardpage } from "./Components/players/Cardpage";
import { manage } from "./Components/manage";

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/playoff',
    component: Playoff
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
  {
    path: '/manage',
    component: manage
  }
  
];