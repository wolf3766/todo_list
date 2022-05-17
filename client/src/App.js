import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Task from './components/Task';
import Home from './components/home';
import Navbarcomp from './components/Navbarcomp';
import {Routes,Route,BrowserRouter} from "react-router-dom"

function App() {
  return (
    
    <div className='App'>
    <Navbarcomp />

    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='task' element={<Task />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
