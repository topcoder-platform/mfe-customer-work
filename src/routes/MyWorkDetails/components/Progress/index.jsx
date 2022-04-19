import React from 'react';

import './style.scss';

function ProgressItem({name, date, stepNumber, className}) {
    return (
        <div className={`progress-bar-list__item ${className}`} >
            <span className="dots medium-medium">{stepNumber}</span>
            <div className="label">
                <span className='name large-subtitle bold'>{name}</span>
                <span className='date'>{date}</span>
            </div>
        </div>
    );
};

const ProgressBar = (props) => {
    const { progresslist, selectItem } = props;
    const progressItems = progresslist.map((item, index) =>
        <ProgressItem   key={index}
                        selectItem={selectItem} 
                        className={`${ index == selectItem && 'select'} ${index <  selectItem && 'active'}`} 
                        name={item.name} 
                        date={item.date}
                        stepNumber={item.stepNumber}/>
    );
    return (
        <div className="progress-bar-list">
            {progressItems}
        </div>
    );
};

export default ProgressBar;