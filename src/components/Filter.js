import filter from './../img/icon/filter.svg';
import './../style/App.css';

export default function Filter(){
    const showFilters = () => {
        var filterOptions = document.getElementById("filter-options");
        if(filterOptions.style.display === 'block'){
            filterOptions.style.display = "none";
        } else{
            filterOptions.style.display = "block"
        }
    }

    return(
        <div className='App__section-filter'>
            <img src={filter} alt='filter icon'></img>
            <h5 onclick={showFilters}>FILTER</h5>
            <div className='App__section-filter-visibility' id="filter-options">
                <div>
                    <div>Workshop</div>
                    <img/>
                </div>
                <div>
                    <div>Activity</div>
                    <img/>
                </div>
                <div>
                    <div>Tech Talk</div>
                    <img/>
                </div>
            </div>
        </div>
    );
};