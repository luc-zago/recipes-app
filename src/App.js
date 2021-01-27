import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipeContext from './context/RecipeContext';
import { InitialExplore, Explore, ExploreIngredients } from './pages';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const contextValue = {};
  return (
    // <div className="meals">
    <RecipeContext.Provider value={ contextValue }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/explorar" component={ InitialExplore } />
          <Route exact path="/explorar/comidas" component={ Explore } />
          <Route exact path="/explorar/bebidas" component={ Explore } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreIngredients }
          />
        </Switch>
      </BrowserRouter>
    </RecipeContext.Provider>
  /* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div> */
  );
}

export default App;
