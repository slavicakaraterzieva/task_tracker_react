import React from 'react';
import Header from './components/Header';
import Tasks from'./components/Tasks';
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'
import Footer from './components/Footer'


function App() {
  const [showAddTask, setShowAddTask]=useState(false)
  const[tasks, setTasks] = useState([])

  useEffect(()=>{
      const getTasks=async()=>{
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

//fetch Tasks from server
const fetchTasks=async()=>{
  const response= await fetch('http://localhost:5000/tasks')
  //don't forget to run 'npm start server' for the url to work
  //and then npm start
  const data=await response.json()
  return data
}

//fetch single Task from server
const fetchTask=async(id)=>{
  const response= await fetch(`http://localhost:5000/tasks/${id}`)
  //don't forget to run 'npm start server' for the url to work
  //and then npm start
  const data=await response.json()
  return data
}

//function AddTask
const onAdd=async(task)=>{
  const response =await fetch(
    `http://localhost:5000/tasks`,{
    method: 'POST',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify(task)
})

const data= await response.json()
setTasks([...tasks, data])

/*   const id=Math.floor(Math.random()*100)+1
  const newTask={id, ...task}
  setTasks([...tasks, newTask]) */
}

//function Delete Task
const deleteTask=async(id)=>{
 await fetch(`http://localhost:5000/tasks/${id}`, {
  method:'DELETE'
 })
 setTasks(tasks.filter((task)=>task.id !==id))
}

//function Toggle Reminder

//function Toggle Reminder
const onToggle=async (id)=>{
  const taskToToggle=await fetchTask(id)
  const updateReminder={...taskToToggle, 
    reminder: !taskToToggle.reminder}

    const response=await fetch(`http//localhost:5000/tasks/${id}`,
    {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(updateReminder)
    })

    const data=await response.json()


  setTasks(tasks.map((task)=>
  task.id===id ?{...task, reminder:data.reminder}:task)) 

}

  return (

    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)}
      showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={onAdd} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} 
      onDelete={deleteTask}
      onToggle={onToggle}
      /> : 'No Tasks to Show' }
      <Footer/>
    </div>
   
  );
}

export default App;
