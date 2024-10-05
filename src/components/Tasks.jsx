import { useGameProvider } from "./GameProvider"

const Tasks = () => {
  const { tasks, visitedRooms } = useGameProvider()

  const taskClass = (task) => {
    if (visitedRooms.includes(task.key)) {
      return "task-completed"
    }
  }

  return (
    <div id="tasks">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.key}
            className={taskClass(task)}
          >
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks
