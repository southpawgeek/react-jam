import { useGameProvider } from "./GameProvider"
const Description = () => {
  const { currentRoom } = useGameProvider()
  return <div id="description">{currentRoom.description}</div>
}

export default Description
