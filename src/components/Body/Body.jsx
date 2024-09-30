import { useTelegram } from '../hooks/useTelegram';  
import './Body.css';  
import React, { useState } from 'react';  

const Body = ({ step, userName, handleStart, handleNext, formData }) => {  
  const { user } = useTelegram();  
  const [hours, setHours] = useState('');   
  const [minutes, setMinutes] = useState('');   
  const [day, setDay] = useState('');   
  const [month, setMonth] = useState('');   
  const [year, setYear] = useState('');   
  const [placeOfBirth, setPlaceOfBirth] = useState('');   
  const [username, setUsername] = useState('');  
  const [unknownTime, setUnknownTime] = useState(false); 

  const renderStep = () => {  
    switch (step) {  
      case 0:  
        return (  
          <div className='body'>  
            <h2 className={'username'}>  
              Давай знакомится,<br />  
              {user?.username || user?.first_name || userName || 'Неизвестный пользователь'}!  
            </h2>  
            <p>  
              Ответь на 5 простых вопросов. <br />  
              Это поможет нам узнать тебя получше.  
            </p>  
            <button onClick={handleStart} className='button'>Начать</button>  
          </div>  
        );  
  
      case 1:  
        return (  
          <div className='body'>  
            <h2>Время рождения</h2>  
            <span>Время рождения нужно для определения вашего солнечного знака.</span>  
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  
              <label style={{ marginRight: '10px' }}>Время:</label>  
              <select value={hours} onChange={(e) => { setHours(e.target.value); setUnknownTime(false); }} style={{ width: '60px', marginRight: '5px' }}>  
                {[...Array(24).keys()].map((hour) => (  
                  <option key={hour} value={hour.toString().padStart(2, '0')}>  
                    {hour.toString().padStart(2, '0')}  
                  </option>  
                ))}  
              </select>  
              <span>:</span>  
              <select value={minutes} onChange={(e) => { setMinutes(e.target.value); setUnknownTime(false); }} style={{ width: '60px', marginLeft: '5px' }}>  
                {[...Array(60).keys()].map((minute) => (  
                  <option key={minute} value={minute.toString().padStart(2, '0')}>  
                    {minute.toString().padStart(2, '0')}  
                  </option>  
                ))}  
              </select>  
            </div>  
            <div style={{ marginTop: '10px' }}>  
              <button  
                onClick={() => {  
                  setUnknownTime(true); 
                  handleNext({ hours: '', minutes: '' }); 
                }}  
                className='button'   
                style={{ margin: 'auto', backgroundColor: unknownTime ? 'lightcoral' : 'initial' }} 
              >  
                Я не знаю времени  
              </button>  
            </div> 
            <button onClick={() => handleNext({ hours, minutes })} className='button'>Далее</button>  

  
          </div>    
        );  
  
      case 2:  
        return (  
          <div className='body'>  
          <h2>Дата рождения</h2>   
          <span>Дата рождения нужна для определения вашего зодиакального знака.</span>   
          <br />  
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
            <div>  
              <input  
                type="number"  
                min="1"  
                max="31"  
                value={day}  
                onChange={(e) => setDay(e.target.value)}  
                placeholder="День" 
              />  
            </div>  
            <div style={{ marginLeft: '10px' }}>  
              <input  
                type="number"  
                min="1"  
                max="12"  
                value={month}  
                onChange={(e) => setMonth(e.target.value)}  
                placeholder="Месяц" 
              />  
            </div>  
            <div style={{ marginLeft: '10px' }}>  
              <input  
                type="number"  
                value={year}  
                onChange={(e) => setYear(e.target.value)}  
                placeholder="Год" 
              />  
            </div>  
          </div>  
          <button onClick={() => handleNext({ day, month, year })} className='button'>Далее</button>  
        </div>  
        );  
  
      case 3:  
        return (  
          <div className='body'>  
            <h2>Место рождения</h2>  
            <br />  
            <span>Указание места рождения (страна и город) поможет определить положение планет, Луны и звёзд.</span><br />   
            <input  
              type="text"  
              placeholder="Страна, город"  
              value={placeOfBirth}  
              onChange={(e) => setPlaceOfBirth(e.target.value)}  
            />  
            <button onClick={() => handleNext({ placeOfBirth })} className='button'>Далее</button>  
          </div>  
        );  
        
      case 4:  
        return (  
          <div className='body'>  
            <h2>Ваше Имя:</h2>  
            <br />  
            <span>Имя влияет на судьбу человека ровно так же, как и звёзды.</span>  <br />  
            <input  
              type="text"  
              placeholder="Имя"  
              value={username}  
              onChange={(e) => setUsername(e.target.value)}  
            />  
            <button onClick={() => handleNext({ username })} className='button'>Далее</button>  
          </div>  
        );  

      case 5:  
        return (  
          <div className='body'>  
            <h2>Ваши введенные данные:</h2>  
            <p><strong>Время:</strong> {unknownTime ? 'Неизвестно' : `${hours} часов и ${minutes} минут`}</p>  
            <p><strong>Дата рождения:</strong> {day}/{month}/{year}</p>  
            <p><strong>Место рождения:</strong> {placeOfBirth}</p>  
            <p><strong>Имя:</strong> {username}</p>  
          </div>  
        );   
  
      default:  
        return null;  
    }  
  };  
  
  return (  
    <div>  
      {renderStep()}  
    </div>  
  );  
};  

export default Body;  