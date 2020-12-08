
import React, { useContext } from 'react'
import {useParams} from 'react-router-dom';
import { Context } from '../Context';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const LogoStyleImg = styled.img`
max-width: 90px;
height: auto;
`;
function JobDetails() {
    const { state, dispatch }= useContext(Context);
    const {response} = state;
    const {jobId} = useParams();
    console.log("jobId",jobId)
    if(response !== null) {
        console.log(response);
    }
    const thisJob = response !== null && response.filter(job => job.id == jobId);
    
    let newArr = Array.from(thisJob);
    console.log("new arr",newArr);
    
    return (
        newArr.map(arr => (
            <div key={arr.id}>
                <article>
                    <Link className="bacl--to-main" to="/"><i class="ri-arrow-left-line"></i> Go back to Search</Link>
                    <h2>How to apply</h2>

                    {arr.how_to_apply}
                    <a src={arr.url}>wes@{arr.title} <i>&CC</i> {arr.company}</a>
                </article>
                <article>
                    <div>
                        <h2>{arr.title}</h2>
                        <button>{arr.type}</button>
                    </div>
                    <span>{arr.created_at}</span>
                    <div>
                        <LogoStyleImg src={arr.company_logo}/>
                        <p>
                            <strong>{arr.location}</strong>
                            <span>New York</span>
                        </p>

                    </div>
                    {arr.description}
                </article>
            </div>
        
        // <></>
    )))
}

export default JobDetails
