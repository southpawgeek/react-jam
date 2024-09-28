import { createContext, useContext, useState } from "react"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const rooms = {
    start: {
      name: "In The Beginning",
      image: "beginning.jpg",
      exits: { a2: "foyer" },
      description: ["This room only has an exit to the north."],
    },
    foyer: {
      name: "The Vortex",
      image: "foyer.jpg",
      exits: { c2: "start", b2: "nowhere", a3: "death" },
      description: [
        "There's a giant hole in the center of this room. Blue energy lazily swirls out of it. The energy is being siphoned out into what appears to be deep space.",
      ],
    },
    nowhere: {
      name: "Nowhere?",
      image: "nowhere.jpg",
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
    death: {
      name: "Game Over",
      image: "death.jpg",
      exits: { b2: "start" },
      description: ["Unfortunately, you didn't survive."],
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
