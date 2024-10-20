import { useState, useEffect } from 'react'
import { ToDoProvider } from './context'
import './App.css'
import TodoForm from './components/ToDoForm';
import TodoItem from './components/ToDoItem';

//  start at 49 miniutes 

function App() {
  //   defining todos and other functions:

  // todos : list of objects -> list of todos
  const [todos, setTodos] = useState([]);

  //  define the functions 

  //  addToDo: list of todos me naya todo add kr denge
  const addTodo = (todo)=>{
    setTodos((prev) => [{id:Date.now(), ...todo}, ...prev])
  } // use of spread operator : used to spread out the values of an array or keys of an object

  // prev -> means the previous state of the todos (list of objects) -> ham naya todo prev se pehle insert kr rahe hain 
  // ...prev -> is se sare objects spread out hoke aa jayenge -> plus we are adding a new todo -> isme agar id pehle se hai to Date.now() se replace ho jayegi ->  naye object me id jayegi aur ...todo -> means the remaining key-value pairs of the object todo

  // Date.now() means the current timespan -> measured in milliseconds -> number of milliseconds that have passed till January 1, 1970

  // updateTodo:

  const updateTodo = (id, todo)=>{
    setTodos((prev) => prev.map((prevToDo) => (prevToDo.id === id ? todo : prevToDo)))
  }

  //  explanation of updateTodo : its a function which takes 2 parameters : id and todo 

  //  hame basically setTodos chalana padega -> cuz we want to update the list of todos -> 

  //  setTodos me hame apni previous list of todos ka access milega -> naam de diya hamne prev 

  //  map function basically kya krta hai -> original array pe loop chalega -> har element pe ek function chalega -> whatever it returns -> it gets added to the new array (map function creates)

  /*  prev.map((prevToDo) => {
     if (prevToDo.id === id){
     return todo; // agar id match ho gayi -> to naye wala todo add krdo 
     } else{
      return prevToDo; // id match nahi hui to purane wala todo hi add krdo
    }
    })
  */

    const deleteTodo = (id)=>{
      //  ham ye chahte hain ki hamaare paas ek naya array return ho jisme puraani sari values ho but id wali value na ho -> so is case me ham filter ka use krenge

      //  How does filter work?? -> filter basically ek nayi array create krta hai -> usme ham condition laga dete hain -> agar condition satisfy hoti hai -> tabhi vo element nayi array me add hoga otherwise nahi hoga

      //  again hame todo list ko update krna ha to setTodos chalana padega
      setTodos((prev) => prev.filter((prevTodo)=> prevTodo.id !== id));
      //  so is case me hame -> agar id match nahi krti -> to us todo ko apni nayi array me insert krna hai -> jaha id match ho usko insert nahi krna 

      //  it looks like this:

      /*
      prev.filter((prevTodo) =>{
        if (prevTodo.id !== id){
        return prevTodo;
        }
        })
      */


    }


    //  jiski id match hogi -> usko hame toggle kraana hai -> yani completed true ha to false krna hai , false ha to true karna hai
    const toggleComplete = (id)=>{
        //  again, hame change to todo list me krna hai -> so setTodos call hoga
        setTodos((prev) => prev.map((prevToDo) => (prevToDo.id === id) ? {...prevToDo, completed: !prevToDo.completed} : prevToDo))
    }

    //  explanation : jaha id match hogi -> waha hame completed ko change krna hai , baki sari cheeze same rkhni hai 

    //  {...prevToDo, completed: !prevToDo} -> iska matlab ha ki ek naya object create hoga -> ...prevToDo -> is se prevToDo ke sare key-values copy ho jayenge aur completed: !prevToDo.completed -> ye krne se baki cheeze same rahengi -> completed property toggle ho jayegi 

    //  if we do it without using spread operator:

    /*
    setTodos(prev) => prev.map((prevToDo) => 
      if (prevToDo.id === id){
      return {
      id : prevToDo.id,
      todo: "msg",
      completed : !prevToDo.completed
      }
    }
      )

    */

      //  LOCAL STORAGE:

      // difference between .json() and JSON.parse():

      //  .json() -> ye method to hame response object ke sath milta hai -> when we fetch api -> we get response -> we can directly convert it into a javascript object

      //  JSON.parse() -> ye method JSON string ko JSON object me convert karta hai

      //  JSON string?? : looks like this :   -> isme keys jo hongi -> vo string form me hongi -> values kisi bhi form me ho skti hain : use double quotes for keys (important) , single quotes are NOT valid
      
      /*{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "courses": ["Mathematics", "Physics", "Chemistry"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zip": "12345"
  }
}*/

//  ek JSON object (normal js object) ko JSON string me convert krne ke liye we use JSON.stringify()

//  local Storage me store hote hain key-value pairs -> (but keys are in the form of strings) -> so we can say local Storage me data JSON string ki form me store hota hai -> isliye hame waha data store kraane se pehle use JSON.stringify() krke JSON string me convert karna padta hai

//  and when we access that data from local Storage -> hame chahiye pure JSON object -> so we convert that JSON string into a JSON object using JSON.parse()


//  getting the data from local Storage:
useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem("todos"));

   if (todos && todos.length > 0){   
         setTodos(todos)
   }
}, [])

// setting or storing the data to Local Storage:

useEffect(()=>{
   localStorage.setItem("todos", JSON.stringify(todos) );
}, [todos]) // jitni baar todos list me change ayega -> utni baar usko local storage me update krenge



  return (
    //  isme jo todos pass hua ha -> it means the array of all todos
    <ToDoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                          todos.map((todo) =>(
                            <div key={todo.id}
                            className='w-full'
                            >

                            <TodoItem todo={todo}/>
                          
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div> 
    </ToDoProvider>
    

  )
}

export default App
