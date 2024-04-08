import React, {  useContext } from 'react'
import { PathfindContext } from '../context/pathfindContext'

const Setter = () => {

    const { selected, setSelected } = useContext(PathfindContext)

    const handleSelection = (block: string) => {
        setSelected(block)
    }

    return (
        <div className="setterContainer">
            <div className={`setter blocker ${selected === 'blocker' ? 'selected' : ''}`} onClick={() => handleSelection('blocker')}>
                Blockers            
            </div>
            <div className={`setter start ${selected === 'start' ? 'selected' : ''}`} onClick={() => handleSelection('start')}>
                Start
            </div>
            <div className={`setter goal ${selected === 'goal' ? 'selected' : ''}`} onClick={() => handleSelection('goal')}>
                Goal
            </div>
        </div>
    )
}

export default Setter