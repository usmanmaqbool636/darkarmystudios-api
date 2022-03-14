// ** React Imports
import { Link } from 'react-router-dom'
import React from 'react'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Star, Check, Trash, Plus } from 'react-feather'


// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Label, Container } from 'reactstrap'


const assigneeOptions = [
  { value: 'pheobe', label: 'Pheobe Buffay' },
  { value: 'chandler', label: 'Chandler Bing' },
  { value: 'ross', label: 'Ross Geller' },
  { value: 'monica', label: 'Monica Geller' },
  { value: 'joey', label: 'Joey Tribbiani' },
  { value: 'Rachel', label: 'Rachel Green' }
]

const projects = [
  { value: 'p1', label: 'p1', isFixed: true },
  { value: 'p2', label: 'p2', isFixed: true },
  { value: 'p3', label: 'p3', isFixed: true },
  { value: 'p4', label: 'p4', isFixed: false }
]

const TodoSidebar = props => {
  
  // ** Props
  const { handleTaskSidebar, setMainSidebar, mainSidebar, dispatch, getProjects, params } = props

  // ** Functions To Handle List Item Filter
  const handleFilter = filter => {
    console.log(params)
    dispatch(getProjects({ ...params, filter }))
  }

  const handleTag = tag => {
    dispatch(getProjects({ ...params, tag }))
  }

  // ** Functions To Active List Item
  const handleActiveItem = value => {
    if ((params.filter && params.filter === value) || (params.tag && params.tag === value)) {
      return true
    } else {
      return false
    }
  }

  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    handleTaskSidebar()
    setMainSidebar()
  }
  const changeUser = (e) => {
    dispatch(getProjects({ ...params, q:e.label }))
  }

  return (
    <div
      className={classnames('sidebar-left', {
        show: mainSidebar === true
      })}
    >
      <div className='sidebar'>
        <div className='sidebar-content todo-sidebar'>
          <div className='todo-app-menu'>

            <div className='add-task'>
              <Button color='primary' onClick={handleAddClick} block>
                Create Project
              </Button>
            </div>
            <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>
              <ListGroup tag='div' className='list-group-filters'>
                <ListGroupItem
                  action
                  tag={Link}
                  to={`/apps/project/`}
                  active={params.filter === '' && params.tag === ''}
                  onClick={() => handleFilter('')}
                >
                  <Mail className='me-75' size={18} />
                  <span className='align-middle'>My Project</span>
                </ListGroupItem>
                <ListGroupItem
                  // disabled={true}
                  tag={Link}
                  to={'/apps/project/important'}
                  active={handleActiveItem('important')}
                  onClick={() => handleFilter('important')}
                  action
                >
                  <Star className='me-75' size={18} />
                  <span className='align-middle'>Important</span>
                </ListGroupItem>
                {/* No need of completed project  */}
                {/* <ListGroupItem
                  disabled={true}
                  tag={Link}
                  to={'/apps/project/completed'}
                  active={handleActiveItem('completed')}
                  onClick={() => handleFilter('completed')}
                  action
                >
                  <Check className='me-75' size={18} />
                  <span className='align-middle'>Completed</span>
                </ListGroupItem> */}
                <ListGroupItem
                  // disabled={true}
                  tag={Link}
                  to={'/apps/project/deleted'}
                  active={handleActiveItem('deleted')}
                  onClick={() => handleFilter('deleted')}
                  action
                >
                  <Trash className='me-75' size={18} />
                  <span className='align-middle'>Deleted</span>
                </ListGroupItem>
              </ListGroup>
              {/* may be used in future so don't remove just commented */}
              {/* <div className='mt-3 px-2 d-flex justify-content-between'>
                <h6 className='section-label mb-1'>Tags</h6>
                <Plus className='cursor-pointer' size={14} />
              </div>
              <ListGroup className='list-group-labels'>
                <ListGroupItem
                  active={handleActiveItem('team')}
                  className='d-flex align-items-center'
                  tag={Link}
                  to='/apps/todo/tag/team'
                  onClick={() => handleTag('team')}
                  action
                >
                  <span className='bullet bullet-sm bullet-primary me-1'></span>
                  <span className='align-middle'>Team</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('low')}
                  className='d-flex align-items-center'
                  tag={Link}
                  to='/apps/todo/tag/low'
                  onClick={() => handleTag('low')}
                  action
                >
                  <span className='bullet bullet-sm bullet-success me-1'></span>
                  <span className='align-middle'>Low</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('medium')}
                  className='d-flex align-items-center'
                  tag={Link}
                  to='/apps/todo/tag/medium'
                  onClick={() => handleTag('medium')}
                  action
                >
                  <span className='bullet bullet-sm bullet-warning me-1'></span>
                  <span className='align-middle'>Medium</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('high')}
                  className='d-flex align-items-center'
                  tag={Link}
                  to='/apps/todo/tag/high'
                  onClick={() => handleTag('high')}
                  action
                >
                  <span className='bullet bullet-sm bullet-danger me-1'></span>
                  <span className='align-middle'>High</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('update')}
                  className='d-flex align-items-center'
                  tag={Link}
                  to='/apps/todo/tag/update'
                  onClick={() => handleTag('update')}
                  action
                >
                  <span className='bullet bullet-sm bullet-info me-1'></span>
                  <span className='align-middle'>Update</span>
                </ListGroupItem>
              </ListGroup> */}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoSidebar
