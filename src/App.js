import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/Main/homePage';
import Menu from './Pages/Main/Drinks/menuList';
import MenuDetail from './Pages/Main/Drinks/menuDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
