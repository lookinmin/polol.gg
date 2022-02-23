import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./Components/Header";
import routes from "./routes";
import React, { useState, useEffect } from "react";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    if(window.innerWidth >= 950){
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    else{
      setWindowSize({
        width: 950,
        height: window.innerHeight,
      });
    }

  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <Router>
      <div className="App" width={windowSize.width}>
        <Header />
        <div className="tontainer">
          <Switch>
            {routes.map((route) => {
              return (
                <Route key={route.path} path={route.path} exact>
                  <route.component />
                </Route>
              );
            })}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
