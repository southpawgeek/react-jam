import { createContext, useContext, useState } from "react"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const rooms = {
    start: {
      name: "In The Beginning",
      image: "beginning.jpg",
      exits: { a2: "foyer" },
      description: [
        "You don't remember how you got here. The room is tiny, with only one <br/>discernible exit.",
      ],
      actions: {
        a1: {
          examine: {
            description: ["There isn't much to look at here."],
          },
          hit: {
            description: [
              "You attempt to hit the emptiness in the doorway. You stumble forward <br/>awkwardly.",
            ],
          },
          use: {
            description: [
              "You ponder the infinite ways in which you could use an open doorway.",
            ],
          },
        },
      },
    },
    foyer: {
      name: "The Vortex",
      image: "foyer.jpg",
      exits: { a1: "birdroom", c2: "start", b2: "nowhere", a3: "death" },
      description: [
        "There's a giant hole in the center of this room. Blue energy lazily swirls out of it. The energy is being siphoned out into what appears to be deep space. A window to the left looks like you could crawk through it.",
      ],
      actions: {
        a1: {
          examine: {
            description: [
              "The portal beckons to you. The giant vacuum hole sucking everything into space <br />also looks interesting, but you question its safety.",
            ],
          },
        },
      },
    },
    birdroom: {
      name: "Beebee's Room",
      image: "birdcage.jpg",
      description: [
        "The cozy room has a bird cage by the window. There's a chair next to the cage.",
      ],
      exits: { c3: "foyer" },
      actions: {
        a1: {
          use: { nextRoom: "deathBeebee" },
          examine: {
            description: ["A small sparrow furiously hops around the cage."],
          },
        },
      },
    },
    deathBeebee: {
      name: "Game Over",
      image: "death-beebee.jpg",
      exits: { b2: "start" },
      description: [
        "Upon opening the cage, Beebee quickly escapes. His first course of action is to fly at your face, pecking out your eyes.",
      ],
      actions: {},
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
      actions: {},
      description: ["all roads go to the same place"],
    },
    death: {
      name: "Game Over",
      image: "death.jpg",
      exits: { b2: "start" },
      description: ["Unfortunately, you didn't survive."],
      actions: {
        a1: {
          examine: {
            description: [
              "The skull stares at you through eyeless sockets. You can't help but feel like <br />you're being judged.",
            ],
          },
          hit: {
            description: [
              "You focus all of your fury upon the weird floating skull before you. Alas, you are still dead and the skull is unharmed. But, you feel a little better now.",
            ],
          },
        },
      },
    },
  }
  const [currentRoom, setCurrentRoom] = useState(rooms.start)
  const [currentDescription, setCurrentDescription] = useState(
    rooms.start.description
  )

  const [currentItem, setCurrentItem] = useState("")
  const inventory = ["key"]

  const [currentAction, setCurrentAction] = useState("")
  const actions = ["examine", "use", "hit"]
  return (
    <GameContext.Provider
      value={{
        rooms,
        currentDescription,
        setCurrentDescription,
        currentRoom,
        setCurrentRoom,
        inventory,
        currentItem,
        setCurrentItem,
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
