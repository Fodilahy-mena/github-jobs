import React, {useContext} from 'react'
import { Context } from '../Context';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LogoStyleImg = styled.img`
max-width: 90px;
height: auto;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ButtonJobType = styled.button`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */
    color: #334680;

    border: 1px solid #334680;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    padding: 6px 8px;
`;

function JobList({jobs, jobType}) {
    const {state} = useContext(Context);
    const {currentFilter, currentLocation} = state;
    
    return (
        <ul className="job_list">
            {/* Don't map unless the api is loaded */}
            {jobs !== null && 
            // filter the data by their title, location, company name, and job type
            jobs.filter(job =>
            job.location.toLowerCase().includes(currentLocation.toLowerCase())
            && job.title.toLowerCase().includes(currentFilter.toLowerCase())
            && job.company.toLowerCase().includes(currentFilter.toLowerCase())
            && job.type.toLowerCase().includes(jobType.toLowerCase())).slice(0, 5).map(job => (
            // Link the job id to their descriptions
            <Link to={`/${job.id}`} key={job.id}>
                <li className="job_item" key={job.id}>
                    <LogoStyleImg src={job.company_logo}/>
                    <div>
                        <h3 className="job_location">{job.location}</h3>
                        <p className="job_title">{job.title}</p>
                        <ButtonJobType>{job.type}</ButtonJobType>
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
