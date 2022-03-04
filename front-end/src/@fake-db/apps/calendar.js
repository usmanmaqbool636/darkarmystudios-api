/*eslint-disable */
import { nanoid } from '@reduxjs/toolkit'
import mock from '../mock'
import { EVENTS, TASKS } from './constant'
// TODO Wrap Mock API handler with "try catch"

const date = new Date()
const prevDay = new Date().getDate() - 1
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

const data = {
  events: [
    {
      id: nanoid(),
      url: '',
      title: 'Design Review',
      start: date,
      end: nextDay,
      allDay: false,
      extendedProps: {
        calendar: 'Business'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Meeting With Client',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'Business'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Family Trip',
      allDay: true,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
      extendedProps: {
        calendar: 'Holiday'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: "Doctor's Appointment",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'Personal'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Dart Game?',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Task'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Meditation',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Personal'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Dinner',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Family'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Product Review',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Business'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Monthly Meeting',
      start: nextMonth,
      end: nextMonth,
      allDay: true,
      extendedProps: {
        calendar: 'Business'
      }
    },
    {
      id: nanoid(),
      url: '',
      title: 'Monthly Checkup',
      start: prevMonth,
      end: prevMonth,
      allDay: true,
      extendedProps: {
        calendar: 'Personal'
      }
    }
  ]
}

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
// with localstorage
mock.onGet('/apps/calendar/events').reply(config => {
  // Get requested calendars as Array
  let tasks = JSON.parse(localStorage.getItem(TASKS)) || [];
  let events = JSON.parse(localStorage.getItem(EVENTS)) || data.events;

    const taskEvents = tasks.map(task=>{
      const date = new Date(task.dueDate);
      console.log(date);
      console.log(date.getMonth());
      console.log(date.getDay());
      return {
        ...task,
        id : task.id+Date.now(),
        tid: task.id,
        url : "",
        // start is not defined in tasks
        // we need to some how manage start date
        start: new Date(date.getFullYear(), date.getMonth()+1,date.getDay()),
        end : task.dueDate,
        allDay : true,
        extendedProps : {
          calendar: 'Task'
        }
      }
    })
    events = [...events, ...taskEvents]

  const calendars = config.calendars
  
  return [200, events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
// with localstorage
mock.onPost('/apps/calendar/add-event').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data)
  const events = JSON.parse(localStorage.getItem(EVENTS)) || data.events
  event.id = nanoid()

  events.push(event)
  localStorage.setItem(EVENTS,JSON.stringify(events))

  return [201, { event }]
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
// with localstorage
mock.onPost('/apps/calendar/update-event').reply(config => {

  let events = JSON.parse(localStorage.getItem(EVENTS)) || data.events
  const { event: eventData } = JSON.parse(config.data)

  // Convert Id to number
  eventData.id = eventData.id

  events = events.map(ev => ev.id === eventData.id?eventData:ev)
  localStorage.setItem(EVENTS,JSON.stringify(events))
  
  return [200, { event:eventData }]
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
// with localstorage
mock.onDelete('/apps/calendar/remove-event').reply(config => {
  // Get event id from URL
  let events = JSON.parse(localStorage.getItem(EVENTS)) || data.events

  let { id } = config
  

  // Convert Id to number
  const eventId = id

  const eventIndex = events.findIndex(ev => ev.id === eventId)
  events.splice(eventIndex, 1);
  localStorage.setItem(EVENTS,JSON.stringify(events))

  return [200]
})
