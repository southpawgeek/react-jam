import Wrapper from "./components/Wrapper"
import Viewport from "./components/Viewport"
import Inventory from "./components/Inventory"
import MoveGrid from "./components/MoveGrid"
import Description from "./components/Description"
import { GameProvider } from "./components/GameProvider"

function App() {
  return (
    <GameProvider>
      <Wrapper>
        <Viewport />
        <Inventory />
        <MoveGrid />
        <Description />
      </Wrapper>
    </GameProvider>
  )
}

export default App
