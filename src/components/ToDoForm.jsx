import React from 'react'
import {useState} from 'react'
import { useTodo } from '../context';



function TodoForm() {
    
    const [todo, setTodo] = useState("");
    // this todo is a string -> is todo me jo ham input denge -> vo string hogi

    //  extracting addTodo function from the context
    const {addTodo} = useTodo();

    const add = (event)=>{
        event.preventDefault();

        if (!todo) return;

        // addTodo me object pass hoga 
        // addTodo({id : Date.now(), todo, completed:false}) 
        //  id to ham waha pass kr chuke hain so yaha pass nahi krenge -> yahan ham ek todo ko as an arguement pass kr rahe hain

        addTodo({todo, completed:false}); // todo ka naam same ha waha so todo:todo likhne ki jagah ham seedha todo bhi pass kr sakte hain

        setTodo(""); // todo ko khali krna padega -> taki todo me agli value as an input daal sakein
    }




    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                value={todo}
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

