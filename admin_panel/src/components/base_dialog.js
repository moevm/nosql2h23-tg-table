import React from 'react';
import cl from '../style/base_dialog.module.css';

const BaseDialog = ({children, visible, setVisible}) => {

    const rootClasses = [cl.baseDialog]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.baseDialogContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default BaseDialog;