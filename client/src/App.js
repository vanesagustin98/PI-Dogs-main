import './App.css';
import Nav from './Components/Nav/Nav';
import {Detail, Form, Home, Landing, Error} from './views'
import { Route,Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {!location.pathname.startsWith('/detail') && location.pathname !== '/' && <Nav/>}
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/form' element={<Form/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
