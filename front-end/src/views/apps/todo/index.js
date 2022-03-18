// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'

// ** Todo App Components
import Tasks from './Tasks'
import Sidebar from './Sidebar'
import TaskSidebar from './TaskSidebar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, updateTask, selectTask, addTask, deleteTask, reOrderTasks, completeTask } from './store'
import { getProjectsNameList } from "../projects/store"
// ** Styles
import '@styles/react/apps/app-todo.scss'

const TODO = () => {
  // ** States
  const [sort, setSort] = useState('')
  const [query, setQuery] = useState('')
  const [assignee, setAssignee] = useState('')
  const [project, setProject] = useState('')
  const [mainSidebar, setMainSidebar] = useState(false)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
  const [filter, setFilter] = useState("")
  // const [param,setParam] = useState()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.todo)
  const projectNames = useSelector(state => state.projects.projectNames)

  // ** URL Params
  const paramsURL = useParams()
  const params = {
    filter: filter || '',
    q: query || '',
    sortBy: sort || '',
    assignee: assignee || '',
    project: project || '',
    tag: paramsURL.tag || ''

  }
  console.log("[todo/index] params", params)

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar)
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)


  // ** Get Tasks on mount & based on dependency change
  useEffect(() => {

    dispatch(
      getTasks({
        filter: filter || '',
        q: query || '',
        sortBy: sort || '',
        assignee: assignee || '',
        project: project || '',
        tag: paramsURL.tag || ''

      })
    )
    // dispatch(getProjectsNameList())
  }, [
    // because it cause two time request sent
    // store.tasks.length, 
    filter, 
    paramsURL.tag, 
    query, 
    assignee, 
    project, 
    sort
  ])
  useEffect(()=>{
    // issue solved for calling getProjectsNameList every time when updates
    dispatch(getProjectsNameList())
  }, [])

  return (
    <Fragment>
      <Sidebar
        projectNames={[{ value: '', label: 'All' }, ...projectNames]}
        store={store}
        project={project}
        setAssignee={setAssignee}
        setProject={setProject}
        params={params}
        getTasks={getTasks}
        dispatch={dispatch}
        mainSidebar={mainSidebar}
        setFilter={setFilter}
        // urlFilter={filter}
        setMainSidebar={setMainSidebar}
        handleTaskSidebar={handleTaskSidebar}
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames('body-content-overlay', {
                show: mainSidebar === true
              })}
              onClick={handleMainSidebar}
            ></div>

            {store ? (
              <Tasks
                key="taskMain"
                store={store}
                tasks={store.tasks}
                sort={sort}
                query={query}
                params={params}
                setSort={setSort}
                setQuery={setQuery}
                dispatch={dispatch}
                getTasks={getTasks}
                paramsURL={paramsURL}
                updateTask={updateTask}
                selectTask={selectTask}
                reOrderTasks={reOrderTasks}
                handleMainSidebar={handleMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
              />
            ) : null}

            <TaskSidebar
              projectNames={projectNames}
              store={store}
              params={params}
              addTask={addTask}
              dispatch={dispatch}
              open={openTaskSidebar}
              updateTask={updateTask}
              selectTask={selectTask}
              deleteTask={deleteTask}
              handleTaskSidebar={handleTaskSidebar}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TODO
