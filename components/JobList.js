import React, {useContext} from 'react'
import { Context } from '../Context';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LogoStyleImg = styled.img`
max-width: 90px;
height: auto;
`;
// job.title.toLowerCase().includes(currentFilter.toLowerCase())
// .slice(0, 5)
function JobList({jobs, jobType}) {
    const {state, dispatch} = useContext(Context);
    const {loading, response, currentFilter} = state;
    console.log("jobeTi", jobType)
    console.log("curr",currentFilter)
    return (
        <ul className="job_list">
            {jobs !== null && jobs.filter(job => job.title.toLowerCase().includes(currentFilter.toLowerCase())
            || job.company.toLowerCase().includes(currentFilter.toLowerCase())
            || job.type.toLowerCase().includes(jobType.toLowerCase())).slice(0, 5).map(job => (
            <Link to={`/${job.id}`} key={job.id}>
                <li className="job_item" key={job.id}>
                    <LogoStyleImg src={job.company_logo}/>
                    <div>
                        <h3 className="job_location">{job.location}</h3>
                        <p className="job_title">{job.title}</p>
                        <button className="job_type">{job.type}</button>
                    </div>
                    <div>
                        <span>{job.location}</span>
                        <span>{job.created_at}</span>
                    </div>
                </li>
            </Link>
            ))}
        </ul>
    )
}

export default JobList