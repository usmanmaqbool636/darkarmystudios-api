import React from "react"
import classnames from 'classnames'
import { MoreVertical } from 'react-feather'
import { Badge, Input } from 'reactstrap'
import Avatar from '@components/avatar'
import { useDispatch } from 'react-redux'
import { completeTask } from "./store"
import moment from "moment"


const returnTimeTakenString = (start, end) =>{
    if (!end) return ""
    start = moment(start)
    const duration = moment.duration(start.diff(end))
    let time = ""
    if (duration._data.years) time += duration._data.years + " years"
    if (duration._data.months) time += duration._data.months + " months"
    if (duration._data.days) time += duration._data.days + " days"
    if (duration._data.hours) time += duration._data.hours + " hours"
    return time
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
const Task = ({ item, handleTaskClick }) => {
  const dispatch = useDispatch()

  const timeTaken = returnTimeTakenString(item.createdAt, item.completedAt)
  return (
    <li
      onClick={() => handleTaskClick(item)}
      className={classnames("todo-item", {
        completed: item.isCompleted
      })}
    >
      <div className="todo-title-wrapper">
        <div className="todo-title-area">
          <MoreVertical className="drag-icon" />
          <div className="form-check">
            <Input
              type="checkbox"
              id={item.title}
              checked={item.isCompleted}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation()
                dispatch(
                  completeTask({ _id: item._id, isCompleted: e.target.checked })
                )
              }}
            />
          </div>
          <span className="todo-title">{item.title}</span>
        </div>
        <div className="todo-item-action mt-lg-0 mt-50">
          {item.completedAt ? (
            <small className="text-nowrap text-success me-1">
              time taken {timeTaken || "0 min"}
            </small>
          ) : null}
          {item.tags.length ? (
            <div className="badge-wrapper me-1">{renderTags(item.tags)}</div>
          ) : null}
          {item.dueDate ? (
            <small className="text-nowrap text-muted me-1">
              {new Date(item.dueDate).toLocaleString("default", {
                month: "short"
              })}{" "}
              {new Date(item.dueDate).getDate().toString().padStart(2, "0")}
            </small>
          ) : null}
          {item.assignee ? renderAvatar(item) : null}
        </div>
      </div>
    </li>
  )
}

export default Task
