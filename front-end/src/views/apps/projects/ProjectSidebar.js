// ** React Imports
import { useState, Fragment } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { Editor } from 'react-draft-wysiwyg'
import { X, Star, Trash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'


// ** Reactstrap Imports
import { Modal, ModalBody, Button, Form, Input, Label, FormFeedback } from 'reactstrap'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

// ** Assignee Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg'
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg'
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg'
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg'
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg'

// ** Styles Imports
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'

import { ErrorToast, SuccessToast } from '../components/Toast'
import { addProject, deleteProject, selectProject, setImportantApi, updateProject } from './store'
import { useDispatch } from 'react-redux'

// ** Function to capitalize the first letter of string
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// ** Modal Header
const ModalHeader = props => {
  // ** Props
  const { children, store, handleTaskSidebar, setDeleted, deleted, important, setImportant, dispatch } =
    props

  // ** Function to delete task
  const handledeleteProject = async () => {
    const responce = await dispatch(deleteProject(store.selectedProject._id))
    if (!responce.payload.success) {
      toast.error(<ErrorToast error={responce.payload.message} />, { icon: false, hideProgressBar: true })
    } else {
      toast.success(<SuccessToast msg={responce.payload.message} />, { icon: false, hideProgressBar: true })
      handleTaskSidebar()
    }
  }

  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>{children}</h5>
      <div className='todo-item-action d-flex align-items-center'>
        {store && !isObjEmpty(store.selectedProject) ? (
          <Trash className='cursor-pointer mt-25' size={16} onClick={() => handledeleteProject()} />
        ) : null}
        <span className='todo-item-favorite cursor-pointer mx-75'>
          <Star
            size={16}
            onClick={async () => {
              console.log(store)
              await dispatch(setImportantApi({ id:store.selectedProject._id, isImportant:!important}))
              setImportant(!important)
            }}
            className={classnames({
              'text-warning': important === true
            })}
          />
        </span>
        <X className='fw-normal mt-25' size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  )
}

