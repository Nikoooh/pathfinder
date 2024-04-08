import React, { useState, useContext } from 'react'
import { PathfindContext } from '../context/pathfindContext'
import { PriorityQueue } from '../utils/priorityQueue'

type GridValue = 0 | 1 | 2 | 3 | 4;

const defaultGrid: GridValue[][] = [
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

  const [grid, setGrid] = useState<GridValue[][]>(defaultGrid.map(row => [...row]))
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [startPos, setStartPos] = useState<[number, number] | null>(null)
  const [endPos, setEndPos] = useState<[number, number] | null>(null)
  const [pathFound, setPathFound] = useState<boolean>(true)
  const { selected } = useContext(PathfindContext)
  
  const updateGrid = (rowId: number, tileId: number) => {

    if (selected === 'blocker') {

      const updatedGrid = [...grid]
      updatedGrid[rowId][tileId] = 1
      setGrid(updatedGrid)

    } else if (selected === 'start') {

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

    } else if (selected === 'goal') {

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
  }

  const pathfind = () => {

    if (!startPos || !endPos) {
      alert('start or goal position missing')
      return;
    }

    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    const prioq = new PriorityQueue();
    const distance = new Array(grid.length).fill(null).map(() => new Array(grid[0].length).fill(Infinity));
    const visited = new Array(grid.length).fill(null).map(() => new Array(grid[0].length).fill(false));
    prioq.enqueue(startPos, 0);
    distance[startPos[0]][startPos[1]] = 0;

    while (!prioq.isEmpty()) {

      const [x, y] = prioq.dequeue();

      if (x === endPos[0] && y === endPos[1]) {
        break;
      }

      visited[x][y] = true;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length && !visited[nx][ny] && grid[nx][ny] !== 1) {
          const newDistance = distance[x][y] + 1;
          if (newDistance < distance[nx][ny]) {
            distance[nx][ny] = newDistance;
            prioq.enqueue([nx, ny], newDistance);
          }
        }
      }

      if (prioq.isEmpty() && !(x === endPos[0] && y === endPos[1])) {
        reset()
        setPathFound(false)      
        setTimeout(() => {
          setPathFound(true)        
        }, 1000)     
        return
      }

    }

    const path: Array<Number[]> = [];
    let [x, y] = endPos;

    while (!(x === startPos[0] && y === startPos[1])) {

      path.push([x, y]);

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length && distance[nx][ny] + 1 === distance[x][y]) {
          x = nx;
          y = ny;
          break;
        }
      }

    }

    path.push(startPos);
    path.reverse();
    const updatedGrid = grid.map(row => [...row]);

    for (const [x, y] of path as Array<[number, number]>) {

      if (grid[x][y] === 2 || grid[x][y] === 3) {
          updatedGrid[x][y] = grid[x][y]
      } else {
          updatedGrid[x][y] = 4; 
      }
    }

    setGrid(updatedGrid);

  };

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

  const handleHover = (rowId: number, tileId: number) => {
    if (isMouseDown) {
      updateGrid(rowId, tileId)        
    }
  }

  const reset = () => {
    setGrid(defaultGrid.map(row => [...row]))
    setEndPos(null)
    setStartPos(null)
  }

  return (
    <div>
      <div className={`gridContainer ${pathFound ? '' : 'pathNotFound'}`}>
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
        <button className='resetBtn' onClick={reset} >
          Reset tiles
        </button>
        <button className='searchBtn' onClick={() => pathfind()} >
          Start Search
        </button>
      </div>
    </div>
  )
}

export default Grid