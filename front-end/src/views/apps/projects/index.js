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
import { getProjects, updateProject, selectProject, addProject, deleteProject, setImportantApi, getProjectsNameList } from './store'

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
    dispatch(
      getProjects({
        filter: paramsURL.filter || '',
        q: query || '',
        sortBy: sort || '',
        tag: paramsURL.tag || ''
      })
    )
  }, [paramsURL.filter, paramsURL.tag, query, sort])


  return (
    <Fragment>
      <Sidebar
        store={store}
        params={params}
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
                paramsURL={paramsURL}
                updateProject={updateProject}
                // reOrderTasks={reOrderTasks}
                handleMainSidebar={handleMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
              />
            ) : null}

            <ProjectSidebar
              store={store}
              params={params}
              open={openTaskSidebar}
              handleTaskSidebar={handleTaskSidebar}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TODO
