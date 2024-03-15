import { useState } from 'react'

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

    const handleClick = (rowId, tileId) => {
        const updatedGrid = [...grid]
        updatedGrid[rowId][tileId] = 1
        setGrid(updatedGrid)
    }

    const handleMouseDown = () => {
        setIsMouseDown(true)
    }

    const handleMouseUp = () => {
        setIsMouseDown(false)
    }

    const handleHover = (rowId, tileId) => {
        if (isMouseDown) {
            const updatedGrid = [...grid]
            updatedGrid[rowId][tileId] = 1
            setGrid(updatedGrid)
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
                                    <div className={`gridTile ${tile === 1 ? 'selected' : ''}`} key={tileId} onClick={() => handleClick(rowId, tileId)} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOver={() => handleHover(rowId, tileId)}/>                                                          
                                )
                            }))}
                        </div>
                    )      
                }))}
            </div>
            <div>
                <button className='resetBtn' onClick={() => setGrid(defaultGrid.map(row => [...row]))} >
                    Reset blockers
                </button>
            </div>
        </div>
    )
}

export default Grid