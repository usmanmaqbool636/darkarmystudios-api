// ** React Imports
import { Link, useLocation, useHistory } from 'react-router-dom'

import moment from "moment"
// ** Custom Components
import Avatar from '@components/avatar'

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Menu, Search, MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import {
  Input,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner
} from 'reactstrap'
import React, { useEffect } from 'react'
import Task from './Task'
import { useDispatch } from 'react-redux'
import { getTasks, reOrderTasks, selectTask } from './store'

const Tasks = props => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    store,
    query,
    tasks,
    params,
    setSort,
    setQuery,
    handleTaskSidebar,
    handleMainSidebar
  } = props

    // ** Function to selectTask on click
    const handleTaskClick = obj => {
      dispatch(selectTask(obj))
      handleTaskSidebar()
      const queryParams = new URLSearchParams(location.search)
      if (queryParams.has('taskid')) {
        queryParams.delete('taskid')
        history.replace({
          search: queryParams.toString()
        })
      }
    }

    useEffect(() => {
      // const search = location.search // result: '?taskid=abc'
      const queryParams = new URLSearchParams(location.search)
      const taskid = queryParams.get('taskid')
      const task = tasks.find(t => t.id === Number(taskid))
      if (task) {
        handleTaskClick(task)
      }
    }, [location, tasks])
  
  // ** Props

  // ** Returns avatar color based on task tag
  const resolveAvatarVariant = tags => {
    if (tags.includes('high')) return 'light-primary'
    if (tags.includes('medium')) return 'light-warning'
    if (tags.includes('low')) return 'light-success'
    if (tags.includes('update')) return 'light-danger'
    if (tags.includes('team')) return 'light-info'
    return 'light-primary'
  }

  // ** Renders task tags
  const renderTags = arr => {
    const badgeColor = {
      team: 'light-primary',
      low: 'light-success',
      medium: 'light-warning',
      high: 'light-danger',
      update: 'light-info'
    }

    return arr.map(item => (
      <Badge className='text-capitalize' key={`badge-${item}`} color={badgeColor[item]} pill>
        {item}
      </Badge>
    ))
  }

  // ** Renders Avatar
  const renderAvatar = obj => {
    const item = obj.assignee

    if (item.avatar === undefined || item.avatar === null) {
      return <Avatar img={blankAvatar} imgHeight='32' imgWidth='32' />
    } else if (item.avatar !== '') {
      return <Avatar img={item.avatar} imgHeight='32' imgWidth='32' />
    } else {
      return <Avatar color={resolveAvatarVariant(obj.tags)} content={item.fullName} initials />
    }
  }

  const renderTasks = () => {
    if (store.isLoading) {
      return (
        <div  className='mt-2 d-flex justify-content-center'>
          <Spinner />
        </div>
      )
    }
    return (
      <PerfectScrollbar
        className='list-group todo-task-list-wrapper'
        options={{ wheelPropagation: false }}
        containerRef={ref => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect()

              return { ...original, height: Math.floor(original.height) }
            }
          }
        }}
      >
        {tasks.length ? (
          <ReactSortable
            tag='ul'
            list={tasks}
            handle='.drag-icon'
            className='todo-task-list media-list'
            setList={newState => dispatch(reOrderTasks(newState))}
          >
            {tasks.map(item => {
              return <Task
                key={`task-${item._id}`} 
                item={item}
                handleTaskClick={handleTaskClick}

              />
            })}
          </ReactSortable>
        ) : (
          <div className='no-results show'>
            <h5>No Items Found</h5>
          </div>
        )}
      </PerfectScrollbar>
    )
  }

  // ** Function to getTasks based on search query
  const handleFilter = e => {
    setQuery(e.target.value)
    dispatch(getTasks(params))
  }

  // ** Function to getTasks based on sort
  const handleSort = (e, val) => {
    e.preventDefault()
    setSort(val)
    dispatch(getTasks({ ...params }))
  }

  return (
    <div className='todo-app-list'>
      <div className='app-fixed-search d-flex align-items-center'>
        <div className='sidebar-toggle cursor-pointer d-block d-lg-none ms-1' onClick={handleMainSidebar}>
          <Menu size={21} />
        </div>
        <div className='d-flex align-content-center justify-content-between w-100'>
          <InputGroup className='input-group-merge'>
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
            <Input placeholder='Search task' value={query} onChange={handleFilter} />
          </InputGroup>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle className='hide-arrow me-1' tag='a' href='/' onClick={e => e.preventDefault()}>
            <MoreVertical className='text-body' size={16} />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to='/' onClick={e => handleSort(e, 'title-asc')}>
              Sort A-Z
            </DropdownItem>
            <DropdownItem tag={Link} to='/' onClick={e => handleSort(e, 'title-desc')}>
              Sort Z-A
            </DropdownItem>
            <DropdownItem tag={Link} to='/' onClick={e => handleSort(e, 'assignee')}>
              Sort Assignee
            </DropdownItem>
            <DropdownItem tag={Link} to='/' onClick={e => handleSort(e, 'due-date')}>
              Sort Due Date
            </DropdownItem>
            <DropdownItem tag={Link} to='/' onClick={e => handleSort(e, '')}>
              Reset Sort
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      {renderTasks()}
    </div>
  )
}

export default Tasks
