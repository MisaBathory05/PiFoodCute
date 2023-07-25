import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './Components/JSX/LandingPage.jsx';
import Home from './Components/JSX/Home.jsx';
import { RecipeCreate } from './Components/JSX/RecipeCreate.jsx';
import RecipeDetail from './Components/JSX/RecipeDetail.jsx';
import PathRoutes from './Components/helpers';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path= {PathRoutes.LANDING} element={<LandingPage/>} />  
        <Route path= {PathRoutes.HOME} element={<Home />} />  
        <Route path= {PathRoutes.RECIPEDETAIL} element={<RecipeDetail/>}/>
        <Route path= {PathRoutes.RECIPECREATE} element={<RecipeCreate/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;