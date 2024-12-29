
import { Todo, useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom';

const Todos = () => {
    const{todos,toggleToDoAsCompleted,handleToDoDelete}=useTodos();
    let filterData=todos;

    const [searchParams]=useSearchParams();
    let todosData=searchParams.get("todos");
    console.log('~file: todos.tsx:10 ~Todos ~todosData',todosData)

    if(todosData==="active"){
        filterData=filterData.filter((task)=>!task.completed)
    }
    if(todosData==="completed"){
        filterData=filterData.filter((task)=>task.completed)
    }

    return (
        <ul className='main-task'>{
            filterData.map((todo:Todo)=>
            {
                return <li key={todo.id}>
                    <input type="checkbox" name="" id={`todo-${todo.id}`} 
                    checked={todo.completed}
                    onChange={()=>{toggleToDoAsCompleted(todo.id)}}/>
                    <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                    {
                        todo.completed&&(
                            <button type='button'
                            onClick={()=>{handleToDoDelete(todo.id)}}>
                                Delete
                            </button>

                        )
                    }

                </li>
            })
        }
        </ul>
    
    )
}

export default Todos
