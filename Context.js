import React, {useReducer} from 'react';

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
          case 'SWITCHT_FILTER': {
            return { ...state, currentFilter: action.switchFilter}
          }
          case 'SWITCHT_LOCATION': {
            return { ...state, currentLocation: action.switchLocation}
          }
          
          default:
            return state
        }
      }, {
        loading: false,
        response: null,
        error: null,
        currentFilter: '',
        // a default job loction, will be updated
        currentLocation: 'Berlin',
        
      })
  
    return <Context.Provider value={{state, dispatch}}>
                {props.children}
            </Context.Provider>
            
}

export { ContextProvider, Context};