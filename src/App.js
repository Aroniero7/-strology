import './App.css';
import { useEffect } from 'react';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';
import Body from './components/Body/Body';


function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  },[])

 


  return (
    <div className="App">
      <Header />
      <Body />
     <button onClick={onToggleButton}>toogle</button>
    </div>
  );
}

export default App;
