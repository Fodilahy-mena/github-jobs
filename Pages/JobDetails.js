
import React, { useContext } from 'react'
import {useParams} from 'react-router-dom';
import { Context } from '../Context';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const LogoStyleImg = styled.img`
max-width: 90px;
height: auto;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;
const DivStyle = styled.div`
display: flex;
gap: 10px;
`;
const ButtonJobType = styled.button`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */
    color: #334680;
    position: relative;
    top: 26px;
    border: 1px solid #334680;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    padding: 6px 8px;
    max-width: fit-content;
    height: fit-content;
`;
function JobDetails() {
    // get the state from context
    const { state}= useContext(Context);
    const {response} = state;
    const {jobId} = useParams();
    
    if(response !== null) {
        console.log(response);
    }
    // filter the data response according to their id
    const thisJob = response !== null && response.filter(job => job.id == jobId);
    // convert the response into an array so that we can map it
    let newArr = Array.from(thisJob);
    
    return (
        // map the converted array here
        newArr.map(arr => (
        <div key={arr.id}>
            <article>
                {/* A link back to the main page */}
                <Link className="bacl--to-main" to="/"><i className="ri-arrow-left-line"></i> Go back to Search</Link>
                <h2 className="job_apply">How to apply</h2>
                <p className="apply_on">{arr.how_to_apply}</p>
                <a className="job_url" src={arr.url}>wes@{arr.title} <i>&CC</i> {arr.company}</a>
            </article>
            <article>
                <DivStyle>
                    <h2>{arr.title}</h2>
                    <ButtonJobType>{arr.type}</ButtonJobType>
                </DivStyle>
                <span>{arr.created_at}</span>
                <div className="job_comapny">
                    <LogoStyleImg src={arr.company_logo}/>
                    <div className="job_created">
                        <strong>{arr.location}</strong>
                        <span>{arr.created_at}</span>
                    </div>
                </div>
                <p className="job_description">{arr.description}</p>
            </article>
        </div>
    )))
}

export default JobDetails
