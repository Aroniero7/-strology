import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';



function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    console.log("Telegram API:", tg);
    console.log("Init data unsafe:", tg.initDataUnsafe);

    if (tg.initDataUnsafe?.user) {
        console.log("User data found:", tg.initDataUnsafe.user);
        setUser(tg.initDataUnsafe.user);
    } else {
        console.log("No user data found.");
    }
}, [tg]);
 


  return (
    <div className="App">
     <Header />
     <button onClick={onToggleButton}>toogle</button>
    </div>
  );
  
}

export default App;
