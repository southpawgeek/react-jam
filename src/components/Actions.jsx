import { useGameProvider } from "./GameProvider"

const Actions = () => {
  const { currentRoom, setCurrentDescription, actions, currentAction, setCurrentAction } = useGameProvider()

  const handleSelect = (action) => {
    setCurrentAction(action)
    const description = `What would you like to ${action}?`
    setCurrentDescription([description])
  }

  const handleCancel = () => {
    setCurrentAction("")
    setCurrentDescription(currentRoom.description)
  }

  const Active = ({ action }) => (
    <>
      <span className='active-action'>{action}</span>
      &nbsp;
      <span
        className='active-cancel'
        onClick={() => handleCancel()}
      >
        x
      </span>
    </>
  )

  const Inactive = ({ action }) => (
    <span
      className='inactive-action'
      onClick={() => {
        handleSelect(action)
      }}
    >
      {action}
    </span>
  )

  return (
    <div id='actions'>
      <h2>Actions</h2>
      <hr />
      <ul>
        {actions.map((action) => (
          <li key={action}>
            {action === currentAction ? (
              <Active action={action} />
            ) : (
              <Inactive action={action} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Actions
