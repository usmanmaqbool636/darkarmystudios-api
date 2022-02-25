// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Star, Check, Trash, Plus } from 'react-feather'

// no need of images
// import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg'
// import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg'
// import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg'
// import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
// import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg'
// import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg'

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

// const colorOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
//   { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
//   { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
// ]
const projects = [
  { value: 'p1', label: 'p1', isFixed: true },
  { value: 'p2', label: 'p2', isFixed: true },
  { value: 'p3', label: 'p3', isFixed: true },
  { value: 'p4', label: 'p4', isFixed: false }
]

const TodoSidebar = props => {

  const [user, selectUser] = useState("")
  
  // ** Props
  const { handleTaskSidebar, setMainSidebar, mainSidebar, dispatch, getTasks, params } = props

  // ** Functions To Handle List Item Filter
  const handleFilter = filter => {
    console.log(params)
    dispatch(getTasks({ ...params, filter }))
  }

  const handleTag = tag => {
    dispatch(getTasks({ ...params, tag }))
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
    console.log(params)
    dispatch(getTasks({ ...params, q:e.label }))
    // selectUser(e.label)
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

            {/* project */}
            <Container>
              
              <Label className='form-label'>Select Project</Label>
              <Select
                // menuIsOpen={true}
                isClearable={false}
                theme={selectThemeColors}
                // defaultValue={[colorOptions[2], colorOptions[3]]}
                // isMulti={false}
                name='project'
                options={projects}
                className='react-select'
                classNamePrefix='select'
                />
                <br/>
              <Label className='form-label'>Select User</Label>
                <Select
                onChange={changeUser}
                  // menuIsOpen={true}
                  isClearable={false}
                  theme={selectThemeColors}
                  // defaultValue={[colorOptions[2], colorOptions[3]]}
                  // isMulti={false}
                  name='user'
                  options={assigneeOptions}
                  className='react-select'
                  classNamePrefix='select'
                />
                
              </Container>
            
            {/*  */}

            <div className='add-task'>
              <Button color='primary' onClick={handleAddClick} block>
                Add Task
              </Button>
            </div>
            <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>
              <ListGroup tag='div' className='list-group-filters'>
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/apps/todo/'}
                  active={params.filter === '' && params.tag === ''}
                  onClick={() => handleFilter('')}
                >
                  <Mail className='me-75' size={18} />
                  <span className='align-middle'>My Tasks</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={'/apps/todo/important'}
                  active={handleActiveItem('important')}
                  onClick={() => handleFilter('important')}
                  action
                >
                  <Star className='me-75' size={18} />
                  <span className='align-middle'>Important</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={'/apps/todo/completed'}
                  active={handleActiveItem('completed')}
                  onClick={() => handleFilter('completed')}
                  action
                >
                  <Check className='me-75' size={18} />
                  <span className='align-middle'>Completed</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={'/apps/todo/deleted'}
                  active={handleActiveItem('deleted')}
                  onClick={() => handleFilter('deleted')}
                  action
                >
                  <Trash className='me-75' size={18} />
                  <span className='align-middle'>Deleted</span>
                </ListGroupItem>
              </ListGroup>
              <div className='mt-3 px-2 d-flex justify-content-between'>
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
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoSidebar
