import { createContext, useContext, useState } from "react"
import data from "../data"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const { actions, rooms, tasks } = data

  const [currentRoom, setCurrentRoom] = useState(rooms.start)
  const [currentDescription, setCurrentDescription] = useState(
    rooms.start.description
  )

  const [visitedRooms, setVisitedRooms] = useState(["start"])
  const addVisitedRoom = (roomKey) => {
    const index = visitedRooms.indexOf(roomKey)
    if (index === -1) {
      let updatedRooms = [...visitedRooms]
      updatedRooms.push(roomKey)
      setVisitedRooms(updatedRooms)
    }
  }
  const clearVisitedRooms = () => setVisitedRooms([])

  const completedTasks = tasks.filter((task) => visitedRooms.includes(task.key))
  const taskPercentage = (completedTasks.length / tasks.length) * 100

  const [currentAction, setCurrentAction] = useState("default")

  return (
    <GameContext.Provider
      value={{
        rooms,
        currentDescription,
        setCurrentDescription,
        currentRoom,
        setCurrentRoom,
        clearVisitedRooms,
        tasks,
        taskPercentage,
        visitedRooms,
        addVisitedRoom,
        actions,
        currentAction,
        setCurrentAction,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameProvider = () => useContext(GameContext)
