import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { Title } from './scenes/Title'
import { Global } from './styles'
import { ErrorBoundary } from './ErrorBoundary'

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Global />
        <Title />
      </ErrorBoundary>
    </Router>
  )
}
