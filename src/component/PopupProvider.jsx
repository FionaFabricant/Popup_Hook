import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popups, setPopups] = useState([]);

    const addPopup = (popup) => {
        setPopups((prev) => {
            if (prev.some(p => p.id === popup.id)) {
                return prev;
            }
            return [
                ...prev,
                { ...popup, zIndex: prev.length + 1000 } 
            ];
        });
    };

    const removePopup = (id) => {
        setPopups((prev) => prev.filter(popup => popup.id !== id));
    };

    return (
        <PopupContext.Provider value={{ popups, addPopup, removePopup }}>
            {children}
            {ReactDOM.createPortal(
                <div className="popup-container">
                    {popups.map(popup => (
                        <Popup {...popup} key={popup.id} />
                    ))}
                </div>,
                document.body
            )}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup 需要在 PopupProvider 组件中使用');
    }
    return context;
};

export default PopupContext;
