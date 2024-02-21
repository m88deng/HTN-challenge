import filter from './../img/icon/filter.svg';
import close from './../img/icon/close.svg';
import './../style/App.css';

import { useState, useEffect } from 'react';

export default function Filter({ onFilterChange }) {
    const [selectedOptions, setSelectedOptions] = useState({
        workshop: true,
        activity: true,
        tech_talk: true
    });

    const handleSelected = (option) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [option]: !prevSelectedOptions[option]
        }));
        onFilterChange(selectedOptions);
    }

    useEffect(() => {
        // Call the onFilterChange callback with the selectedOptions
        onFilterChange(selectedOptions);
    }, [selectedOptions, onFilterChange]);

    return (
        <div className='App__section-filter'>
            <img src={filter} alt='filter icon'></img>
            <h5>FILTER</h5>
            <div id="filter-options">
                <div id="workshop" onClick={() => handleSelected('workshop')} className={selectedOptions['workshop'] ? '' : 'unselected'}>
                    <div className='App__section-filter-option'>
                        <div className='App__section-filter-option-left'>Workshop</div>
                        <img src={close} className='App__section-filter-option-right' alt='close icon' />
                    </div>
                </div>
                <div id="activity" onClick={() => handleSelected('activity')} className={selectedOptions['activity'] ? '' : 'unselected'}>
                    <div className='App__section-filter-option'>
                        <div className='App__section-filter-option-left'>Activity</div>
                        <img src={close} className='App__section-filter-option-right' alt='close icon' />
                    </div>
                </div>
                <div id="tech_talk" onClick={() => handleSelected('tech_talk')} className={selectedOptions['tech_talk'] ? '' : 'unselected'}>
                    <div className='App__section-filter-option'>
                        <div className='App__section-filter-option-left'>Tech Talk</div>
                        <img src={close} className='App__section-filter-option-right' alt='close icon' />
                    </div>
                </div>
            </div>
        </div >
    );
};