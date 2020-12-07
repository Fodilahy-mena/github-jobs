import React,{useContext, useEffect, useState} from 'react'
import { Context } from '../Context';
import JobList from './components/JobList';

function Jobs() {
    const {state, dispatch} = useContext(Context);
    const [locations, setLocations] = useState("")
    const {loading, response} = state;
    console.log(locations);
    return (
        <div>
            <h1>Github <span>Jobs</span></h1>
            <header>
                <form>
                    <input type="text" placeholder="Title, companies, expertise or benefits"/>
                    <button>Search</button>
                </form>
            </header>
            { loading && <div>Loading...</div> }
            {!loading &&
            <>
            <section>
                <form>
                    <input type="checkbox"/>
                    <label>Full time</label>
                    <label>Location</label>
                    <input type="text" name="locations" onChange={(e) => setLocations(e.target.value)} placeholder="City, state, zip code or country"/>
                    {response !== null && 
                    response.filter(res => 
                        res.location.toLowerCase().includes(locations.toLowerCase())).map( job => 
                        locations !== '' ?
                        <fieldset key={job.id}>
                            <input value={job.location} type="checkbox"/>
                            <label>{ function getUniqueListBy(loc, ky) {
                                return [...new Map(loc.map(lc => [lc[ky], loc])).values()]
                            }
                            
                            }</label>
                        </fieldset>
                        :
                        ''
                    )}
                </form>
            </section>
            <section className="section_jobs">
                <JobList jobs={response}/>
            </section>
            </>
            }
        
        </div>
    )
}

export default Jobs
