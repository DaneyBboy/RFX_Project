import './App.css';
import { LoginProvider } from './Context/Context';
import Mainlayout from './Pages/Mainlayout';


function App() {
  return (
    <div className="App"> 
    <LoginProvider>   
      <Mainlayout /> 
      </LoginProvider>       
    </div>
  );
}

export default App;
