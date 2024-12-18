import { useEffect } from 'react';
import './App.css';
import { LoginProvider } from './Context/Context';
import Mainlayout from './Pages/Mainlayout';


function App() {
  useEffect(() => { sessionStorage.clear();
    console.log('sessionStorage cleared upon initial render');
  }, []);
  return (
    <div className="App">  
    <LoginProvider>   
      <Mainlayout /> 
      </LoginProvider>       
    </div>
  );
}

export default App;
