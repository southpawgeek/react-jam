import { useGameProvider } from "./GameProvider"
const Viewport = () => {
  const { currentRoom } = useGameProvider()
  return <div id="viewport">{currentRoom.name}</div>
}

export default Viewport
