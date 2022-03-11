import React, { Fragment } from "react"
import Avatar from '@components/avatar'
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather'

export const SuccessToast = ({ msg }) => (
  // TODO not set yet
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
      <small className="text-muted">11 Min Ago</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 {msg}
      </span>
    </div>
  </Fragment>
)

export const ErrorToast = ({ error }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Error!</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {error}
      </span>
    </div>
  </Fragment>
)
