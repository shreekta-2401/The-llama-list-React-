import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps=
{
    children:ReactNode
}
export type Todo={
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}
export type TodosContext={
    todos:Todo[];
    handleAddToDo:(task:string)=>void;
    toggleToDoAsCompleted:(id:string)=>void;
    handleToDoDelete:(id:string)=>void;

}

export const todosContext=createContext<TodosContext|null>(null)


export const TodosProvider=({children}:TodosProviderProps)=>{

    const [todos,setToDo]=useState<Todo[]>(()=>{
        try {
            const newToDos=localStorage.getItem("todos")||"[]"
            return JSON.parse(newToDos) as Todo[]
            
        } catch (error) {
            return []
            
        }
    })
    const handleAddToDo=(task:string)=>{
        
        setToDo((prev)=>{
            const newToDo:Todo[]=[
            {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date(),
            },
            ...prev
            ]
            // console.log("Prev:",prev)
            // console.log(newToDo);
            localStorage.setItem("todos",JSON.stringify(newToDo))
            
            return newToDo
            


        });
    


    }
    //mark_completed
    const toggleToDoAsCompleted=(id:string)=>{
        setToDo((prev)=>{
            let newToDos=prev.map((todo)=>
            {
                if(todo.id===id)
                {
                    return {...todo,completed:!todo.completed}
                }
                return todo;

            })
            localStorage.setItem("todos",JSON.stringify(newToDos))
            return newToDos
            
        })



    }
    const handleToDoDelete=(id:string)=>{
        setToDo((prev)=>{
            let newToDos=prev.filter((filterToDo)=>filterToDo.id!==id);
            localStorage.setItem("todos",JSON.stringify(newToDos))
            return newToDos;

        })
    }

    return (<todosContext.Provider value={{todos,handleAddToDo,toggleToDoAsCompleted,handleToDoDelete}}>
        {children}
    </todosContext.Provider>)

}

//consumer
export const useTodos=()=>{
    const todosConsumer=useContext(todosContext)
    if(!todosConsumer){
        throw new Error("useTodos used outside provider");
        
    }
    return todosConsumer
}