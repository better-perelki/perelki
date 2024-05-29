import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchByIngredients from './pages/SearchByIngredients';
import SearchByName from './pages/SearchByName';
import AllRecipes from './pages/AllRecipes';
import ScrollToTop from './components/ScrollUp';
import RecipeDetails from './pages/RecipeDetails'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/all-recipes' exact element={<AllRecipes />} />
          <Route path='/search-by-name' exact element={<SearchByName />} />
          <Route path='/search-by-ingredients' exact element={<SearchByIngredients />} />
          <Route path='/recipe/:id' exact element={<RecipeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

