import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchByIngredients from './pages/SearchByIngredients';
import SearchByName from './pages/SearchByName';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/search-by-name' exact element={<SearchByName />} />
          <Route path='/search-by-ingredients' exact element={<SearchByIngredients />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

