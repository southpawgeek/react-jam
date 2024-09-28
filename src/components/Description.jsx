import { ReactTyped } from "react-typed"
import { useGameProvider } from "./GameProvider"
const Description = () => {
  const { currentRoom } = useGameProvider()
  return (
    <div id="description">
      <h1>{currentRoom.name}</h1>
      <p>
        <ReactTyped
          strings={currentRoom.description}
          typeSpeed={20}
          showCursor={false}
        />
      </p>
    </div>
  )
}

export default Description
