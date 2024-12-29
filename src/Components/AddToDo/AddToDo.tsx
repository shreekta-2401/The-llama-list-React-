import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";

const AddToDo = () => {
  const [todo, setToDo] = useState("");
  const {handleAddToDo}=useTodos()
  const handleFormSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    handleAddToDo(todo);
    setToDo("")

  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setToDo(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default AddToDo;
