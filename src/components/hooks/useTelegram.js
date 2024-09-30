const { useEffect, useState } = require('react');

export function useTelegram() {
    const tg = window.Telegram.WebApp;
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(tg.initDataUnsafe); // Логируем данные о пользователе
        if (tg.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user);
        }
    }, [tg]);

    const onClose = () => {
        tg.close();
    }

    const onToggleButton = () => {
        if (tg.MainButton.inVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user, // Теперь возвращаем состояние пользователя
    }
}