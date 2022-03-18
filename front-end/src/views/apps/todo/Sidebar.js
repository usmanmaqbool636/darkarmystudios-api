// ** React Imports
import { Link, useLocation, useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Star, Check, Trash, Plus } from 'react-feather'


// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Label, Container } from 'reactstrap'


const assigneeOptions = [
  { value: '', label: 'All' },
  { value: 'pheobe', label: 'Pheobe Buffay' },
  { value: 'chandler', label: 'Chandler Bing' },
  { value: 'ross', label: 'Ross Geller' },
  { value: 'monica', label: 'Monica Geller' },
  { value: 'joey', label: 'Joey Tribbiani' },
  { value: 'Rachel', label: 'Rachel Green' }
]

// custome Hook that will be seprate hook file but for now use in the same file
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const TodoSidebar = props => {
  const query = useQuery()
  const history = useHistory()
  // ** Props
  const { handleTaskSidebar, setMainSidebar, mainSidebar, dispatch, getTasks, params, setAssignee, setProject, project, projectNames, setFilter } = props
  const handleActiveItem = value => {
    // if ((params.filter && params.filter === value) || (params.tag && params.tag === value)) {
    //   return true
    // } else {
    //   return false
    // }
    if ((query.get("filter") && query.get("filter") === value)  || (params.tag && params.tag === value)) {
      return true
    } else {
      return false
    }
  }
  const getParams = () => {
    const params = {}
    if (query.get("filter")) {
      params.filter = query.get("filter")
    } 
    if (query.get("q")) {
      params.q = query.get("q")
    } 
    if (query.get("sortBy")) {
      params.sortBy = query.get("sortBy")
    } 
    if (query.get("assignee")) {
      params.assignee = query.get("assignee")
    } 
    if (query.get("project")) {
      params.project = query.get("project")
    } 
    if (query.get("tag")) {
      params.tag = query.get("tag")
    }
    return params
  }
  
  useEffect(()=>{
    handleActiveItem(query.get("filter") || "")
    dispatch(getTasks({  
      ...getParams()
      // ...params, 
      // filter: query.get("filter") || '',
      // q: query.get("q") || '',
      // sortBy: query.get("sortBy") || '',
      // assignee: query.get("assignee") || '',
      // project: query.get("project") || '',
      // tag: query.get("tag") || ''
    }))
    console.log("[ useEffect ] ", query.toString())
  }, [query])
  
  const handleFilter = filter => {
    query.set("filter", filter)
    history.push({search:query.toString()})
    console.log(params)

    // setFilter(filter)
    // dispatch(getTasks({ ...params, project, filter }))
  }

  const handleTag = tag => {
    dispatch(getTasks({ ...params, project, tag }))
  }

  // ** Functions To Active List Item


  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    handleTaskSidebar()
    setMainSidebar()
  }
  // const changeUser = (e) => {
  //   setAssignee(e.label)
  //   // dispatch(getTasks({ ...params, q:e.label }))
  // }

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
              {/* this list come from backend when we select a project all of his relevent task list is filtered  */}
              <Label className='form-label'>Select Project</Label>
              <Select
                // menuIsOpen={true}
                onChange={(e)=>{
                  query.set("project", e.value)
                  query.set("projectL", e.label)
                  history.push({search:query.toString()})
                  // setProject(e.value)
                }}
                isClearable={false}
                theme={selectThemeColors}
                // defaultValue={projectNames[0]}
                defaultValue={{value :query.get("project") || "All", label:query.get("projectL") || "All" }}
                // isMulti={false}
                name='project'
                options={projectNames}
                className='react-select'
                classNamePrefix='select'
                />
                <br/>
              <Label className='form-label'>Select User</Label>
                <Select
                onChange={(e)=>{
                  query.set("assignee", e.label)
                  query.set("assigneeL", e.label)
                  console.log("assignee Search =>", query)
                  history.push({search:query.toString()})
                  // setAssignee(e.label)
                }}
                  // menuIsOpen={true}
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={{value :query.get("assignee") || "All", label:query.get("assigneeL") || "All" }}
                  // if set to true then also change Regex according to multiple assignee
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
                  tag="button"
                  // tag={Link}
                  // to={'/apps/todo/'}
                  // active={params.filter === '' && params.tag === ''}
                  active={query.get("filter") === ""}
                  onClick={() => handleFilter('')}
                >
                  <Mail className='me-75' size={18} />
                  <span className='align-middle'>My Tasks</span>
                </ListGroupItem>
                <ListGroupItem
                tag="button"
                  // tag={Link}
                  // to={'/apps/todo/important'}
                  active={handleActiveItem('important')}
                  onClick={() => handleFilter('important')}
                  action
                >
                  <Star className='me-75' size={18} />
                  <span className='align-middle'>Important</span>
                </ListGroupItem>
                <ListGroupItem
                tag="button"
                  // tag={Link}
                  // to={'/apps/todo/completed'}
                  active={handleActiveItem('completed')}
                  onClick={() => handleFilter('completed')}
                  action
                >
                  <Check className='me-75' size={18} />
                  <span className='align-middle'>Completed</span>
                </ListGroupItem>
                <ListGroupItem
                tag="button"
                  // tag={Link}
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
                  tag="button"
                  // tag={Link}
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
                  tag="button"
                  // tag={Link}
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
                  tag="button"
                  // tag={Link}
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
                  tag="button"
                  // tag={Link}
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
                  tag="button"
                  // tag={Link}
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
