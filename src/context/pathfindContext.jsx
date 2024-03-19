import { useState, createContext } from 'react'

export const PathfindContext = createContext()

export const PathfindProvider = (props) => {

    const [selected, setSelected] = useState()

    return (
        <PathfindContext.Provider value={{selected, setSelected}}>
            {props.children}
        </PathfindContext.Provider>
    )
}