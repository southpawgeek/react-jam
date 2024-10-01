import { useGameProvider } from "./GameProvider"

const MoveGrid = () => {
  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    setCurrentDescription,
    addVisitedRoom,
  } = useGameProvider()
  const exits = currentRoom.exits

  const handleExit = (exit) => {
    setCurrentRoom(exit)
    setCurrentDescription(exit.description)
    addVisitedRoom(exit.key)
  }

  const Exit = ({ exitName }) => {
    const exit = rooms[exitName]
    return (
      <td className="exit" data-exit={rooms[exitName]?.name || 'N/A'}>
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
    <table id="move-grid">
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
  )
}

export default MoveGrid
