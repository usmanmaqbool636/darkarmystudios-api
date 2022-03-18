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
import { toast } from 'react-toastify'

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
import { convertToHTML } from 'draft-convert'
import { completeTask, setTaskImportant, addTask, updateTask, selectTask, deleteTask } from './store'
import { useDispatch } from 'react-redux'

// ** Function to capitalize the first letter of string
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// ** Modal Header
const ModalHeader = props => {
  const dispatch = useDispatch()
  // ** Props
  const { children, store, handleTaskSidebar, setDeleted, deleted, important, setImportant } =
    props

  // ** Function to delete task
  const handleDeleteTask = async () => {
    const responce = await dispatch(deleteTask(store.selectedTask._id))
    setDeleted(!deleted)
    if (responce.payload.success === false) {
      toast.error(<ErrorToast error={responce.payload.message} />, { icon: false, hideProgressBar: true })
    } else {
      handleTaskSidebar()
      toast.success(<SuccessToast msg={responce.payload.message} />, { icon: false, hideProgressBar: true })
    }
  }

  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>{children}</h5>
      <div className='todo-item-action d-flex align-items-center'>
        {store && !isObjEmpty(store.selectedTask) ? (
          <Trash className='cursor-pointer mt-25' size={16} onClick={() => handleDeleteTask()} />
        ) : null}
        <span className='todo-item-favorite cursor-pointer mx-75'>
          <Star
            size={16}
            onClick={() => {
              // important logic with api
              dispatch(setTaskImportant({_id: store.selectedTask._id, isImportant: !important}))
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

const TaskSidebar = props => {
  // ** Props
  const { open, handleTaskSidebar, store, dispatch, projectNames } = props

  // ** States
  const [assignee, setAssignee] = useState({ value: 'pheobe', label: 'Pheobe Buffay', img: img1 })
  const [tags, setTags] = useState([])
  const [project, setProject] = useState({})
  const [desc, setDesc] = useState(EditorState.createEmpty())
  const [completed, setCompleted] = useState(false)
  const [important, setImportant] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [dueDate, setDueDate] = useState(new Date())

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
    if (store && !isObjEmpty(store.selectedTask)) {
      return (
        <Button
          outline
          size='sm'
          onClick={() => {
            dispatch(
              completeTask({ _id: store.selectedTask._id, isCompleted: !completed })
            )
            setCompleted(!completed)
          }}
          color={completed === true ? 'success' : 'secondary'}
        >
          {completed === true ? 'Completed' : 'Mark Complete'}
        </Button>
      )
    } else {
      return 'Add Task'
    }
  }

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    const { selectedTask } = store
    if (!isObjEmpty(selectedTask)) {
      setValue('title', selectedTask.title)
      setCompleted(selectedTask.isCompleted)
      setImportant(selectedTask.isImportant)
      setAssignee([
        {
          value: selectedTask.assignee.fullName,
          label: selectedTask.assignee.fullName,
          img: selectedTask.assignee.avatar
        }
      ])
      setProject({
        value:selectedTask.project._id,
        label:selectedTask.project.title
      })
      setDueDate(selectedTask.dueDate)
      if (typeof selectedTask.description === 'string') {
        // setDesc(EditorState.createWithContent(ContentState.createFromText(selectedTask.description)))
        setDesc(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(selectedTask.description))))

      } else {
        const obj = selectedTask.description._immutable.currentContent.blockMap
        const property = Object.keys(obj).map(val => val)

        setDesc(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(obj[property].text))))
      }

      if (selectedTask.tags.length) {
        const tags = []
        selectedTask.tags.map(tag => {
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
    setAssignee({ value: 'pheobe', label: 'Pheobe Buffay', img: img1 })
    setCompleted(false)
    setImportant(false)
    setDueDate(new Date())
    setProject({
      value:"",
      label:""
    })
    dispatch(selectTask({}))
  }

  // ** Function to reset fileds
  const handleResetFields = () => {
    const descValue = EditorState.createWithContent(ContentState.createFromText(store.selectedTask.description))

    setValue('title', store.selectedTask.title)
    setDesc(descValue)
    setCompleted(store.selectedTask.isCompleted)
    setImportant(store.selectedTask.isImportant)
    setDeleted(store.selectedTask.isDeleted)
    setDueDate(store.selectedTask.dueDate)
    if (store.selectedTask.assignee.fullName !== assignee.label) {
      setAssignee({
        value: store.selectedTask.assignee.fullName,
        label: store.selectedTask.assignee.fullName,
        img: store.selectedTask.assignee.avatar
      })
    }
    if (store.selectedTask.tags.length) {
      const tags = []
      store.selectedTask.tags.map(tag => {
        tags.push({ value: tag, label: capitalize(tag) })
      })
      setTags(tags)
    }
  }

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (store && !isObjEmpty(store.selectedTask)) {
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
          <Button color='primary' className='add-todo-item me-1'>
            Add
          </Button>
          <Button color='secondary' onClick={handleTaskSidebar} outline>
            Cancel
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = async data => {
    const newTaskTag = []

    const doesInclude = !isObjEmpty(store.selectedTask) && assignee.label === store.selectedTask.assignee.fullName

    if (tags.length) {
      tags.map(tag => newTaskTag.push(tag.value))
    }

    const newAssignee = {
      fullName: assignee.label,
      avatar: assignee.img
    }
    const currentContentAsHTML = convertToHTML(desc.getCurrentContent())
    const state = {
      dueDate,
      title: data.title,
      project:project.value,
      tags: newTaskTag,
      description: currentContentAsHTML,
      isCompleted: completed,
      isDeleted: deleted,
      isImportant: important,
      assignee: doesInclude || assignee.label === undefined ? store.selectedTask.assignee : newAssignee
    }

    let responce

    if (data.title.length) {
      if (isObjEmpty(errors)) {
        setLoading(true)
        if (isObjEmpty(store.selectedTask) || (!isObjEmpty(store.selectedTask) && !store.selectedTask.title.length)) {
          responce = await dispatch(addTask(state))
        } else {
          // inprogress
          responce = await dispatch(updateTask({ ...state, _id: store.selectedTask._id }))
        }
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
              Title <span className='text-danger'>*</span>
            </Label>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Input
                  id='task-title'
                  placeholder='Title'
                  className='new-todo-item-title'
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && <FormFeedback>Please enter a valid task title</FormFeedback>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='task-assignee'>
              Assignee
            </Label>
            <Select
              id='task-assignee'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={assigneeOptions}
              theme={selectThemeColors}
              value={assignee}
              onChange={data => setAssignee(data)}
              components={{ Option: AssigneeComponent }}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='due-date'>
              Due Date
            </Label>
            <Flatpickr
              id='due-date'
              name='due-date'
              className='form-control'
              onChange={date => setDueDate(date[0])}
              value={dueDate}
              options={{ dateFormat: 'Y-m-d', minDate:"today" }}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='task-tags'>
              Tags
            </Label>
            <Select
              isMulti
              id='task-tags'
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
            <Label className='form-label' for='task-tags'>
              Select Project
            </Label>
            <Select
              id='task-tags'
              className='react-select'
              classNamePrefix='select'
              // isClearable={false}
              placeholder={"Select project"}
              options={projectNames}
              theme={selectThemeColors}
              value={project}
              onChange={data => {
                setProject(data)
              }}
            />
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
              onEditorStateChange={data => setDesc(data)}
            />
          </div>
          <div>{renderFooterButtons()}</div>
        </ModalBody>
      </Form>
    </Modal>
  )
}

export default TaskSidebar
