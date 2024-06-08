import React, { useState } from 'react';
import { PopupProvider } from './component/PopupProvider';
import usePopup from './component/usePopup';

const App = () => {
    return (
        <PopupProvider>
            <MainComponent />
        </PopupProvider>
    );
};

const MainComponent = () => {
    const { addPopup } = usePopup();
    const [firstPopupShown, setFirstPopupShown] = useState(false);
    const [secondPopupShown, setSecondPopupShown] = useState(false);

    const showPopup = () => {
        if (!firstPopupShown) {
            addPopup({
                id: 'first-popup',
                content: <div>这是弹窗1。点右上角关闭。</div>,
                position: { top: '120px', left: '100px' },
                animation: true,
                onClose: () => setFirstPopupShown(false),
            });
            setFirstPopupShown(true);
        }
    };

    const showAnotherPopup = () => {
        if (!secondPopupShown) {
            addPopup({
                id: 'second-popup',
                content: <div>这是弹窗2。点右上角关闭。</div>,
                position: { top: '200px', left: '200px' },
                animation: true,
                onClose: () => setSecondPopupShown(false),
            });
            setSecondPopupShown(true);
        }
    };

    return (
        <div className="App">
            <button onClick={showPopup}>弹 窗 1</button>
            <br />
            <br />
            <button onClick={showAnotherPopup}>弹 窗 2</button>
        </div>
    );
};

export default App;
