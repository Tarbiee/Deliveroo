import {Route, Routes} from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
