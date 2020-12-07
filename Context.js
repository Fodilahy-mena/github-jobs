import React, {useState, useEffect, useReducer} from 'react';

const Context = React.createContext();

function ContextProvider(props) {

    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
          case 'LOADING': {
            return { ...state, loading: true }
          }
          case 'RESOLVED': {
            return {
              ...state,
              loading: false,
              response: action.response,
              error: null
            }
          }
          case 'ERROR': {
            return {
              ...state,
              loading: false,
              response: null,
              error: action.error
            }
          }
          default:
            return state
        }
      }, {
        loading: false,
        response: null,
        error: null,
        
      })
  
    return <Context.Provider value={{state, dispatch}}>
                {props.children}
            </Context.Provider>
            
}

export { ContextProvider, Context};