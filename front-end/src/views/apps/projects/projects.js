// ** React Imports
import { Link, useLocation, useHistory } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Third Party Components
import classnames from 'classnames'
import { ReactSortable } from 'react-sortablejs'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Menu, Search, MoreVertical } from 'react-feather'

import ProjectCard from "./ProjectCard"
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
  Row,
  Col,
  Container
} from 'reactstrap'
import React, { useEffect } from 'react'

const Projects = props => {
  const location = useLocation()
  const history = useHistory()

  const {
    query,
    projects,
    params,
    setSort,
    dispatch,
    getProjects,
    setQuery,
    updateProject,
    selectProject,
    reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    setLoading,
    store
  } = props

    // ** Function to selectTask on click
    const handleProjectClick = obj => {
      dispatch(selectProject(obj))
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
      const task = projects.find(t => t.id === Number(taskid))
      if (task) {
        handleProjectClick(task)
      }
    }, [location, projects])
  
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

    return arr.map((item, index) => {
      return (
        <Badge className='text-capitalize' key={`renderTags-${item}-${index}`} color={badgeColor[item]} pill>
          {item}
        </Badge>
      )
    } 
    )
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

  const renderProjects = () => {
    if (store.isLoading) {
      return <h2 className='m-auto'>loading</h2>
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

    {projects.length ? (
      <Container>
        <Row className='match-height'>
          {projects.map(item => {
            return  (
              <Col  key={`project-${item._id}`} lg='4' md='6'>
                  <ProjectCard handleProjectClick={handleProjectClick} item={item} />
                </Col>
              )
          })}
      </Row>
    </Container>
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
    dispatch(setLoading(true))
    dispatch(getProjects(params))
  }

  // ** Function to getTasks based on sort
  const handleSort = (e, val) => {
    e.preventDefault()
    setSort(val)
    dispatch(getProjects({ ...params }))
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
      {renderProjects()}
    </div>
  )
}

export default Projects
