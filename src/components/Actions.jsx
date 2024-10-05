import { useGameProvider } from "./GameProvider"
import useSound from "use-sound"
import soundBoop from "../sounds/boop.wav"
import soundExit from "../sounds/exit.wav"

const Actions = () => {
  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    clearVisitedRooms,
    setCurrentDescription,
    actions,
    currentAction,
    setCurrentAction,
    taskPercentage,
  } = useGameProvider()

  const [boop] = useSound(soundBoop)
  const [cancelBoop] = useSound(soundBoop, { playbackRate: 0.5 })
  const [done] = useSound(soundExit)

  const handleSelect = (action) => {
    setCurrentAction(action)
    const description = `What would you like to ${action}?`
    setCurrentDescription([description])
    boop()
  }

  const handleCancel = () => {
    setCurrentAction("default")
    setCurrentDescription(currentRoom.description)
    cancelBoop()
  }

  const completeGame = () => {
    if (taskPercentage === 100) {
      setCurrentRoom(rooms.epilogue)
      setCurrentDescription(rooms.epilogue.description)
      clearVisitedRooms()
      done()
    } else {
      setCurrentDescription([
        "You aren't sure how you would leave the house. Perhaps you have some unfinished business here?",
      ])
      cancelBoop()
    }
  }

  const Active = ({ action }) => (
    <>
      <span className="active-action">{action}</span>
      &nbsp;
      <span
        className="active-cancel"
        onClick={() => handleCancel()}
      >
        [x]
      </span>
    </>
  )

  const Inactive = ({ action }) => (
    <span
      className="inactive-action"
      onClick={() => {
        handleSelect(action)
      }}
    >
      {action}
    </span>
  )

  const Leave = () => (
    <span
      className={taskPercentage === 100 ? "glow" : "inactive-action"}
      onClick={() => completeGame()}
    >
      Leave?
    </span>
  )

  return (
    <div id="actions">
      <h2>Actions</h2>
      <ul>
        {actions.map((action) => (
          <li key={action}>
            {action === currentAction ? (
              <Active action={action} />
            ) : (
              <Inactive action={action} />
            )}
          </li>
        ))}
        {currentRoom.key !== "epilogue" ? (
          <li>
            <Leave />
          </li>
        ) : null}
      </ul>
    </div>
  )
}

export default Actions
