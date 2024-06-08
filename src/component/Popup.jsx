import React, { useEffect, useRef, useContext } from 'react';
import PopupContext from './PopupProvider';
import './Popup.css';

const Popup = ({ id, content, position, animation, zIndex, onClose }) => {
    const { removePopup } = useContext(PopupContext);
    const popupRef = useRef(null);

    useEffect(() => {
        if (animation) {
            popupRef.current.classList.add('popup-enter');
            setTimeout(() => {
                popupRef.current.classList.add('popup-enter-active');
                popupRef.current.classList.remove('popup-enter');
            }, 0);
        }
    }, [animation]);

    const handleClose = () => {
        if (animation) {
            popupRef.current.classList.add('popup-exit');
            setTimeout(() => {
                popupRef.current.classList.add('popup-exit-active');
                popupRef.current.classList.remove('popup-exit');
                setTimeout(() => {
                    removePopup(id);
                    onClose?.();
                }, 300); 
            }, 0);
        } else {
            removePopup(id);
            onClose?.();
        }
    };

    const style = {
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom,
        zIndex: zIndex,
    };

    return (
        <div className="popup" style={style} ref={popupRef}>
            <div className="popup-content">
                {content}
            </div>
            <button onClick={handleClose} className="popup-close-button">Close</button>
        </div>
    );
};

export default Popup;
