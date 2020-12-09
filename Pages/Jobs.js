import React,{useContext, useEffect, useState} from 'react'
import { Context } from '../Context';
import JobList from '../components/JobList';
import dataLocations from '../dataLocations.json'
function Jobs() {
    const {state, dispatch} = useContext(Context);
    const [zipCode, setZipCode] = useState("");
    const [locationsData, setLocationsData] = useState([])
    const {loading, response, currentLocation} = state;
    const [location, setLocation] = useState("")
    const [search, setSearch] = useState("");
    const [isJobType, setIsJobType] = useState(false);
    const [jobType, setJobType] = useState('');
    
    useEffect(() => {
        setLocationsData(dataLocations);
    }, [])
    function handleSearche(e) {
        e.preventDefault();
        console.log("ser",search)
        dispatch({ type: 'SWITCHT_FILTER', switchFilter: search });
        setSearch('');
        e.target.reset();
    }

    return (
        <div>
            <header>
                <div className="form_container">
                    <form onSubmit={(e, id) => handleSearche(e, id)} className="form_search">
                        <input  type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Title, companies, expertise or benefits"/>
                        <button>Search</button>
                    </form>
                </div>
            </header>
            { loading && <div>Loading...</div> }
            {!loading &&
            <main>
                <section>
                    <form>
                        <div className="jobType_contaimer">
                            <input type="checkbox" name="jobType" onChange={() => {
                            setIsJobType(prevType => !prevType)
                            if(isJobType === false) {
                                setJobType("Full time")
                            } else {
                                setJobType("")
                            }
                            }
                            }
                            checked={jobType === "Full time"}/>
                            <label>Full time</label>
                        </div>
                        <div className="location_container">
                            <label className="location">Location</label>
                            <input type="text" name="zipCode" onChange={(e) => setZipCode(e.target.value)} placeholder="City, state, zip code or country"/>
                            {locationsData.map((locationData) => 
                                <fieldset key={locationData.id}>
                                    <input 
                                        checked={locationData.name == currentLocation}
                                        onChange={(e) => {
                                        setLocation(e.target.value)
                                        dispatch({ type: 'SWITCHT_LOCATION', switchLocation: e.target.value })
                                        }} value={locationData.name} type="checkbox"/>
                                    <label>{locationData.name}</label>
                                </fieldset>
                            )}
                        </div>
                    </form>
                </section>
                <section className="section_jobs">
                    <JobList search={search} location={location} zipCode={zipCode} jobType={jobType} jobs={response}/>
                </section>
            </main>
            }
        
        </div>
    )
}

export default Jobs
