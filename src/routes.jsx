import { Team } from "./Components/team/Team";
import { Home } from "./Components/home/Home";
import { Tournament } from "./Components/tournament/Tournament";
import { Table } from "./Components/rank/Table";
import { Cardpage } from "./Components/players/Cardpage";

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/tournament',
    component: Tournament
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