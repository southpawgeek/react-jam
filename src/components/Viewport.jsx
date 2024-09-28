import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
const Viewport = () => {
  const { currentRoom } = useGameProvider()
  return (
    <div
      id="viewport"
      className={css`
        background: url(/react-jam/images/${currentRoom?.image});
        background-size: cover;
      `}
    ></div>
  )
}

export default Viewport
