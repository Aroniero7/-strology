import './App.css';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import React, { useEffect, useState } from 'react'; 

  

function App() {  
  const { onToggleButton, tg } = useTelegram();  
  const [step, setStep] = useState(0);  
  const [userName, setUserName] = useState('');  
  const [formData, setFormData] = useState({});  

  useEffect(() => {  
    tg.ready();  
  }, []);  

  const handleStart = () => {  
    setUserName(userName);  
    setStep(1);  
  };  

  const handleNext = (data) => {  
    setFormData((prev) => ({ ...prev, ...data }));  
    setStep((prev) => prev + 1);  
  };  

  return (  
    <div className="App">  
      <Header />  
      <Body   
        step={step}   
        userName={userName}  
        handleStart={handleStart}  
        handleNext={handleNext}  
        formData={formData}  
      />  
  
    </div>  
  );  
}  

export default App;  