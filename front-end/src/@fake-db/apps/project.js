import mock from '../mock'
import { PROJECTS } from "./constant"

const data = {
  projects: [
    {
      id: 18,
      title: 'Fix Responsiveness for new structure 💻',
      dueDate: '2020-11-18',
      createdAt: '2020-11-18',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Danielle Anderson',
        avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
      },
      tags: ['low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true
    },
    {
      id: 10,
      title: 'Fix Responsiveness for new structure 💻',
      dueDate: '2020-11-18',
      createdAt: '2020-11-18',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Danielle Anderson',
        avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
      },
      tags: ['low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true
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

  /* eslint-disable */
  // const filteredData = projects.filter(project => {
  //   if (filter || tag) {
  //     return (
  //       project.title.toLowerCase().includes(queryLowered) && hasFilter(project) && (tag ? project.tags.includes(tag) : true)
  //     )
  //   } else {
  //     return project.title.toLowerCase().includes(queryLowered) || includesFilter(project) || includesDueDate(project)
  //   }
  // })
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
  // working but somehow  "q" is overwrites with empty string q = ''
  // const queryTask = sortedData.filter(task => {
  //   const regex = new RegExp(`${q}`, "gi")
  //   return task.assignee.fullName.match(regex)
  // })
  // const queryTask = sortedData.filter(task => task.assignee.fullName === RegExp(q))
  return [200, sortedData]
})
// ------------------------------------------------
// POST: Add new Project
// ------------------------------------------------
// with local storage
mock.onPost('/apps/project/add').reply(config => {
  // Get event from post data
  const projects = JSON.parse(localStorage.getItem(PROJECTS)) || data.projects

  const { project } = JSON.parse(config.data)

  const { length } = projects
  let lastIndex = 0
  if (length) {
    lastIndex = projects[length - 1].id
  }
  project.id = lastIndex + 1

  projects.push(project)
  localStorage.setItem(PROJECTS, JSON.stringify(projects))

  return [201, { project }]
})

// ------------------------------------------------
// POST: Update Project
// ------------------------------------------------
// update projects with local storage
mock.onPost('/apps/todo/update-project').reply(config => {
  let projects = JSON.parse(localStorage.getItem(PROJECTS)) || data.projects
  const taskData = JSON.parse(config.data).task
  // Convert Id to number
  taskData.id = Number(taskData.id)
  projects = projects.map(task => task.id === taskData.id ? taskData : task)
  
  localStorage.setItem(PROJECTS, JSON.stringify(projects))

  return [200, { task:taskData }]
})

// ------------------------------------------------
// DELETE: Remove Project
// ------------------------------------------------
// with localstorage
mock.onDelete('/apps/todo/delete-project').reply(config => {
  let projects = JSON.parse(localStorage.getItem(PROJECTS)) || data.projects
  // Get task id from URL
  let taskId = config.taskId

  // Convert Id to number
  taskId = Number(taskId)
  projects = projects.filter(task => task.id !== taskId)
  localStorage.setItem(PROJECTS, JSON.stringify(projects))
  return [200]
})
