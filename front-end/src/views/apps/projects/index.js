// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'

// ** Todo App Components
import Projects from './projects'
import Sidebar from './Sidebar'
import ProjectSidebar from './ProjectSidebar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProjects, updateProject, selectProject, addProject, deleteProject, setImportantApi, setLoading } from './store'

// ** Styles
import '@styles/react/apps/app-project.scss'

const TODO = () => {
  // ** States
  const [sort, setSort] = useState('')
  const [query, setQuery] = useState('')
  const [mainSidebar, setMainSidebar] = useState(false)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.projects)

  // ** URL Params
  const paramsURL = useParams()
  const params = {
    filter: paramsURL.filter || '',
    q: query || '',
    sortBy: sort || '',
    tag: paramsURL.tag || ''
  }

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar)
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)

  // ** Get Projects on mount & based on dependency change
  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(
      getProjects({
        filter: paramsURL.filter || '',
        q: query || '',
        sortBy: sort || '',
        tag: paramsURL.tag || ''
      })
    )
  }, [
    // because it cause two time rendring 
    // first time when component render
    // why => first time we have projects = [] length is 0
    // when data fetched then we have projects =[data] length more than 0
    // second time when dependancy var changes store.projects.length
    // api calling two time 
    
    // store.projects.length, 
    paramsURL.filter, paramsURL.tag, query, sort
  ])


  return (
    <Fragment>
      <Sidebar
        store={store}
        setLoading={setLoading}
        params={params}
        getProjects={getProjects}
        dispatch={dispatch}
        mainSidebar={mainSidebar}
        urlFilter={paramsURL.filter}
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
              <Projects
                store={store}
                projects={store.projects}
                sort={sort}
                query={query}
                params={params}
                setSort={setSort}
                setQuery={setQuery}
                dispatch={dispatch}
                setLoading={setLoading}
                getProjects={getProjects}
                paramsURL={paramsURL}
                updateProject={updateProject}
                selectProject={selectProject}
                // reOrderTasks={reOrderTasks}
                handleMainSidebar={handleMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
              />
            ) : null}

            <ProjectSidebar
              setImportantApi={setImportantApi}
              store={store}
              params={params}
              addProject={addProject}
              dispatch={dispatch}
              open={openTaskSidebar}
              updateProject={updateProject}
              selectProject={selectProject}
              deleteProject={deleteProject}
              handleTaskSidebar={handleTaskSidebar}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TODO
