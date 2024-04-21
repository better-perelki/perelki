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
          <Route path='/' exact component={Home} />
          <Route path='/search-by-name' exact component={SearchByName} />
          <Route path='/search-by-ingredients' exact component={SearchByIngredients} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
