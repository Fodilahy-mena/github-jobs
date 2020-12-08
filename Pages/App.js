import React,{useState, useEffect, useContext} from 'react'
import {Switch, Route, Link} from 'react-router-dom';
import { Context } from '../Context';
import JobDetails from './JobDetails';
import Jobs from './Jobs';

const API_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description";
function App() {
   const {state, dispatch} = useContext(Context);
   const {loading, response} = state;
   console.log(response)

    useEffect(() => {
        let isCurrent = true
        dispatch({ type: "LOADING" })
        fetch(API_URL)
        .then(response => response.json())
        .then(json => {
            if (isCurrent) {
            dispatch({ type: "RESOLVED", response: json })
            }
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
