import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
const Viewport = () => {
  const {
    currentRoom,
    currentAction,
    setCurrentAction,
    setCurrentDescription,
  } = useGameProvider()

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
    if (currentAction) {
      setCurrentDescription([
        `You ${currentAction} the ${sector} sector. Placeholder text occurs.`,
      ])
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
