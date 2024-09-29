import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
import { useState } from "react"
const Viewport = () => {
  const { currentRoom, currentAction } = useGameProvider()

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

  return (
    <div
      id='viewport'
      className={css`
        background: url(/react-jam/images/${currentRoom?.image});
        background-size: cover;
        cursor: ${currentCursor};
      `}
    ></div>
  )
}

export default Viewport
