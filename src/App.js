import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import BusPassDetail from './component/BusPassDetail';
import Appbar from './component/Appbar';
import BusPassForm from './component/BusPassForm';
import BusPassList from './component/BusPassList';
// import Home from './component/Home';
import SignUp from './component/Signup';
import Login from './component/Login';






const App = () => { 
  

  return (
    <div className="app">
        <Router>
          <Appbar/>
      <Routes>
        <Route path="/busPass/:id" element={<BusPassDetail/>}/>
        <Route path="/form" element={<BusPassForm/>}/> 
        <Route path="/list" element={<BusPassList/>}/> 
        {/* <Route path="/home" element={<Home/>}/>  */}
        <Route path="/signup" element={<SignUp/>}/> 
        <Route path="/login" element={<Login/>}/> 
      




      </Routes>

    </Router>
    
    </div>
  );
}

export default App;