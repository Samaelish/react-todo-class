import React from 'react'

class Task {
  constructor(id, title, isCompleted = false) {
    this.id = id
    this.title = title
    this.isCompleted = isCompleted
  }

  toggleStatus() {
    this.isCompleted = !this.isCompleted
  }

  getStatus() {
    return this.isCompleted ? 'Выполнено' : 'В процессе'
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [new Task(1, 'Изучить React'), new Task(2, 'Написать ToDo List')],
      newTaskTitle: '',
    }
  }

  // Добавление задачи (инкапсуляция логики)
  addTask = e => {
    e.preventDefault()
    const { tasks, newTaskTitle } = this.state
    if (!newTaskTitle) return

    this.setState({
      tasks: [...tasks, new Task(Date.now(), newTaskTitle)],
      newTaskTitle: '',
    })
  }

  // Удаление задачи
  deleteTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
    })
  }

  // Переключение статуса (делегирование метода класса Task)
  toggleTaskStatus = taskId => {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === taskId) {
          task.toggleStatus() // Вызов метода модели Task
        }
        return task
      }),
    })
  }

  render() {
    const { tasks, newTaskTitle } = this.state

    return (
      <div className='todo-list'>
        <form onSubmit={this.addTask}>
          <input
            type='text'
            value={newTaskTitle}
            onChange={e => this.setState({ newTaskTitle: e.target.value })}
            placeholder='Новая задача'
          />
          <button type='submit'>Добавить</button>
        </form>

        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <span
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                }}
              >
                {task.title} ({task.getStatus()})
              </span>
              <button onClick={() => this.toggleTaskStatus(task.id)}>Переключить статус</button>
              <button onClick={() => this.deleteTask(task.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoList
