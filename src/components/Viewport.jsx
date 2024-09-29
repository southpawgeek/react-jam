import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
const Viewport = () => {
  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    currentAction,
    setCurrentAction,
    setCurrentDescription,
  } = useGameProvider()

  const actions = currentRoom.actions

  let currentCursor = "default"

  if (currentAction === "examine") {
    currentCursor = "help"
  }
  if (currentAction === "use") {
    currentCursor = "pointer"
  }
  if (currentAction === "take") {
    currentCursor = "grab"
  }
  if (currentAction === "hit") {
    currentCursor = "grabbing"
  }

  const handleAction = (sector) => {
    if (actions?.[sector]?.[currentAction]?.description) {
      setCurrentDescription(actions[sector][currentAction].description)
      setCurrentAction("")
    }

    if (actions?.[sector]?.[currentAction]?.nextRoom) {
      const nextRoom = rooms[actions[sector][currentAction].nextRoom]
      setCurrentRoom(nextRoom)
      setCurrentDescription(nextRoom.description)
      setCurrentAction("")
    }
  }

  return (
    <div
      id="viewport"
      className={css`
        background: url(/react-jam/images/${currentRoom?.image});
        background-size: cover;
        cursor: ${currentCursor};
      `}
    >
      <table id="actions-grid">
        <tbody>
          <tr>
            <td onClick={() => handleAction("a1")}></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Viewport
