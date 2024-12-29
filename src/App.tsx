import AddToDo from "./Components/AddToDo/AddToDo"
import Navbar from "./Components/Navbar/Navbar"
import Todos from "./Components/Todos/Todos"
import './App.css'



const App = () => {
  return (
    <div>
      <main>
        <h1>THE-LLAMA-LIST</h1>
        <Navbar/>
        <AddToDo/>
        <Todos/>
        
      </main>
    </div>
  )
}

export default App
