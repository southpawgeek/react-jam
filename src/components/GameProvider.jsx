import { createContext, useContext, useState } from "react"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const rooms = {
    start: {
      key: "start",
      name: "Storage Room",
      image: "beginning.png",
      exits: { a2: "foyer" },
      description: [
        "You don't remember how you got here, but you are in a storage room that is not storing very much. The room has only one discernible exit. A dirty chair sits by the door.",
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
      key: "foyer",
      name: "The Vortex",
      image: "foyer.png",
      exits: { a1: "birdroom", c2: "start", b2: "nowhere", a3: "deathVortex" },
      description: [
        "The foyer must have been lovely in its prime. Upstairs, a repetitive chirping sound comes from the visible door, and the hallway continues eastward. On the main floor, the door before you leads to the kitchen. To the east, there is a dining room entrance.",
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
      key: "birdroom",
      name: "Beebee's Room",
      image: "birdcage.png",
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
      key: "deathBeebee",
      name: "Game Over",
      image: "deathBeebee.png",
      exits: { b2: "start" },
      description: [
        "Upon opening the cage, Beebee quickly escapes. You imagine the bird's instinct would be to fly out the window and enjoy his freedom. However, his first course of action is to launch himself at your face, pecking out your eyes.",
      ],
      actions: {},
    },
    nowhere: {
      key: "nowhere",
      name: "Nowhere?",
      image: "nowhere.png",
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
    deathVortex: {
      key: "deathVortex",
      name: "Game Over",
      image: "death.png",
      exits: { b2: "start" },
      description: [
        "Unfortunately, you didn't survive the cold vacuum of space.",
      ],
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

  const tasks = [
    {
      key: "deathChair",
      name: "Have a Seat"
    },
    {
      key: "deathBeebee",
      name: "Meet Beebee",
    },
    {
      key: "deathFood",
      name: "Relentless Snacker",
    },
    {
      key: "deathBulb",
      name: "Shed Some Light"
    },
    {
      key: "deathCrevice",
      name: "Slap a Cap"
    },
    {
      key: "deathBook",
      name: "Well Read"
    },
    {
      key: "deathRitual",
      name: "Ashes to Ashes"
    },
    {
      key: "deathBathtub",
      name: "Squeaky Clean"
    },
    {
      key: "deathMirror",
      name: "Chill Out"
    },
    {
      key: "deathBed",
      name: "Away From the Light"
    }
  ]

  const [visitedRooms, setVisitedRooms] = useState(["start"])
  const addVisitedRoom = (roomKey) => {
    const index = visitedRooms.indexOf(roomKey)
    if (index === -1) {
      let updatedRooms = [...visitedRooms]
      updatedRooms.push(roomKey)
      setVisitedRooms(updatedRooms)
    }
  }

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
        tasks,
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
