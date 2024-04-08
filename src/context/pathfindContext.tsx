import React, { useState, createContext, ReactNode } from 'react'

interface PathfindContextType {
    selected: string | undefined;
    setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface PathfindProviderProps {
    children: ReactNode; 
}

export const PathfindContext = createContext<PathfindContextType>({
    selected: '',
    setSelected: () => {}
})

export const PathfindProvider: React.FC<PathfindProviderProps> = (props) => {

    const [selected, setSelected] = useState<string>()

    return (
        <PathfindContext.Provider value={{selected, setSelected}}>
            {props.children}
        </PathfindContext.Provider>
    )
}