import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import Realtime from "./pages/Realtime"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/live-map" element={<Realtime />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
