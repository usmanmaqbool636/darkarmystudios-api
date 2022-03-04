import mock from '../mock'
import { TASKS } from "./constant"
import { nanoid } from '@reduxjs/toolkit'
// TODO Wrap Mock API handler with "try catch"
const data = {
  tasks: [
    {
      id: nanoid(),
      title: 'Entire change break our wife wide it daughter mention member.',
      dueDate: '2020-11-25',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Jacob Ramirez',
        avatar: require('@src/assets/images/avatars/12.png').default
      },
      project:"p1",
      tags: ['update'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    }
  ]
}

// ------------------------------------------------
// GET: Return Tasks
// ------------------------------------------------
// with localstorage
mock.onGet('/apps/todo/tasks').reply(config => {
  try {
  let tasks = []
  if (!localStorage.getItem(TASKS)) {
    localStorage.setItem(TASKS, JSON.stringify(data.tasks))
    tasks = data.tasks
  } else {
    tasks = JSON.parse(localStorage.getItem(TASKS))
  }
  // eslint-disable-next-line object-curly-newline
  const { q, filter, tag, sortBy: sortByParam = 'latest', assignee, project } = config.params
  /* eslint-enable */
  // ------------------------------------------------
  // Get Sort by and Sort Direction
  // ------------------------------------------------
  let sortDesc = true

  const sortBy = (() => {
    if (sortByParam === 'title-asc') {
      sortDesc = false
      return 'title'
    }
    if (sortByParam === 'title-desc') return 'title'
    if (sortByParam === 'assignee') {
      sortDesc = false
      return 'assignee'
    }
    if (sortByParam === 'due-date') {
      sortDesc = false
      return 'dueDate'
    }
    return 'id'
  })()

  // ------------------------------------------------
  // Filtering
  // ------------------------------------------------
  const queryLowered = q.toLowerCase()

  const hasFilter = task => {
    if (filter === 'important') return task.isImportant && !task.isDeleted
    if (filter === 'completed') return task.isCompleted && !task.isDeleted
    if (filter === 'deleted') return task.isDeleted
    return !task.isDeleted
  }

  const includesFilter = task => task.tags.includes(queryLowered) || task.tags.some(tag => tag.includes(queryLowered))

  const includesDueDate = task => {
    const date = new Date(task.dueDate).getDate().toString().padStart(2, '0')
    const month = new Date(task.dueDate).toLocaleString('default', { month: 'short' }).toLowerCase()
    const dateMonth = `${date} ${month}`
    const monthDate = `${month} ${date}`

    return (
      date.includes(queryLowered) ||
      month.includes(queryLowered) ||
      dateMonth.includes(queryLowered) ||
      monthDate.includes(queryLowered)
    )
  }

  /* eslint-disable */
  const filteredData = tasks.filter(task => {
    if (filter || tag) {
      return (
        task.title.toLowerCase().includes(queryLowered) && hasFilter(task) && (tag ? task.tags.includes(tag) : true)
      )
    } else {
      return task.title.toLowerCase().includes(queryLowered) || includesFilter(task) || includesDueDate(task)
    }
  })
  /* eslint-enable  */

  // ------------------------------------------------
  // Perform sorting
  // ------------------------------------------------
  const sortTasks = key => (a, b) => {
    let fieldA
    let fieldB

    // If sorting is by dueDate => Convert data to date
    if (key === 'dueDate') {
      fieldA = new Date(a[key])
      fieldB = new Date(b[key])
      // eslint-disable-next-line brace-style
    }

    // If sorting is by assignee => Use `fullName` of assignee
    else if (key === 'assignee') {
      fieldA = a.assignee ? a.assignee.fullName : null
      fieldB = b.assignee ? b.assignee.fullName : null
    } else {
      fieldA = a[key]
      fieldB = b[key]
    }

    let comparison = 0

    if (fieldA === fieldB) {
      comparison = 0
    } else if (fieldA === null) {
      comparison = 1
    } else if (fieldB === null) {
      comparison = -1
    } else if (fieldA > fieldB) {
      comparison = 1
    } else if (fieldA < fieldB) {
      comparison = -1
    }

    return comparison
  }

  // Sort Data
  const sortedData = filteredData.sort(sortTasks(sortBy))
  if (sortDesc) sortedData.reverse()
  const projectregex = new RegExp(`${project}`, "gi")
  const projectFilter = sortedData.filter(task => {
    return (task.project || "" ).match(projectregex)
  }) 

  const assigneeFilter = projectFilter.filter(task => {
    const regex = new RegExp(`${assignee}`, "gi")
    return task.assignee.fullName.match(regex)
  })
  // const queryTask = sortedData.filter(task => task.assignee.fullName === RegExp(q))
  return [200, assigneeFilter] 

  } catch (error) {
    console.log(error)  
  }
})
// ------------------------------------------------
// POST: Add new task
// ------------------------------------------------
// with local storage
mock.onPost('/apps/todo/add-tasks').reply(config => {
  // Get event from post data
  const tasks = JSON.parse(localStorage.getItem(TASKS)) || data.tasks

  const { task } = JSON.parse(config.data)

  // const { length } = tasks
  // let lastIndex = 0
  // if (length) {
  //   lastIndex = tasks[length - 1].id
  // }
  task.id = nanoid()

  tasks.push(task)
  localStorage.setItem(TASKS, JSON.stringify(tasks))

  return [201, { task }]
})

// ------------------------------------------------
// POST: Update Task
// ------------------------------------------------
// update tasks with local storage
mock.onPost('/apps/todo/update-task').reply(config => {
  let tasks = JSON.parse(localStorage.getItem(TASKS)) || data.tasks
  const taskData = JSON.parse(config.data).task
  // Convert Id to number
  if (taskData.isCompleted && !taskData.completedAt) {
    taskData.completedAt = new Date()
  } else {
    taskData.completedAt = undefined
  }
  taskData.id = taskData.id
  tasks = tasks.map(task => task.id === taskData.id ? taskData : task)
  
  localStorage.setItem(TASKS, JSON.stringify(tasks))

  return [200, { task:taskData }]
})

// ------------------------------------------------
// DELETE: Remove Task
// ------------------------------------------------
// with localstorage
mock.onDelete('/apps/todo/delete-task').reply(config => {
  let tasks = JSON.parse(localStorage.getItem(TASKS)) || data.tasks
  // Get task id from URL
  let taskId = config.taskId
  taskId = taskId
  tasks = tasks.filter(task => task.id !== taskId)
  localStorage.setItem(TASKS, JSON.stringify(tasks))
  return [200]
})
