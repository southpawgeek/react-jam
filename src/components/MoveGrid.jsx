import { useGameProvider } from "./GameProvider"
import useSound from "use-sound"
import soundMove from "../sounds/move.wav"

const MoveGrid = () => {
  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    setCurrentDescription,
    addVisitedRoom,
  } = useGameProvider()
  const exits = currentRoom.exits

  const [move] = useSound(soundMove, { playbackRate: 2 })

  const handleExit = (exit) => {
    setCurrentRoom(exit)
    setCurrentDescription(exit.description)
    addVisitedRoom(exit.key)
    move()
  }

  const Exit = ({ exitName }) => {
    const exit = rooms[exitName]
    return (
      <td
        className="exit"
        data-exit={rooms[exitName]?.name || "N/A"}
      >
        <button onClick={() => handleExit(exit)} />
      </td>
    )
  }
  const NoExit = () => <td className="no-exit"></td>

  // 3x3 movement grid
  const rows = [
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
  ]

  return (
    <div id="move-grid">
      <h2>Map</h2>
      <table>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) =>
                exits?.[cell] ? (
                  <Exit
                    key={cell}
                    exitName={exits[cell]}
                  />
                ) : (
                  <NoExit key={cell} />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MoveGrid
