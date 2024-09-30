import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../hooks/useTelegram';
import './Body.css';



const Header = () => {
    const {user, onClose} = useTelegram();

    return(
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
        </div>
    );
};

export default Header;