import React,{useContext, useEffect, useState} from 'react'
import { Context } from '../Context';
import JobList from './components/JobList';

function Jobs() {
    const {state, dispatch} = useContext(Context);
    const [locations, setLocations] = useState("");
    const [locationsData, setLocationsData] = useState([
        "Berlin",
        "Toronto, Canada (or remote within Canada)",
        "Portland, ME (Remote OK)",
        "eindhoven ",
        "Frankfurt, Germany (remote within Germany)",
        "Croeselaan 18, 3521CB, Utrecht",
        "Dresden",
        "Aachen",
        "Eindhoven",
        "Budapest",
        "St. Helier, Jersey",
        "Munich Germany",
        "Vernon Hills, IL (Chicago)",
        "Remote (US Pacific TZ)",
        "Remote in U.S.",
        "Zurich",
        "Utrecht ",
        "Chennai",
        "Barcelona",
        "Bangalore",
        "München",
        "Fort Gordon, GA",
        "Austin, TX",
        "Munich",
        "Hamburg",
        "Aalsmeer",
        "Delft",
        "Europe (remote)",
        "Cologne, Germany",
        "Philadelphia",
        "Holzwickede",
        "United States",
        "Edmond, Oklahoma",
        "San Francisco | Remote (US/Canada)",
        "Zeist",
        "Leverkusen",
        "New Yourk City",
        "Berlin / Remote",
        "Dutapest"
        ])
    const {loading, response} = state;
    const [location, setLocation] = useState('')
    const [search, setSearch] = useState("");
    const [isJobType, setIsJobType] = useState(false);
    const [jobType, setJobType] = useState('Contract');
    console.log(locations);
    
    function handleSearche(e) {
        e.preventDefault();
        console.log("ser",search)
        dispatch({ type: 'SWITCHT_FILTER', switchFilter: search });
        setSearch('');
        e.target.reset();
    }
    
    console.log("mk",jobType, isJobType)
    return (
        <div>
            <h1>Github <span>Jobs</span></h1>
            <header>
                <form onSubmit={handleSearche}>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Title, companies, expertise or benefits"/>
                    <button>Search</button>
                </form>
            </header>
            { loading && <div>Loading...</div> }
            {!loading &&
            <>
            <section>
                <form>
                    <input type="checkbox" name="jobType" onChange={() => {
                    setIsJobType(prevType => !prevType)
                    if(isJobType === false) {
                        setJobType("Full time")
                    } else {
                        setJobType("")
                    }
                    }
                    }/>
                    <label>Full time</label>
                    <label>Location</label>
                    <input type="text" name="locations" onChange={(e) => setLocations(e.target.value)} placeholder="City, state, zip code or country"/>
                    {locationsData.filter((item) => 
                        item.toLowerCase().includes(locations.toLowerCase())).map((locationData, index) => 
                        locations !== '' ?
                        <fieldset key={index}>
                            <input onChange={(e) => setLocation(e.target.checked.value)} name="location" value={location} type="checkbox"/>
                            <label>{locationData}</label>
                        </fieldset>
                        :
                        ''
                    )}
                </form>
            </section>
            <section className="section_jobs">
                <JobList search={search} jobType={jobType} jobs={response}/>
            </section>
            </>
            }
        
        </div>
    )
}

export default Jobs
