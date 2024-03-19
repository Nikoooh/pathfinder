import { useState, useContext } from 'react'
import { PathfindContext } from '../context/pathfindContext'

const defaultGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const Grid = () => {

    const [grid, setGrid] = useState(defaultGrid.map(row => [...row]))
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [startPos, setStartPos] = useState(null)
    const [endPos, setEndPos] = useState(null)
    const { selected, setSelected } = useContext(PathfindContext)
    
    const updateGrid = (rowId, tileId, run) => {
        if (selected === 'blocker' && !run) {
            const updatedGrid = [...grid]
            updatedGrid[rowId][tileId] = 1
            setGrid(updatedGrid)
        } else if (selected === 'start' && !run) {
            let oldPos = updateTilePos(2)
            if (oldPos) {
                const updatedGrid = [...grid]
                updatedGrid[oldPos[0]][oldPos[1]] = 0
                setGrid(updatedGrid)
            } 
            const updatedGrid = [...grid]
            updatedGrid[rowId][tileId] = 2
            setGrid(updatedGrid)
            setStartPos([rowId, tileId])
        } else if (selected === 'goal' && !run) {
            let oldPos = updateTilePos(3)
            if (oldPos) {
                const updatedGrid = [...grid]
                updatedGrid[oldPos[0]][oldPos[1]] = 0
                setGrid(updatedGrid)
            } 
            const updatedGrid = [...grid]
            updatedGrid[rowId][tileId] = 3
            setGrid(updatedGrid)
            setEndPos([rowId, tileId])
        } 
        
        if (run === true) {
            const updatedGrid = [...grid]
            updatedGrid[rowId][tileId] = 4
            setGrid(updatedGrid)
        }
    }

    const updateTilePos = (searchVal) => {
        let pos
        grid.forEach((row, i) => {
            const index = row.findIndex(tileVal => tileVal === searchVal)
            if (index !== -1) {
                pos = [i, index]
            }
        })
        return pos
    }

    const handleMouseDown = () => {
        setIsMouseDown(true)
    }

    const handleMouseUp = () => {
        setIsMouseDown(false)
    }

    const handleHover = (rowId, tileId) => {
        if (isMouseDown) {
            updateGrid(rowId, tileId)        
        }
    }

    const pathfind = (tile) => {

        setSelected(null)

        if (!startPos || !endPos) {
            return alert('start or goal position not defined')
        }

        if (startPos[0] < endPos[0] - 1) {
            tile[0]++
            updateGrid(tile[0], tile[1], true)
            pathfind(tile)  
        } 

        if (startPos[0] > endPos[0] + 1) {
            tile[0]--
            updateGrid(tile[0], tile[1], true)
            pathfind(tile)  
        } 

        if (startPos[1] < endPos[1]) {
            tile[1]++
            updateGrid(tile[0], tile[1], true)
            pathfind(tile) 
        }

        if (startPos[1] > endPos[1]) {
            tile[1]--
            updateGrid(tile[0], tile[1], true)
            pathfind(tile) 
        } else {
            return
        }
        
    }

    return (
        <div>
            <div className='gridContainer'>
                {(grid.map((row, rowId) => {  
                    return ( 
                        <div className='gridRow' key={rowId}>      
                            {(row.map((tile, tileId) => {  
                                return (
                                    <div className={`gridTile ${tile === 1 ? 'blockerTile' : tile === 2 ? 'startTile' : tile === 3 ? 'goalTile' : tile === 4 ? 'pathTile' : ''} ${selected === 'blocker' ? 'blockerHover' : selected === 'start' ? 'startHover' : selected === 'goal' ? 'goalHover' : ''}`} key={tileId} onClick={() => updateGrid(rowId, tileId)} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOver={() => handleHover(rowId, tileId)}/>                                                          
                                )
                            }))}
                        </div>
                    )      
                }))}
            </div>
            <div className='bottomContainer'>
                <button className='resetBtn' onClick={() => setGrid(defaultGrid.map(row => [...row]))} >
                    Reset tiles
                </button>
                <button className='searchBtn' onClick={() => pathfind(startPos)} >
                    Start Search
                </button>
            </div>
        </div>
    )
}

export default Grid