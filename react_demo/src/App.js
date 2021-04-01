import React, { useReducer, createContext } from "react";
import routes from "./router";
import { reducer } from "./store/reducer";
import { Route, Switch, HashRouter } from "react-router-dom";
import Menu from "./components/Menu";

export const ReducerContext = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, {
    agents: [],
  });

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div id="app">
        <div className="container">
          <HashRouter>
            <Menu />
            <div className="content">
              <Switch>
                {routes.map((route) => (
                  <Route
                    path={route.path}
                    exact
                    component={route.component}
                    key={route.name}
                  ></Route>
                ))}
              </Switch>
            </div>
          </HashRouter>
        </div>
      </div>
    </ReducerContext.Provider>
  );
}

export default App;
