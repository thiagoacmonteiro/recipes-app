import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MealsPage from './pages/MealsPage';
import MealsDetails from './pages/MealsDetails';
import MealsInProgress from './pages/MealsInProgress';
import DrinksPage from './pages/DrinksPage';
import DrinksDetails from './pages/DrinksDetails';
import DrinksInProgress from './pages/DrinksInProgress';
import Explore from './pages/Explore';
import ExploreMealsIngredients from './pages/ExploreMealsIngredients';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreMealsArea from './pages/ExploreMealsArea';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MealsPage } />
      <Route exact path="/bebidas" component={ DrinksPage } />
      <Route exact path="/comidas/:id" component={ MealsDetails } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route exact path="/comidas/:id/in-progress" component={ MealsInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreMealsArea } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}
