import { createContext, useContext, useState } from "react"

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const actionSets = {
    startDoorway: {
      hit: {
        description: [
          "You attempt to hit the emptiness in the doorway. You stumble forward awkwardly.",
        ],
      },
      use: {
        description: [
          "You ponder the infinite ways in which you could use an open doorway.",
        ],
      },
    },
    startChair: {
      examine: {
        description: [
          "The chair looks reasonably comfortable, but it's also glistening in a rather unsettling way.",
        ],
      },
      hit: {
        description: ["You slap the chair, and find that it is slimy. Gross!"],
      },
      use: {
        nextRoom: "deathChair",
      },
    },
    startHole: {
      examine: {
        description: [
          "There's a hole in the floor with a rope leading downward. The rope seems fairly secure.",
        ],
      },
    },
    birdRoomCage: {
      examine: {
        description: [
          "A small sparrow furiously hops around the cage. A small plaque on the cage reads 'Beebee'.",
        ],
      },
      use: { nextRoom: "deathBeebee" },
      hit: {
        description: ["You rattle the cage, angering the tiny bird inside."],
      },
    },
    birdRoomCurtains: {
      examine: {
        description: [
          "The drapes are an unappealing green color, and full of dust.",
        ],
      },
      use: {
        description: [
          "You'd close them, but you're concerned the drape runners would not be silent.",
        ],
      },
      hit: {
        description: [
          "You give the drapes a good slap, releasing a cloud of dust.",
        ],
      },
    },
    birdRoomWindow: {
      examine: {
        description: [
          "The window is open, but the light is blinding. You can't see what's outside.",
        ],
      },
      use: {
        description: [
          "You briefly consider crawling out the window, but your gut tells you this would be a very bad idea.",
        ],
      },
      hit: {
        description: [
          "You try to extend your hand through the open window. An unseen force pushes your hand back in.",
        ],
      },
    },
    atticWindow: {
      examine: {
        description: [
          "The light outside is blinding, making it difficult to see anything.",
        ],
      },
    },
    atticRitual: {
      examine: {
        description: [
          "A strange circle is drawn on the floor, with a candle and a few other items strewn around. It looks like some kind of ritual.",
        ],
      },
      use: {
        description: [
          "You're not really sure how to complete the ritual, or what it is for.",
        ],
      },
      hit: {
        nextRoom: "deathRitual",
      },
    },
    bathroomMirror: {
      examine: { description: ["The mirror is painfully cold to the touch."] },
      use: { description: ["Despite everything, it's still you."] },
      hit: { nextRoom: "deathMirror" },
    },
    bathroomToilet: {
      examine: {
        description: ["Yup. That's a toilet. It's relatively clean, at least."],
      },
      use: {
        description: [
          "You feel like you're being watched, so you decide not to use it.",
        ],
      },
    },
    bathroomTub: {
      examine: {
        description: [
          "The tub hasn't been used in a long time. You wonder if the hot water still works.",
        ],
      },
      use: { nextRoom: "deathBathtub" },
    },
    bathroomSink: {
      use: {
        description: [
          "You turn the faucet, but hear a strange buzzing sound. Nothing comes out.",
        ],
      },
    },
    kitchenFood: {
      examine: {
        description: ["The pie looks and smells great. But why is it here?"],
      },
      use: { nextRoom: "deathFood" },
    },
    kitchenTable: {
      hit: { description: ["Why hit the table when it's already down?"] },
    },
    basementBulb: {
      use: { nextRoom: "deathBulb" },
    },
  }

  const rooms = {
    // rooms
    start: {
      key: "start",
      name: "Storage Room",
      image: "beginning.png",
      exits: { a2: "foyer", c1: "basement" },
      description: [
        "You don't remember how you got here, but you are in a storage room that is not storing very much. A doorway leads out into the foyer, and a hole descends into a very dark area. A dirty chair sits by the door.",
      ],
      actions: {
        // doorway
        c5: actionSets.startDoorway,
        c6: actionSets.startDoorway,
        d5: actionSets.startDoorway,
        d6: actionSets.startDoorway,
        e5: actionSets.startDoorway,
        e6: actionSets.startDoorway,
        // chair
        e7: actionSets.startChair,
        e8: actionSets.startChair,
        f7: actionSets.startChair,
        f8: actionSets.startChair,
        g7: actionSets.startChair,
        g8: actionSets.startChair,
        // hole
        h3: actionSets.startHole,
        h4: actionSets.startHole,
        i3: actionSets.startHole,
        i4: actionSets.startHole,
      },
    },
    foyer: {
      key: "foyer",
      name: "Decrepit Foyer",
      image: "foyer.png",
      exits: {
        a3: "upstairs",
        b2: "kitchen",
        c2: "start",
      },
      description: [
        "Despite being a foyer, there does not seem to be any way to exit the house. A repetitive chirping sound drifts down from upstairs. On the main floor, the door before you leads to the kitchen.",
      ],
    },
    birdRoom: {
      key: "birdRoom",
      name: "Beebee's Room",
      image: "birdcage.png",
      description: [
        "This room has a bright, open window with a small birdcage on a stand. Inside the cage is the source of the chirping. The bird cautiously watches you.",
      ],
      exits: { c2: "upstairs" },
      actions: {
        // cage
        d4: actionSets.birdRoomCage,
        d5: actionSets.birdRoomCage,
        e4: actionSets.birdRoomCage,
        e5: actionSets.birdRoomCage,
        // window
        b3: actionSets.birdRoomWindow,
        b4: actionSets.birdRoomWindow,
        b5: actionSets.birdRoomWindow,
        c3: actionSets.birdRoomWindow,
        c4: actionSets.birdRoomWindow,
        c5: actionSets.birdRoomWindow,
        d3: actionSets.birdRoomWindow,
        // curtains
        a1: actionSets.birdRoomCurtains,
        a2: actionSets.birdRoomCurtains,
        b1: actionSets.birdRoomCurtains,
        b2: actionSets.birdRoomCurtains,
        c1: actionSets.birdRoomCurtains,
        c2: actionSets.birdRoomCurtains,
        d1: actionSets.birdRoomCurtains,
        d2: actionSets.birdRoomCurtains,
        e1: actionSets.birdRoomCurtains,
        e2: actionSets.birdRoomCurtains,
        f1: actionSets.birdRoomCurtains,
        f2: actionSets.birdRoomCurtains,
        g1: actionSets.birdRoomCurtains,
        g2: actionSets.birdRoomCurtains,
        h1: actionSets.birdRoomCurtains,
        h2: actionSets.birdRoomCurtains,
        a6: actionSets.birdRoomCurtains,
        a7: actionSets.birdRoomCurtains,
        b6: actionSets.birdRoomCurtains,
        b7: actionSets.birdRoomCurtains,
        c6: actionSets.birdRoomCurtains,
        c7: actionSets.birdRoomCurtains,
        d6: actionSets.birdRoomCurtains,
        d7: actionSets.birdRoomCurtains,
        e6: actionSets.birdRoomCurtains,
        e7: actionSets.birdRoomCurtains,
        f6: actionSets.birdRoomCurtains,
        f7: actionSets.birdRoomCurtains,
        g6: actionSets.birdRoomCurtains,
        g7: actionSets.birdRoomCurtains,
        h6: actionSets.birdRoomCurtains,
        h7: actionSets.birdRoomCurtains,
      },
    },
    upstairs: {
      key: "upstairs",
      name: "Upstairs Hallway",
      image: "upstairs.png",
      description: [
        "This poorly-lit hallway has several open doorways. A bathroom lies to the west, and an attic entrance to the east. The loud chirps are coming from the room at the end of the hall.",
      ],
      exits: {
        a2: "birdRoom",
        b1: "bathroom",
        b3: "attic",
        c1: "foyer",
      },
    },
    kitchen: {
      key: "kitchen",
      name: "Disused Kitchen",
      image: "kitchen.png",
      description: [
        "This looks like it used to be a kitchen, but nearly everything has been removed. Against all odds, a fragrant cherry pie sits on the floor. It looks like it just came out of the nonexistent oven.",
      ],
      exits: {
        c2: "foyer",
      },
      actions: {
        // pie
        f5: actionSets.kitchenFood,
        f6: actionSets.kitchenFood,
        g5: actionSets.kitchenFood,
        g6: actionSets.kitchenFood,
        // table
        e3: actionSets.kitchenTable,
        f2: actionSets.kitchenTable,
        f3: actionSets.kitchenTable,
        f4: actionSets.kitchenTable,
        g3: actionSets.kitchenTable,
      },
    },
    // diningRoom: {
    //   key: "diningRoom",
    //   name: "Dining Room",
    //   image: "diningRoom.png",
    //   description: [
    //     "Strangely, the dining room is in a much better condition than the rest of the house. The table is set for dessert, with a lovely cherry pie as the centerpiece. One slice of pie sits on a white dish.",
    //   ],
    //   exits: {
    //     a2: "kitchen",
    //     b1: "foyer",
    //   },
    // },
    basement: {
      key: "basement",
      name: "Musty Basement",
      image: "basement.png",
      description: [
        "The basement is dark, and smells a bit moldy. A bare bulb with a long chain hangs in the center of the room. Thankfully, there's a rope leading back up.",
      ],
      exits: {
        a1: "start",
        // b3: "crevice",
      },
      actions: {
        e7: actionSets.basementBulb,
      },
    },
    // crevice: {
    //   key: "crevice",
    //   name: "Eroded Crevice",
    //   image: "crevice.png",
    //   description: [
    //     "The tiny crevice contains all kinds of oddly bioluminescent fungus and strange vines.",
    //   ],
    //   exits: {
    //     b1: "basement",
    //   },
    // },
    // library: {
    //   key: "library",
    //   name: "Overstuffed Library",
    //   image: "library.png",
    //   description: [
    //     "There are so many books, you aren't sure what to look at first. Some are in shelves, while there are quite a few large stacks as well.",
    //   ],
    //   exits: {
    //     c2: "upstairs",
    //   },
    // },
    attic: {
      key: "attic",
      name: "Cramped Attic",
      image: "attic.png",
      description: [
        "The sparse attic is not large enough to stand up in, but has a tiny window. There are some strange looking objects in the corner.",
      ],
      exits: {
        c1: "upstairs",
      },
      actions: {
        e5: actionSets.atticWindow,
        e6: actionSets.atticWindow,
        f8: actionSets.atticRitual,
        f9: actionSets.atticRitual,
        g8: actionSets.atticRitual,
        g9: actionSets.atticRitual,
        h8: actionSets.atticRitual,
        h9: actionSets.atticRitual,
      },
    },
    bathroom: {
      key: "bathroom",
      name: "Bathroom",
      image: "bathroom.png",
      description: [
        "The bathroom is unremarkable. There's a bathtub on one side, toilet on the other, and the mirror and sink are in the middle.",
      ],
      exits: {
        b3: "upstairs",
      },
      actions: {
        // mirror
        b4: actionSets.bathroomMirror,
        b5: actionSets.bathroomMirror,
        b6: actionSets.bathroomMirror,
        c4: actionSets.bathroomMirror,
        c5: actionSets.bathroomMirror,
        c6: actionSets.bathroomMirror,
        // sink
        d4: actionSets.bathroomSink,
        d5: actionSets.bathroomSink,
        d6: actionSets.bathroomSink,
        e5: actionSets.bathroomSink,
        // toilet
        e7: actionSets.bathroomToilet,
        f7: actionSets.bathroomToilet,
        f8: actionSets.bathroomToilet,
        // tub
        e3: actionSets.bathroomTub,
        f3: actionSets.bathroomTub,
        f4: actionSets.bathroomTub,
        g2: actionSets.bathroomTub,
        g3: actionSets.bathroomTub,
        h2: actionSets.bathroomTub,
        h3: actionSets.bathroomTub,
        i2: actionSets.bathroomTub,
      },
    },
    // bedroom: {
    //   key: "bedroom",
    //   name: "Bedroom",
    //   image: "bedroom.png",
    //   description: [
    //     "The bedroom looks fairly comfortable, despite having been uninhabited for quite some time. The bed is still perfectly made.",
    //   ],
    //   exits: {
    //     b1: "upstairs",
    //   },
    // },
    // deaths/tasks
    deathChair: {
      key: "deathChair",
      name: "Have a Seat",
      image: "deathChair.png",
      exits: { b2: "start" },
      description: [
        "As soon as you sit in the chair, disgusting pink tentacles come out of nowhere, enveloping your arms and legs. The acid completely dissolves your flesh and bones.",
      ],
    },
    deathBeebee: {
      key: "deathBeebee",
      name: "Meet Beebee",
      image: "deathBeebee.png",
      exits: { b2: "birdRoom" },
      description: [
        "Upon opening the cage, Beebee quickly escapes. You imagine the bird's instinct would be to fly out the window and enjoy his freedom. However, his first course of action is to launch himself at your face, pecking out your eyes.",
      ],
    },
    deathFood: {
      key: "deathFood",
      name: "Relentless Snacker",
      image: "deathFood.png",
      exits: { b2: "kitchen" },
      description: [
        "You stuff yourself, not questioning the wisdom of eating unattended floor pie. With a mighty rumble, the contents of your stomach begin to expand uncontrollably, tearing you apart from the inside out. The pie has betrayed you. It was delicious, at least.",
      ],
    },
    deathBulb: {
      key: "deathBulb",
      name: "Shed Some Light",
      image: "deathBulb.png",
      exits: { b2: "basement" },
      description: [
        "You try pulling the bulb chain to turn it on. As soon as you make contact with the chain, an incredible amount of electricity courses through your body. For a brief moment, you feel like Zeus himself. Ultimately, you are reduced to a charred husk.",
      ],
    },
    deathCrevice: {
      key: "deathCrevice",
      name: "Slap a Cap",
      image: "deathCrevice.png",
      exits: { b2: "basement" },
      description: [
        "Giving in to intrusive thoughts, you slap the top of the largest mushroom. The agitated cap unfurls, revealing a hideous set of sharp teeth. Isn't nature beautiful and mysterious?",
      ],
    },
    deathBook: {
      key: "deathBook",
      name: "Well Read",
      image: "deathBook.png",
      exits: { b2: "library" },
      description: [
        "Ignoring the laws of physics, you grab a book from the center of a stack and pull it out. An avalanche of books fully engulfs you. As your life flashes before your eyes, you bitterly recall you never enjoyed reading anyway.",
      ],
    },
    deathRitual: {
      key: "deathRitual",
      name: "Ashes to Ashes",
      image: "deathRitual.png",
      exits: { b2: "attic" },
      description: [
        "You accidentally knock over the candle in the center of the ritual. Fire quickly travels throughout the dry, rotted wood in the attic. You are burnt to a crisp.",
      ],
    },
    deathBathtub: {
      key: "deathBathtub",
      name: "Squeaky Clean",
      image: "deathBathtub.png",
      exits: { b2: "bathroom" },
      description: [
        "Black water sputters out of the tub spigot. Suddenly, you have the terrible realization that the water was actually a swarm of flesh-eating bugs. Your skeleton is picked clean within seconds.",
      ],
    },
    deathMirror: {
      key: "deathMirror",
      name: "Chill Out",
      image: "deathMirror.png",
      exits: { b2: "bathroom" },
      description: [
        "Inexplicably, you ram your forehead into the mirror. Also inexplicably, behind the mirror was the virtual nothingness of space. Instantly losing consciousness, you are blissfully unaware as the cold vacuum destroys your body.",
      ],
    },
    deathBed: {
      key: "deathBed",
      name: "Away From the Light",
      image: "deathBed.png",
      exits: { b2: "bedroom" },
      description: [
        "The bed is impossibly soft, and it doesn't take long to fall asleep. Unfortunately, you have a very realistic nightmare that you are falling. You never wake up.",
      ],
    },
    // epilogue
    epilogue: {
      key: "epilogue",
      name: "Quest's End",
      image: "epilogue.png",
      exits: { a2: "start" },
      description: [
        "You have been unceremoniously ejected from the house, and realize you cannot remember anything that happened. You could go back, if you wanted... <br/><br/>Thank you for playing!",
      ],
    },
  }

  const [currentRoom, setCurrentRoom] = useState(rooms.start)
  const [currentDescription, setCurrentDescription] = useState(
    rooms.start.description
  )

  const tasks = [
    {
      key: "deathChair",
      name: "Have a Seat",
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
      name: "Shed Some Light",
    },
    // {
    //   key: "deathCrevice",
    //   name: "Slap a Cap",
    // },
    // {
    //   key: "deathBook",
    //   name: "Well Read",
    // },
    {
      key: "deathRitual",
      name: "Ashes to Ashes",
    },
    {
      key: "deathBathtub",
      name: "Squeaky Clean",
    },
    {
      key: "deathMirror",
      name: "Chill Out",
    },
    // {
    //   key: "deathBed",
    //   name: "Away From the Light",
    // },
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
  const clearVisitedRooms = () => setVisitedRooms([])

  const completedTasks = tasks.filter((task) => visitedRooms.includes(task.key))
  const taskPercentage = (completedTasks.length / tasks.length) * 100

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
