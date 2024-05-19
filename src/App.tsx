import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./App.css"
import Index from "./routes"

function App() {
  return (
    <div>
      <ToastContainer />
      <Index />
    </div>
  )
}

export default App
