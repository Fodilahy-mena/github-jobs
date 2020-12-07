import React, {useContext} from 'react'
import { Context } from '../../Context';
import styled from 'styled-components';

const LogoStyleImg = styled.img`
max-width: 90px;
height: auto;
`;
function JobList({jobs}) {
    const {state, dispatch} = useContext(Context);
    const {loading, response} = state;
    // response !== null && response.map(job => console.log(job.location))
    return (
        <ul className="job_list">
            {jobs !== null && jobs.slice(0, 5).map(job => (
            <li className="job_item" key={job.id}>
                <LogoStyleImg src={job.company_logo}/>
                <div>
                    <span>{job.location}</span>
                    <p>{job.title}</p>
                    <button>{job.type}</button>
                </div>
                <div>
                    <span>{job.location}</span>
                    <span>{job.created_at}</span>
                </div>
            </li>
            ))}
        </ul>
    )
}

export default JobList
