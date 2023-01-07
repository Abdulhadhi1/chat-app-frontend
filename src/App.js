
import './App.css';
import Login from './Login';
import {useStateValue} from "./StateProvider"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Chat from './Chat';
import Sidebar from './Sidebar';




function App() {

const [{user}] = useStateValue();



  return (
    <div className="app">
  {!user ?
   <Login/>:
   <div className="app_body">
    <Router>
      <Sidebar />
      <Routes>
        <Route path='/' element ={<Chat />} />
        <Route path='/rooms/:roomId' element ={<Chat />} />
      
      </Routes>
    </Router>
   </div>
  }
    </div>
  );
}

export default App;
