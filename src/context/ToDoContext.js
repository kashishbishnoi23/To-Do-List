import { createContext, useContext } from "react";

export const ToDoContext = createContext({
    
    // todo:
    todos: [
        {
            id:1,
            todo: " Todo msg ",
            completed: false

        }
    ],

    //  functions: 
    addTodo : (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete : (id) => {}
})

export const useTodo = ()=>{
    return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider