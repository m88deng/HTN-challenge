import filter from './../img/icon/filter.svg';
import Header from '../components/Header';
import './../style/app.css';

export default function Logged() {
    return (
        <div className='App'>
            <Header />
            <section className='App__section'>
                <div className='App__section-top'>
                    <h2>Private Events</h2>
                    <div className='App__section-filter'>
                        <img src={filter} alt='filter icon'></img>
                        <h3>FILTER</h3>
                    </div>
                </div>
            </section>
        </div>
    );
};