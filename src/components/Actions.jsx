import { useGameProvider } from "./GameProvider"

const Actions = () => {
  const { actions, currentAction, setCurrentAction } = useGameProvider()

  const Active = ({ action }) => (
    <>
      <span className='active-action'>{action}</span>
      &nbsp;
      <span
        className='active-cancel'
        onClick={() => setCurrentAction("")}
      >
        x
      </span>
    </>
  )

  const Inactive = ({ action }) => (
    <span
      className='inactive-action'
      onClick={() => {
        setCurrentAction(action)
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
          <li>
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
