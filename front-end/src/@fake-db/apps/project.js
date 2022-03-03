import mock from '../mock'
import { PROJECTS } from "./constant"
import { nanoid } from '@reduxjs/toolkit'

const data = {
  projects: [
    {
      id: nanoid(),
      title: 'Fix Responsiveness for new structure 💻',
      dueDate: '2020-11-18',
      createdAt: '2020-11-18',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: [],
      tags: ['low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true,
      totalTask:10,
      completedTask:5
    },
    {
      id: nanoid(),
      title: 'Fix Responsiveness for new structure 💻',
      dueDate: '2020-11-18',
      createdAt: '2020-11-18',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: [],
      tags: ['low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true,
      totalTask:10,
      completedTask:5
    }
  ]
}

// ------------------------------------------------
// GET: Return Projects
// ------------------------------------------------
// with localstorage
mock.onGet('/apps/projects').reply(config => {
  let projects = []
  if (!localStorage.getItem(PROJECTS)) {
    localStorage.setItem(PROJECTS, JSON.stringify(data.projects))
    projects = data.projects
  } else {
    projects = JSON.parse(localStorage.getItem(PROJECTS))
  }
  // eslint-disable-next-line object-curly-newline
  const { q, filter, tag, sortBy: sortByParam = 'latest' } = config.params
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
  const sortedData = projects.sort(sortTasks(sortBy))
  if (sortDesc) sortedData.reverse()
  return [200, sortedData]
})
// ------------------------------------------------
// POST: Add new Project
// ------------------------------------------------
// with local storage
mock.onPost('/apps/project/add').reply(config => {
  const projects = JSON.parse(localStorage.getItem(PROJECTS)) || data.projects

  const { project } = JSON.parse(config.data)

  const { length } = projects
  let lastIndex = 0
  if (length) {
    lastIndex = projects[length - 1].id
  }
  project.id = nanoid()

  projects.push(project)
  localStorage.setItem(PROJECTS, JSON.stringify(projects))

  return [201, { project }]
})

// ------------------------------------------------
// POST: Update Project
// ------------------------------------------------
// update projects with local storage
mock.onPost('/apps/todo/update').reply(config => {
  let projects = JSON.parse(localStorage.getItem(PROJECTS)) || data.projects
  const projectData = JSON.parse(config.data).project
  // Convert Id to number
  projectData.id = projectData.id
  projects = projects.map(project => project.id === projectData.id ? projectData : project)
  
  localStorage.setItem(PROJECTS, JSON.stringify(projects))

  return [200, { project:projectData }]
})

// ------------------------------------------------
// DELETE: Remove Project
// ------------------------------------------------
// with localstorage
mock.onDelete('/apps/todo/delete-project').reply(config => {
  let projects = JSON.parse(localStorage.getItem(PROJECTS)) || data.projects
  // Get task id from URL
  let taskId = config.taskId

  taskId = taskId
  projects = projects.filter(task => task.id !== taskId)
  localStorage.setItem(PROJECTS, JSON.stringify(projects))
  return [200]
})
