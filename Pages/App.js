import React,{useState, useEffect, useContext} from 'react'
import {Switch, Route, Link} from 'react-router-dom';
import { Context } from '../Context';
import JobDetails from './JobDetails';
import Jobs from './Jobs';

const API_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description";
function App() {
    // get the state from context
    const {state, dispatch} = useContext(Context);
    const {response} = state;
    console.log(response)

    // fetch the API_URL github jobs api
    useEffect(() => {
        let isCurrent = true
        dispatch({ type: "LOADING" })
        fetch(API_URL)
        .then(response => response.json())
        .then(json => {
            if (isCurrent) {
            // update the null response in the context into json data
            dispatch({ type: "RESOLVED", response: json })
            }
            // catch if there is an error
        }).catch(error => {
            dispatch({ type: "ERROR", error })
        })
        return () => {
        isCurrent = false
        }
  }, []) 
    return (
        <>
            <div className="loading">
                <Switch>
                    <Route exact path="/">
                        <Jobs/>
                    </Route>
                    <Route path="/:jobId">
                        <JobDetails/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default App
