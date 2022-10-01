import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home-menu/home.js';
import Floyd from './components/home-menu/floyd.js';
import FloydMenu from './components/home-menu/floydMenu.js';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/Home' element={<Home/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/Floyd' element={<Floyd/>} />
          <Route path='/FloydMenu' element={<FloydMenu/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
