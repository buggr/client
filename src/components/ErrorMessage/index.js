import React from 'react'

import './style.scss'

export default function ErrorMessage({ content }) {
  return (
    <div className="error-container">
      <h1 className="error-content">
        {content}
      </h1>
    </div>
  )
}
