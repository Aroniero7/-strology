const tg = window.Telegram.WebApp;

export function useTelegram() {
    const tg = window.Telegram.WebApp;

    // Логируем данные о пользователе
    console.log(tg.initDataUnsafe);

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
        user: tg.initDataUnsafe?.user || {}, // Задаем пустой объект по умолчанию
    }
}