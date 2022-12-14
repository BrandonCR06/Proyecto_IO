import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home-menu/home.js';
import {Floyd,FloydW} from './components/home-menu/floyd.js';
import FloydMenu from './components/home-menu/floydMenu.js';
import Knapsack from './components/algos/Knapsack.js';
import Equipo from './components/algos/reemplazo.js';
import {Series, Floydw} from './components/algos/Series'
import Matrix from './components/algos/Matrix'
import Arbol from './components/algos/arboles.js';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/Home' element={<Home/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/Floyd' element={<Floyd/>} />
          <Route path='/FloydMenu' element={<FloydMenu/>} />
          <Route path='/Knapsack' element={<Knapsack/>} />
          <Route path='/Equipo' element={<Equipo/>} />
          <Route path='/Matrix' element={<Matrix/>} />
          <Route path='/Series' element={<Series/>} />
          <Route path='/Arbol' element={<Arbol/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