const ProjectSidebar = props => {
  const dispatch = useDispatch()
  // ** Props
  const { open, handleTaskSidebar, store, setImportantApi } = props

  // ** States
  const [assignees, setAssignee] = useState([{ value: 'pheobe', label: 'Pheobe Buffay', img: img1 }])
  const [tags, setTags] = useState([])
  const [desc, setDesc] = useState(EditorState.createEmpty())
  const [completed, setCompleted] = useState(false)
  const [visibility, setVisibility] = useState("private")
  const [important, setImportant] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [dueDate, setDueDate] = useState(new Date())
  const [createdAt, setCreatedAt] = useState(new Date())

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: '' }
  })

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 }
  ]

  // ** Tag Select Options
  const tagOptions = [
    { value: 'team', label: 'Team' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'update', label: 'Update' }
  ]

  // ** Custom Assignee Component
  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex align-items-center'>
          <img className='d-block rounded-circle me-50' src={data.img} height='26' width='26' alt={data.label} />
          <p className='mb-0'>{data.label}</p>
        </div>
      </components.Option>
    )
  }

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (store && !isObjEmpty(store.selectedProject)) {
      // return (
      //   <Button
      //     outline
      //     size='sm'
      //     onClick={() => setCompleted(!completed)}
      //     color={completed === true ? 'success' : 'secondary'}
      //   >
      //     {completed === true ? 'Completed' : 'Mark Complete'}
      //   </Button>
      // )
    } else {
      return 'Create New Project'
    }
  }

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    const { selectedProject } = store
    if (!isObjEmpty(selectedProject)) {
      setValue('title', selectedProject.title)
      setCompleted(selectedProject.isCompleted)
      setVisibility(selectedProject.visibility)
      setImportant(selectedProject.isImportant)
      setAssignee(
        [...selectedProject.assignees]
      )
      setDueDate(selectedProject.dueDate)
      setCreatedAt(selectedProject.createdAt)
      if (typeof selectedProject.description === 'string') {
        setDesc(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(selectedProject.description))))
      } else {
        const obj = selectedProject.description._immutable.currentContent.blockMap
        const property = Object.keys(obj).map(val => val)

        setDesc(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(obj[property].text))))
      }

      if (selectedProject.tags.length) {
        const tags = []
        selectedProject.tags.map(tag => {
          tags.push({ value: tag, label: capitalize(tag) })
        })
        setTags(tags)
      }
    }
  }

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setTags([])
    setDesc('')
    setValue('title', '')
    setAssignee([{ value: 'pheobe', label: 'Pheobe Buffay', img: img1 }])
    setCompleted(false)
    setImportant(false)
    setDueDate(new Date())
    setCreatedAt(new Date())
    dispatch(selectProject({}))
  }

  // ** Function to reset fileds
  const handleResetFields = () => {
    const descValue = EditorState.createWithContent(ContentState.createFromText(store.selectedProject.description))

    setValue('title', store.selectedProject.title)
    setDesc(descValue)
    setCompleted(store.selectedProject.isCompleted)
    setImportant(store.selectedProject.isImportant)
    setDeleted(store.selectedProject.isDeleted)
    setDueDate(store.selectedProject.dueDate)
    if (store.selectedProject.assignees.fullName !== assignees.label) {
      setAssignee([
        {
        value: store.selectedProject.assignee.fullName,
        label: store.selectedProject.assignee.fullName,
        img: store.selectedProject.assignee.avatar
      }
    ]
    )
    }
    if (store.selectedProject.tags.length) {
      const tags = []
      store.selectedProject.tags.map(tag => {
        tags.push({ value: tag, label: capitalize(tag) })
      })
      setTags(tags)
    }
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (store && !isObjEmpty(store.selectedProject)) {
      return (
        <Fragment>
          <Button color='primary' className='update-btn update-todo-item me-1'>
            Update
          </Button>
          <Button color='secondary' onClick={handleResetFields} outline>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button disabled={loading} type='submit' color='primary' className='add-todo-item me-1'>
            Create Project
          </Button>
          <Button color='secondary' onClick={handleTaskSidebar} outline>
            Cancel
          </Button>
        </Fragment>
        
      )
    }
  }

  const onSubmit = async data => {
    try {
      const newTaskTag = []

    // const doesInclude = !isObjEmpty(store.selectedProject) && assignee.label === store.selectedProject.assignee.fullName

    if (tags.length) {
      tags.map(tag => newTaskTag.push(tag.value))
    }

    // const newAssignee = {
    //   fullName: assignee.label,
    //   avatar: assignee.img
    // }
    const currentContentAsHTML = convertToHTML(desc.getCurrentContent())
    console.log(currentContentAsHTML)
    const state = {
      dueDate,
      title: data.title,
      tags: newTaskTag,
      description: currentContentAsHTML,
      isCompleted: completed,
      isDeleted: deleted,
      isImportant: important,
      assignees,
      createdAt,
      visibility
    }
    let responce

    if (data.title.length) {
      if (isObjEmpty(errors)) {
        setLoading(true)
        if (isObjEmpty(store.selectedProject) || (!isObjEmpty(store.selectedProject) && !store.selectedProject.title.length)) {
        responce = await dispatch(addProject(state))
        console.log(responce)
        } else {
          responce = await dispatch(updateProject({ ...state, _id: store.selectedProject._id }))
        }
        setLoading(false)
        if (responce.payload.success === false) {

          toast.error(<ErrorToast error={responce.payload.message} />, { icon: false, hideProgressBar: true })
        } else {
          handleTaskSidebar()
          toast.success(<SuccessToast msg={responce.payload.message} />, { icon: false, hideProgressBar: true })
        }
      }
    } else {
      setError('title', {
        type: 'manual'
      })
    }
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      modalClassName='modal-slide-in sidebar-todo-modal'
    >
      <Form id='form-modal-todo' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          setImportantApi={setImportantApi}
          store={store}
          deleted={deleted}
          dispatch={dispatch}
          important={important}
          setDeleted={setDeleted}
          setImportant={setImportant}
          handleTaskSidebar={handleTaskSidebar}
        >
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <div className='mb-1'>
            <Label className='form-label' for='task-title'>
              Project Name <span className='text-danger'>*</span>
            </Label>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Input
                  id='task-title'
                  placeholder='Project Name'
                  className='new-todo-item-title'
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && <FormFeedback>Please enter a valid task title</FormFeedback>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='project-assignee'>
              Assignee
            </Label>
            <Select
              id='project-assignee'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              isMulti={true}
              options={assigneeOptions}
              theme={selectThemeColors}
              value={assignees}
              onChange={data => {
                setAssignee(data)
              }}

              components={{ Option: AssigneeComponent }}
            />
          </div>
          {/* <div className='mb-1'>
            <Label className='form-label' for='due-date'>
              Due Date
            </Label>
            <Flatpickr
              id='due-date'
              name='due-date'
              className='form-control'
              onChange={date => setDueDate(date[0])}
              value={dueDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </div> */}
          <div className='mb-1'>
            <Label className='form-label' for='project-team'>
              Tags
            </Label>
            <Select
              isMulti
              id='project-team'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={tagOptions}
              theme={selectThemeColors}
              value={tags}
              onChange={data => {
                setTags(data !== null ? [...data] : [])
              }}
            />
          </div>
          <div className='mb-1'>
          <Label className='form-label' for='Visibility'>
          Visibility
          </Label>
          <div onChange={(evt)=>setVisibility(evt.target.value)} className='demo-inline-spacing'>
            <div className='form-check' id="Visibility" >
              <Input type='radio' value="private" id='ex1-active' name='visibility' defaultChecked={visibility === "private"} />
              <Label className='form-check-label' for='ex1-active'>
                Private
              </Label>
            </div>
            <div className='form-check'>
              <Input type='radio' value="public" name='visibility' id='ex1-inactive' defaultChecked={visibility === "public"} />
              <Label className='form-check-label' for='ex1-inactive'>
                Public
              </Label>
            </div>
            <div className='form-check'>
              <Input type='radio' value="multiple teams" name='visibility' id='ex2-active' defaultChecked={visibility === "multiple teams"} />
              <Label className='form-check-label' for='ex2-active'>
              multiple teams
              </Label>
            </div>
          </div>
          </div>
          <div className='mb-1'>
            <Label for='task-desc' className='form-label'>
              Description
            </Label>
            <Editor
              editorState={desc}
              wrapperClassName='toolbar-bottom'
              toolbar={{
                options: ['inline', 'textAlign'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline']
                }
              }}
              onEditorStateChange={data => {
                setDesc(data)
              }}
            />
          </div>
          <div>{renderFooterButtons()}</div>
        </ModalBody>
      </Form>
    </Modal>
  )
}

export default ProjectSidebar
