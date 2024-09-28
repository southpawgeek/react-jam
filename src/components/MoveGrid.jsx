import { useGameProvider } from "./GameProvider"

const MoveGrid = () => {
  const { rooms, currentRoom, setCurrentRoom } = useGameProvider()
  const exits = currentRoom.exits

  const Exit = ({ exitName }) => {
    const exit = rooms[exitName]
    return (
      <td className="exit">
        <button onClick={() => setCurrentRoom(exit)} />
      </td>
    )
  }
  const NoExit = () => <td className="no-exit"></td>

  return (
    <table id="move-grid">
      <tbody>
        <tr>
          {exits?.a1 ? <Exit exitName={exits.a1} /> : <NoExit />}
          {exits?.a2 ? <Exit exitName={exits.a2} /> : <NoExit />}
          {exits?.a3 ? <Exit exitName={exits.a3} /> : <NoExit />}
        </tr>
        <tr>
          {exits?.b1 ? <Exit exitName={exits.b1} /> : <NoExit />}
          {exits?.b2 ? <Exit exitName={exits.b2} /> : <NoExit />}
          {exits?.b3 ? <Exit exitName={exits.b3} /> : <NoExit />}
        </tr>
        <tr>
          {exits?.c1 ? <Exit exitName={exits.c1} /> : <NoExit />}
          {exits?.c2 ? <Exit exitName={exits.c2} /> : <NoExit />}
          {exits?.c3 ? <Exit exitName={exits.c3} /> : <NoExit />}
        </tr>
      </tbody>
    </table>
  )
}

export default MoveGrid
