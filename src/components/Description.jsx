import { ReactTyped } from "react-typed"
import { useGameProvider } from "./GameProvider"
const Description = () => {
  const { currentRoom } = useGameProvider()
  return (
    <div id="description">
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
