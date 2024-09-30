import React from 'react';
import { useTelegram } from '../hooks/useTelegram';
import './App.css';


const Body = () => {
    const {user, onClose} = useTelegram();

    return(
        <div className={'body'}>

            <span className={'username'}>Давай знакомится, 
                {user?.username || user?.first_name || 'Неизвестный пользователь'}
            </span>
      <p>Ответь на 4 постых вопроса. <br/>
      Это поможет нам узнать тебя получше. </p>
        </div>
    );
};

export default Body;