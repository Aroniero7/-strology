import React from 'react';
import { useTelegram } from '../hooks/useTelegram';
import './Body.css';


const Body = () => {
    const {user, onClose} = useTelegram();

    return(
        <div className={'body'}>

            <h2 className={'username'}>Давай знакомится,<br/>
                {user?.username || user?.first_name || 'Неизвестный пользователь'}
            </h2>
      <p>Ответь на 4 постых вопроса. <br/>
      Это поможет нам узнать тебя получше. </p>
        </div>
    );
};

export default Body;