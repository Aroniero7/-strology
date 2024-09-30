import { useTelegram } from '../hooks/useTelegram';  
import './Body.css';  
import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom'; // для редиректа

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
  const [errorMessage, setErrorMessage] = useState(''); // для отображения ошибки
  const [zodiacSign, setZodiacSign] = useState(''); // для хранения знака зодиака
  const navigate = useNavigate(); // для редиректа

  // Функция для вычисления знака зодиака
  const getZodiacSign = (day, month) => {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      return "Водолей";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return "Рыбы";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      return "Овен";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      return "Телец";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return "Близнецы";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
      return "Рак";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      return "Лев";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      return "Дева";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      return "Весы";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      return "Скорпион";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      return "Стрелец";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      return "Козерог";
    }
  };

  const handleFinish = () => {
    if (!day || !month || !year || !placeOfBirth || !username) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    const sign = getZodiacSign(day, month);
    setZodiacSign(sign);
    navigate('/main', { state: { zodiacSign: sign } });
  };

  const handleNextWithValidation = (currentData) => {
    setErrorMessage(''); // сброс сообщения об ошибке

    // Валидация для каждого шага
    if (step === 1 && (!hours && !unknownTime)) {
      setErrorMessage('Укажите время рождения или выберите "Я не знаю времени".');
      return;
    }

    if (step === 2 && (!day || !month || !year)) {
      setErrorMessage('Заполните все поля даты рождения.');
      return;
    }

    if (step === 3 && !placeOfBirth) {
      setErrorMessage('Заполните поле места рождения.');
      return;
    }

    if (step === 4 && !username) {
      setErrorMessage('Введите ваше имя.');
      return;
    }

    // Переход на следующий шаг, если валидация пройдена
    handleNext(currentData);
  };

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
                  handleNextWithValidation({ hours: '', minutes: '' }); 
                }}  
                className='button'   
                style={{ margin: 'auto', backgroundColor: unknownTime ? 'lightcoral' : 'initial' }} 
              >  
                Я не знаю времени  
              </button>  
            </div> 
            <button onClick={() => handleNextWithValidation({ hours, minutes })} className='button'>Далее</button>  
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <button onClick={() => handleNextWithValidation({ day, month, year })} className='button'>Далее</button>  
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>  
        );  
  
      case 3:  
        return (  
          <div className='body'>  
            <h2>Место рождения</h2>  
            <p>Укажите место, где вы родились.</p>  
            <input value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} placeholder='Место рождения' />  
            <button onClick={() => handleNextWithValidation({ placeOfBirth })} className='button'>Далее</button>  
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>  
        );  
  
        case 4:  
    return (  
      <div className='body'>  
        <h2>Ваше имя</h2>  
        <p>Введите ваше имя, чтобы мы могли к вам обращаться.</p>  
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ваше имя' />  
        <button onClick={() => handleFinish()} className='button'>Завершить</button>  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>  
    );  

  default:  
    return null;  
}  
  };  
  
  return <>{renderStep()}</>;  
};  
  
export default Body;
