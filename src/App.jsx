import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';
import routes from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='tontainer'>
          <Switch>
          {routes.map(route => {
              return (
                <Route key={route.path}
                  path={route.path}
                  exact>
                  <route.component />
                </Route>
              )
            })}
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
