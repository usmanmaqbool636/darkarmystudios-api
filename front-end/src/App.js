// ** Router Import
import React, {useEffect} from "react"
import Router from './router/Router'

const App = () => {
    useEffect(() => {
        window.process = {
          ...window.process
        }
      }, [])
    return <Router />
}

export default App
