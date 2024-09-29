import { useGameProvider } from "./GameProvider"

const Inventory = () => {
  const { inventory } = useGameProvider()
  return (
    <div id="inventory">
      <h2>Inventory</h2>
      <hr />
      <ul>
        {inventory.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Inventory
