import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
 import BreedsCreate from './components/BreedsCreate'
 import Details from "./components/Details"
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
<Route exact path= "/" element={< LandingPage />}/>
<Route path = "/home" element= {<Home/>}/>
<Route path = "/dogs" element= {<BreedsCreate/>}/>
<Route path = "/details/:id" element= {<Details/>}/>
     </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
 