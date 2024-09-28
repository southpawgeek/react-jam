import { createContext, useContext, useState } from "react"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const rooms = {
    start: {
      name: "beginning",
      exits: { a2: "foyer" },
      description: ["This room only has an exit to the north."],
    },
    foyer: {
      name: "foyer",
      exits: { c2: "start", b2: "nowhere" },
      description: [
        "There's a giant hole in the center of this room. Blue magic swirls out of it.",
      ],
    },
    nowhere: {
      name: "just go back home",
      exits: {
        a1: "start",
        a2: "start",
        a3: "start",
        b1: "start",
        b2: "start",
        b3: "start",
        c1: "start",
        c2: "start",
        c3: "start",
      },
      description: ["all roads go to the same place"],
    },
  }
  const [currentRoom, setCurrentRoom] = useState(rooms.start)
  return (
    <GameContext.Provider value={{ rooms, currentRoom, setCurrentRoom }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameProvider = () => useContext(GameContext)
