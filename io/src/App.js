import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './home';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/Home' element={<Home/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
